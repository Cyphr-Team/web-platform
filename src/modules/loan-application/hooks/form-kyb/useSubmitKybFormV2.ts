import { API_PATH } from "@/constants"
import { type IBusinessFormValue } from "@/modules/loan-application/constants/form.ts"
import { QUERY_KEY } from "../../constants/query-key"
import {
  type FormV2Data,
  type FormV2SubmitRequest,
  type FormV2UpdateRequest
} from "@/modules/loan-application/types/form.v2.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { get } from "lodash"
import { isKccBank, isLaunchKC, isLoanReady } from "@/utils/domain.utils.ts"
import {
  type LaunchKcKybFormMetadata,
  type LoanReadyKybFormMetadata
} from "@/modules/loan-application/types/kyb.v2.ts"
import type {
  BusinessFormValue,
  LaunchKCBusinessFormValue,
  LoanReadyBusinessFormValue
} from "@/modules/loan-application/constants/form.kyb.ts"
import { undefined } from "zod"
import { useSubmitFormV2 } from "@/modules/loan-application/hooks/utils/useMutateFormV2.ts"
import {
  getStateCode,
  getStateName
} from "@/modules/loan-application/hooks/utils/useSelectCities.ts"

interface SubmitOption {
  rawData: IBusinessFormValue
}

export const useSubmitKybFormV2 = ({ rawData }: SubmitOption) => {
  const { mutateAsync: submit, isPending: isSubmitting } = useSubmitFormV2<
    FormV2SubmitRequest,
    FormV2Data
  >({
    path: API_PATH.application.formV2.kyb.submit,
    queryKeysToInvalidate: [QUERY_KEY.GET_KYB_FORM_V2]
  })

  const { mutateAsync: update, isPending: isUpdating } = useSubmitFormV2<
    FormV2UpdateRequest,
    FormV2Data
  >({
    path: API_PATH.application.formV2.kyb.update,
    queryKeysToInvalidate: [QUERY_KEY.GET_KYB_FORM_V2]
  })

  const submitKybForm = async (loanApplicationId: string) => {
    const formattedData = rawData && serializeKybFormV2(rawData)

    if (rawData?.id?.length) {
      // Update KYC
      return await update(formattedData as FormV2UpdateRequest)
    } else {
      // Create KYC
      return await submit({
        ...formattedData,
        // remove formId,
        formId: undefined,
        applicationId: loanApplicationId
      } as unknown as FormV2SubmitRequest)
    }
  }

  return {
    isLoading: isUpdating || isSubmitting,
    submitKybForm
  }
}

// helper
// TODO: use adaptFormV2Metadata instead
function serializeKybFormV2(
  rawData: IBusinessFormValue
): FormV2UpdateRequest | FormV2SubmitRequest {
  const flatData: IBusinessFormValue = {
    ...rawData,
    ...get(rawData, "metadata", {})
  }

  const metadata = {
    businessLegalName: flatData.businessLegalName,
    businessStreetAddressCity: flatData.city,
    businessStreetAddressState: getStateCode(flatData.state),
    businessStreetAddressLine1: flatData.addressLine1,
    businessStreetAddressLine2: flatData.addressLine2,
    businessStreetAddressZipCode: flatData.postalCode,
    businessWebsite: flatData.businessWebsite,
    companyDescription: flatData.companyDescription,
    ein: flatData.businessTin,
    // businessTin should be invisible when send to be
    businessTin: undefined
  }

  if (isLaunchKC()) {
    const metadataToAdd: Partial<LaunchKcKybFormMetadata> = {
      legalStructure: flatData.legalStructure,
      primaryIndustry: flatData.primaryIndustry,
      primaryIndustryOther: flatData.primaryIndustryOther,
      yearFounded: flatData.yearFounded
    }

    Object.assign(metadata, metadataToAdd)
  }

  if (isLoanReady()) {
    const metadataToAdd: Partial<LoanReadyKybFormMetadata> = {
      businessStage: flatData.businessStage,
      businessDescription: flatData.businessDescription,
      dba: flatData.dba
    }

    Object.assign(metadata, metadataToAdd)
  }

  return {
    applicationId: "", // late init
    formId: get(rawData, "id", "") ?? "",
    formType: FORM_TYPE.KYB,
    metadata: metadata
  }
}

// TODO: use adaptFormV2Metadata instead
export function deserializeKybFormV2(
  response?: FormV2Data
): IBusinessFormValue {
  const baseValue = {
    id: response?.id,
    addressLine1: get(response, "metadata.businessStreetAddressLine1"),
    addressLine2: get(response, "metadata.businessStreetAddressLine2"),
    businessLegalName: get(response, "metadata.businessLegalName"),
    // TODO: pipo pipo, should change businessTin to ein when formV2 done.
    businessTin: get(response, "metadata.ein"),
    businessWebsite: get(response, "metadata.businessWebsite"),
    city: get(response, "metadata.businessStreetAddressCity"),
    postalCode: get(response, "metadata.businessStreetAddressZipCode"),
    state: getStateName(
      get(response, "metadata.businessStreetAddressState", "") as string
    )
  } as IBusinessFormValue

  if (isLaunchKC()) {
    const data: LaunchKCBusinessFormValue = {
      ...baseValue,
      // out of the box value
      companyDescription: get(response, "metadata.companyDescription"),
      legalStructure: get(response, "metadata.legalStructure"),
      primaryIndustry: get(response, "metadata.primaryIndustry"),
      primaryIndustryOther: get(response, "metadata.primaryIndustryOther"),
      yearFounded: get(response, "metadata.yearFounded")
    }

    Object.assign(baseValue, data)
  }

  if (isLoanReady()) {
    const data: LoanReadyBusinessFormValue = {
      ...baseValue,
      // out of the box value
      businessDescription: get(response, "metadata.businessDescription"),
      businessStage: get(response, "metadata.businessStage"),
      dba: get(response, "metadata.dba")
    }

    Object.assign(baseValue, data)
  }

  if (isKccBank()) {
    const data: BusinessFormValue = {
      ...baseValue
    }

    Object.assign(baseValue, data)
  }

  return baseValue
}
