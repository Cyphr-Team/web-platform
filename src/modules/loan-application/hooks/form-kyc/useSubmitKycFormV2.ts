import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type KYCInformationResponse } from "../../constants/type"
import {
  BINARY_VALUES,
  type IOwnerFormValue
} from "@/modules/loan-application/constants/form.ts"
import { type ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import {
  type FormV2Data,
  type FormV2SubmitRequest,
  type FormV2UpdateRequest
} from "@/modules/loan-application/types/form.v2.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { get } from "lodash"
import {
  isCapitalCollab,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils.ts"
import {
  type CapitalCollabKycFormMetadata,
  type KCChamberKycFormMetadata,
  type LaunchKcKycFormMetadata,
  type LoanReadyKycFormMetadata,
  type SbbKycFormMetadata
} from "@/modules/loan-application/types/kyc.v2.ts"
import type {
  CapitalCollabOwnerFormValue,
  LaunchKCOwnerFormValue
} from "@/modules/loan-application/constants/form.kyc.ts"
import { undefined } from "zod"
import {
  getStateCode,
  getStateName
} from "@/modules/loan-application/hooks/utils/useSelectCities.ts"
import { EMPTY_ADDITIONAL_OWNER_ITEM } from "@/modules/loan-application/capital-collab/constants/kyc"

interface SubmitOption {
  rawData: IOwnerFormValue
}

export const useSubmitKycFormV2 = ({ rawData }: SubmitOption) => {
  const { mutateAsync: updateLoanKyc, isPending: isUpdating } = useUpdate()

  const { mutateAsync: submitLoanKyc, isPending: isSubmitting } = useSubmit()

  const submitKYCForm = async (loanApplicationId: string) => {
    const formattedData = rawData && serializeKycFormV2(rawData)

    if (rawData?.id?.length) {
      // Update KYC
      return await updateLoanKyc(formattedData as FormV2UpdateRequest)
    } else {
      // Create KYC
      return await submitLoanKyc({
        ...formattedData,
        // remove formId,
        formId: undefined,
        applicationId: loanApplicationId
      } as unknown as FormV2SubmitRequest)
    }
  }

  return {
    isLoading: isUpdating || isSubmitting,
    submitKYCForm
  }
}

const useUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<KYCInformationResponse>,
    AxiosError<ErrorResponse>,
    FormV2UpdateRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.formV2.kyc.update,
        data
      })
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_KYC_FORM_V2]
      })
  })
}

const useSubmit = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<FormV2Data>,
    AxiosError<ErrorResponse>,
    FormV2SubmitRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.formV2.kyc.submit,
        data
      })
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_KYC_FORM_V2]
      })
  })
}

// helper
// TODO: use adaptFormV2Metadata instead
function serializeKycFormV2(
  rawData: IOwnerFormValue
): FormV2UpdateRequest | FormV2SubmitRequest {
  const flatData = {
    ...rawData,
    ...get(rawData, "metadata", {})
  }

  const metadata = {}

  if (isLaunchKC()) {
    const metadataToAdd: LaunchKcKycFormMetadata = {
      addressLine1: flatData.addressLine1,
      addressLine2: flatData.addressLine2,
      areFounderOrCoFounder:
        flatData.areFounderOrCoFounder === BINARY_VALUES.YES,
      areFullTimeFounder: flatData.areFullTimeFounder === BINARY_VALUES.YES,
      businessCity: flatData.businessCity,
      businessOwnershipPercentage: parseInt(
        flatData.businessOwnershipPercentage
      ),
      businessRole: flatData.businessRole,
      businessState: getStateCode(flatData.businessState),
      businessZipCode: flatData.businessZipCode,
      dateOfBirth: flatData.dateOfBirth,
      email: flatData.email,
      ethnicIdentification: flatData.ethnicIdentification,
      firstName: flatData.firstName,
      fullName: `${flatData.firstName} ${flatData.lastName}`,
      genderIdentity: flatData.genderIdentity,
      lastName: flatData.lastName,
      phoneNumber: flatData.phoneNumber,
      preferredPronoun: flatData.preferredPronoun,
      racialIdentification: flatData.racialIdentification,
      socialSecurityNumber: flatData.socialSecurityNumber
    }

    Object.assign(metadata, metadataToAdd)
  }

  if (isLoanReady()) {
    const metadataToAdd: LoanReadyKycFormMetadata = {
      addressLine1: flatData.addressLine1,
      businessCity: flatData.businessCity,
      businessOwnershipPercentage: parseInt(
        flatData.businessOwnershipPercentage
      ),
      businessRole: flatData.businessRole,
      businessState: getStateCode(flatData.businessState),
      businessZipCode: flatData.businessZipCode,
      dateOfBirth: flatData.dateOfBirth,
      email: flatData.email,
      fullName: flatData.fullName,
      personalCreditScore: flatData.personalCreditScore,
      phoneNumber: flatData.phoneNumber,
      socialSecurityNumber: flatData.socialSecurityNumber
    }

    Object.assign(metadata, metadataToAdd)
  }

  if (isSbb()) {
    // refer src/modules/loan-application/components/organisms/loan-application-form/kyc/sbb/const.ts
    const metadataToAdd: SbbKycFormMetadata = {
      businessCity: flatData.businessCity,
      businessOwnershipPercentage: parseInt(
        flatData.businessOwnershipPercentage
      ),
      businessRole: flatData.businessRole,
      businessState: getStateCode(flatData.businessState),
      businessZipCode: flatData.businessZipCode,
      dateOfBirth: flatData.dateOfBirth,
      email: flatData.email,
      firstName: flatData.firstName,
      fullName: `${flatData.firstName} ${flatData.lastName}`,
      lastName: flatData.lastName,
      phoneNumber: flatData.phoneNumber,
      addressLine1: flatData.addressLine1,
      socialSecurityNumber: flatData.socialSecurityNumber,
      // out of the box
      controlAuthorization:
        BINARY_VALUES.YES ===
        get(flatData, "controlAuthorization", BINARY_VALUES.NO),
      beneficialOwners: get(flatData, "beneficialOwners", []),
      hasBeneficialOwners: get(flatData, "beneficialOwners", []).length > 0
    }

    Object.assign(metadata, metadataToAdd)
  }

  if (isKccBank()) {
    const metadataToAdd: KCChamberKycFormMetadata = {
      addressLine1: flatData.addressLine1,
      addressLine2: flatData.addressLine2,
      businessCity: flatData.businessCity,
      businessOwnershipPercentage: parseInt(
        flatData.businessOwnershipPercentage
      ),
      businessRole: flatData.businessRole,
      businessState: flatData.businessState,
      businessZipCode: flatData.businessZipCode,
      dateOfBirth: flatData.dateOfBirth,
      email: flatData.email,
      fullName: flatData.fullName,
      phoneNumber: flatData.phoneNumber,
      socialSecurityNumber: flatData.socialSecurityNumber
    }

    Object.assign(metadata, metadataToAdd)
  }

  if (isCapitalCollab()) {
    const metadataToAdd: CapitalCollabKycFormMetadata = {
      addressLine1: flatData.addressLine1,
      businessCity: flatData.businessCity,
      businessOwnershipPercentage: parseInt(
        flatData.businessOwnershipPercentage
      ),
      businessRole: flatData.businessRole,
      businessState: getStateCode(flatData.businessState),
      businessZipCode: flatData.businessZipCode,
      dateOfBirth: flatData.dateOfBirth,
      email: flatData.email,
      fullName: flatData.fullName,
      personalCreditScore: flatData.personalCreditScore,
      phoneNumber: flatData.phoneNumber,
      socialSecurityNumber: flatData.socialSecurityNumber,
      annualIncome: flatData.annualIncome,
      isBusinessSolelyOwned:
        flatData.isBusinessSolelyOwned === BINARY_VALUES.YES,
      additionalOwners:
        get(flatData, "additionalOwners[0].fullName", "") ===
        EMPTY_ADDITIONAL_OWNER_ITEM.fullName
          ? []
          : flatData.additionalOwners
    }

    Object.assign(metadata, metadataToAdd)
  }

  return {
    applicationId: "", // late init
    formId: get(rawData, "id", "") ?? "",
    formType: FORM_TYPE.KYC,
    metadata: metadata
  }
}

// TODO: use adaptFormV2Metadata instead
export function deserializeKycFormV2(response?: FormV2Data): IOwnerFormValue {
  const formValue = {
    id: response?.id
  } as IOwnerFormValue

  if (isLaunchKC()) {
    const data: LaunchKCOwnerFormValue = {
      addressLine2: get(response, "metadata.addressLine2"),
      governmentFile: [],
      addressLine1: get(response, "metadata.addressLine1"),
      areFounderOrCoFounder: get(response, "metadata.areFounderOrCoFounder")
        ? BINARY_VALUES.YES
        : BINARY_VALUES.NO,
      areFullTimeFounder: get(response, "metadata.areFullTimeFounder")
        ? BINARY_VALUES.YES
        : BINARY_VALUES.NO,
      businessCity: get(response, "metadata.businessCity"),
      businessOwnershipPercentage: get(
        response,
        "metadata.businessOwnershipPercentage"
      )?.toString(),
      businessRole: get(response, "metadata.businessRole"),
      businessState: getStateName(
        get(response, "metadata.businessState", "") as string
      ),
      businessZipCode: get(response, "metadata.businessZipCode"),
      dateOfBirth: get(response, "metadata.dateOfBirth"),
      email: get(response, "metadata.email"),
      ethnicIdentification: get(response, "metadata.ethnicIdentification"),
      firstName: get(response, "metadata.firstName"),
      fullName: get(response, "metadata.fullName"),
      genderIdentity: get(response, "metadata.genderIdentity"),
      lastName: get(response, "metadata.lastName"),
      phoneNumber: get(response, "metadata.phoneNumber"),
      preferredPronoun: get(response, "metadata.preferredPronoun"),
      racialIdentification: get(response, "metadata.racialIdentification"),
      socialSecurityNumber: get(response, "metadata.socialSecurityNumber")
    }

    Object.assign(formValue, data)
  }

  if (isSbb()) {
    // TODO: we will hold off SBB for now, since it cost more effort to do.
    // we will back to this when this implementation is works well and directly switch to new approach
    const beneficialOwner = get(response, "metadata.beneficialOwners", [])
    const data: SbbKycFormMetadata = {
      addressLine1: get(response, "metadata.addressLine1"),
      beneficialOwners: beneficialOwner,
      businessCity: get(response, "metadata.businessCity"),
      hasBeneficialOwners: beneficialOwner.length > 0,
      businessOwnershipPercentage: get(
        response,
        "metadata.businessOwnershipPercentage"
      )?.toString(),
      businessRole: get(response, "metadata.businessRole"),
      businessState: getStateName(
        get(response, "metadata.businessState", "") as string
      ),
      businessZipCode: get(response, "metadata.businessZipCode"),
      controlAuthorization: get(response, "metadata.controlAuthorization")
        ? BINARY_VALUES.YES
        : BINARY_VALUES.NO,
      dateOfBirth: get(response, "metadata.dateOfBirth"),
      email: get(response, "metadata.email"),
      firstName: get(response, "metadata.firstName"),
      fullName: get(response, "metadata.fullName"),
      lastName: get(response, "metadata.lastName"),
      phoneNumber: get(response, "metadata.phoneNumber"),
      socialSecurityNumber: get(response, "metadata.socialSecurityNumber")
    }

    Object.assign(formValue, data)
  }

  if (isLoanReady()) {
    const data: LoanReadyKycFormMetadata = {
      addressLine1: get(response, "metadata.addressLine1"),
      businessCity: get(response, "metadata.businessCity"),
      businessOwnershipPercentage: get(
        response,
        "metadata.businessOwnershipPercentage"
      )?.toString(),
      businessRole: get(response, "metadata.businessRole"),
      businessState: getStateName(
        get(response, "metadata.businessState", "") as string
      ),
      businessZipCode: get(response, "metadata.businessZipCode"),
      dateOfBirth: get(response, "metadata.dateOfBirth"),
      email: get(response, "metadata.email"),
      fullName: get(response, "metadata.fullName"),
      personalCreditScore: get(response, "metadata.personalCreditScore"),
      phoneNumber: get(response, "metadata.phoneNumber"),
      socialSecurityNumber: get(response, "metadata.socialSecurityNumber")
    }

    Object.assign(formValue, data)
  }

  if (isKccBank()) {
    const data: KCChamberKycFormMetadata = {
      addressLine1: get(response, "metadata.addressLine1"),
      addressLine2: get(response, "metadata.addressLine2"),
      businessCity: get(response, "metadata.businessCity"),
      businessOwnershipPercentage: get(
        response,
        "metadata.businessOwnershipPercentage"
      )?.toString(),
      businessRole: get(response, "metadata.businessRole"),
      businessState: getStateName(
        get(response, "metadata.businessState", "") as string
      ),
      businessZipCode: get(response, "metadata.businessZipCode"),
      dateOfBirth: get(response, "metadata.dateOfBirth"),
      email: get(response, "metadata.email"),
      fullName: get(response, "metadata.fullName"),
      phoneNumber: get(response, "metadata.phoneNumber"),
      socialSecurityNumber: get(response, "metadata.socialSecurityNumber")
    }

    Object.assign(formValue, data)
  }

  if (isCapitalCollab()) {
    const data: CapitalCollabOwnerFormValue = {
      addressLine1: get(response, "metadata.addressLine1"),
      businessCity: get(response, "metadata.businessCity"),
      businessOwnershipPercentage: get(
        response,
        "metadata.businessOwnershipPercentage"
      )?.toString(),
      businessRole: get(response, "metadata.businessRole"),
      businessState: getStateName(
        get(response, "metadata.businessState", "") as string
      ),
      businessZipCode: get(response, "metadata.businessZipCode"),
      dateOfBirth: get(response, "metadata.dateOfBirth"),
      email: get(response, "metadata.email"),
      fullName: get(response, "metadata.fullName"),
      personalCreditScore: get(response, "metadata.personalCreditScore"),
      phoneNumber: get(response, "metadata.phoneNumber"),
      socialSecurityNumber: get(response, "metadata.socialSecurityNumber"),
      annualIncome: get(response, "metadata.annualIncome"),
      isBusinessSolelyOwned: get(response, "metadata.isBusinessSolelyOwned")
        ? BINARY_VALUES.YES
        : BINARY_VALUES.NO,
      governmentFile: [],
      additionalOwners:
        get(response, "metadata.additionalOwners", []).length > 0
          ? get(response, "metadata.additionalOwners")
          : [EMPTY_ADDITIONAL_OWNER_ITEM]
    }

    Object.assign(formValue, data)
  }

  return formValue
}
