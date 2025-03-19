import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { PreApplicationDisclosuresDetails } from "@/modules/loan-application/components/organisms/loan-application-form/pre-application-disclosures/PreApplicationDisclosuresDetails"
import { SbbKybFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/sbb/SbbKybFormDetails"
import { SbbKycFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/kyc/sbb/SbbKycFormDetails"
import { useLoanApplicationFormContext } from "@/modules/loan-application/providers"
import { SBB_KYB_FORM_FIELDS } from "../kyb/sbb/const"
import { get, merge } from "lodash"
import {
  type IBusinessFormValue,
  type IOwnerFormValue
} from "@/modules/loan-application/constants/form"
import {
  type KYBInformationResponse,
  type KYCInformationResponse
} from "@/modules/loan-application/constants/type"
import { SBB_KYC_FIELD_NAMES } from "../kyc/sbb/const"
import { Separator } from "@/components/ui/separator"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { IdentityVerificationForm } from "../IdentityVerificationForm"
import {
  EXPORT_CLASS,
  EXPORT_CONFIG
} from "@/modules/loan-application/services/pdf-v2.service.ts"
import { cn } from "@/lib/utils.ts"

export function SbbReviewApplicationDetails() {
  const {
    sbbBusinessInformationPartOne,
    sbbBusinessInformationPartTwo,
    businessInformation,
    ownerInformationForm,
    businessEINLetter,
    certificateOfGoodStanding,
    fictitiousNameCertification,
    articlesOfOrganizationAndOperatingAgreement,
    bylaws
  } = useLoanApplicationFormContext()
  const data = merge(
    sbbBusinessInformationPartOne,
    sbbBusinessInformationPartTwo,
    businessInformation
  )

  const convertToKybFormResponse = (
    businessInformation: IBusinessFormValue
  ): KYBInformationResponse => {
    return {
      id: "",
      loanApplicationId: "",
      businessLegalName: get(
        businessInformation,
        SBB_KYB_FORM_FIELDS.BUSINESS_NAME,
        ""
      ),
      businessStreetAddress: {
        addressLine1: businessInformation?.addressLine1 ?? "",
        addressLine2: businessInformation?.addressLine2 ?? "",
        city: businessInformation?.city ?? "",
        state: businessInformation?.state ?? "",
        postalCode: businessInformation?.postalCode ?? ""
      },
      businessWebsite: businessInformation?.businessWebsite ?? "",
      businessTin: businessInformation?.businessTin ?? "",
      metadata: {
        [SBB_KYB_FORM_FIELDS.DBA]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.DBA,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.PARENT_COMPANY]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.PARENT_COMPANY,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.INDUSTRY_TYPE]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.INDUSTRY_TYPE,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.YEARS_IN_OPERATION]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.YEARS_IN_OPERATION,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.CUSTOMER_TYPE]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.CUSTOMER_TYPE,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.TOTAL_NUMBER_OF_EMPLOYEES]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.TOTAL_NUMBER_OF_EMPLOYEES,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.NUMBER_OF_W2_EMPLOYEES]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.NUMBER_OF_W2_EMPLOYEES,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.INVOLVED_IN_WEAPONS_SALES]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.INVOLVED_IN_WEAPONS_SALES,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.IS_HOLDING_COMPANY]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.IS_HOLDING_COMPANY,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.OWNED_BY_TRUST]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.OWNED_BY_TRUST,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.CBD_RELATED_BUSINESS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.CBD_RELATED_BUSINESS,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.MARIJUANA_RELATED_BUSINESS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.MARIJUANA_RELATED_BUSINESS,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.POLITICAL_ORG_CONTRIBUTOR]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.POLITICAL_ORG_CONTRIBUTOR,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.EXPECTED_ANNUAL_SALES]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.EXPECTED_ANNUAL_SALES,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.EXPECTED_DEPOSITED_AMOUNT]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.EXPECTED_DEPOSITED_AMOUNT,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_ACTIVITIES]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_ACTIVITIES,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_AMOUNT]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_AMOUNT,
          0
        ),
        [SBB_KYB_FORM_FIELDS.PAYMENT_METHODS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.PAYMENT_METHODS,
          []
        ),
        [SBB_KYB_FORM_FIELDS.IS_SELF_DIRECTED_IRA_ACCOUNT]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.IS_SELF_DIRECTED_IRA_ACCOUNT,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.MONTHLY_DEPOSIT_AMOUNT]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.MONTHLY_DEPOSIT_AMOUNT,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.WILL_RECEIVE_INTERNATIONAL_PAYMENTS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.WILL_RECEIVE_INTERNATIONAL_PAYMENTS,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.WILL_SEND_WIRE_TRANSFERS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.WILL_SEND_WIRE_TRANSFERS,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.WILL_RECEIVE_WIRE_TRANSFERS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.WILL_RECEIVE_WIRE_TRANSFERS,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.WILL_RECEIVE_INTERNATIONAL_WIRE_TRANSFERS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.WILL_RECEIVE_INTERNATIONAL_WIRE_TRANSFERS,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.WILL_SEND_ELECTRONIC_TRANSFERS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.WILL_SEND_ELECTRONIC_TRANSFERS,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.WILL_RECEIVE_ELECTRONIC_TRANSFERS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.WILL_RECEIVE_ELECTRONIC_TRANSFERS,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.IS_MONEY_SERVICE_BUSINESS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.IS_MONEY_SERVICE_BUSINESS,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.IS_OWNS_AND_OPERATES_ATMS]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.IS_OWNS_AND_OPERATES_ATMS,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.IS_INVOLVED_IN_GAMBLING]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.IS_INVOLVED_IN_GAMBLING,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.IS_ALLOW_THIRD_PARTY_SLOT_MACHINES]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.IS_ALLOW_THIRD_PARTY_SLOT_MACHINES,
          ""
        ),
        [SBB_KYB_FORM_FIELDS.IS_SENIOR_FOREIGN_POLITICAL_FIGURE]: get(
          businessInformation,
          SBB_KYB_FORM_FIELDS.IS_SENIOR_FOREIGN_POLITICAL_FIGURE,
          ""
        )
      },
      createdAt: "",
      updatedAt: ""
    }
  }

  const convertToKycFormResponse = (
    ownerInformationForm: IOwnerFormValue
  ): KYCInformationResponse => {
    return {
      id: "",
      loanApplicationId: "",
      fullName: "",
      businessRole: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.BUSINESS_ROLE,
        ""
      ),
      email: get(ownerInformationForm, SBB_KYC_FIELD_NAMES.EMAIL, ""),
      phoneNumber: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.PHONE_NUMBER,
        ""
      ),
      addressLine1: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.ADDRESS_LINE1,
        ""
      ),
      addressLine2: "",
      businessCity: "",
      businessState: "",
      businessZipCode: "",
      dateOfBirth: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.DATE_OF_BIRTH,
        ""
      ),
      socialSecurityNumber: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.SOCIAL_SECURITY_NUMBER,
        ""
      ),
      businessOwnershipPercentage: Number(
        get(
          ownerInformationForm,
          SBB_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE,
          0
        )
      ),
      createdAt: "",
      updatedAt: "",
      metadata: {
        [SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS]: get(
          ownerInformationForm,
          [
            SBB_KYC_FIELD_NAMES.METADATA,
            SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS
          ],
          ""
        ),
        [SBB_KYC_FIELD_NAMES.BENEFICIAL_OWNERS]: get(
          ownerInformationForm,
          [SBB_KYC_FIELD_NAMES.METADATA, SBB_KYC_FIELD_NAMES.BENEFICIAL_OWNERS],
          []
        ),
        [SBB_KYC_FIELD_NAMES.CONTROL_AUTHORIZATION]: get(
          ownerInformationForm,
          [
            SBB_KYC_FIELD_NAMES.METADATA,
            SBB_KYC_FIELD_NAMES.CONTROL_AUTHORIZATION
          ],
          ""
        ),
        [SBB_KYC_FIELD_NAMES.FIRST_NAME]: get(
          ownerInformationForm,
          [SBB_KYC_FIELD_NAMES.METADATA, SBB_KYC_FIELD_NAMES.FIRST_NAME],
          ""
        ),
        [SBB_KYC_FIELD_NAMES.LAST_NAME]: get(
          ownerInformationForm,
          [SBB_KYC_FIELD_NAMES.METADATA, SBB_KYC_FIELD_NAMES.LAST_NAME],
          ""
        )
      }
    }
  }

  return (
    <div id="loan-summary">
      <div className="flex flex-col gap-3xl" id="application-overview">
        <div className="space-y-3xl">
          <div className={cn(EXPORT_CLASS.FINANCIAL, "-mx-4xl mt-lg px-4xl")}>
            <p className="text-4xl font-semibold">Application Summary</p>
          </div>
          <PreApplicationDisclosuresDetails />
        </div>

        <div className="space-y-4xl">
          <SbbKybFormDetails kybFormData={convertToKybFormResponse(data)} />
        </div>

        <div className="space-y-4xl">
          <SbbKycFormDetails
            kycFormData={convertToKycFormResponse(ownerInformationForm)}
          />
        </div>

        <div className="space-y-4xl">
          <div className="rounded-lg border">
            <div className={EXPORT_CLASS.FINANCIAL}>
              <IdentityVerificationForm wrapperClassName="max-w-none border-0" />
            </div>
          </div>

          <div className="rounded-lg border">
            <Card
              className={cn(
                EXPORT_CLASS.FINANCIAL,
                "mx-auto flex flex-col gap-2xl border-0 p-8 shadow-none"
              )}
              data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
            >
              <CardHeader className="!p-0">
                <CardTitle className="p-0 text-lg font-semibold text-text-primary">
                  Submitted Document
                </CardTitle>
              </CardHeader>

              <Separator />

              <CardContent className="flex flex-col gap-4xl overflow-auto !p-0">
                <AnswersTextDisplay
                  className="!flex-row justify-between"
                  label="Business EIN letter"
                  labelClassName="min-w-52"
                  value={
                    get(businessEINLetter, "files[0].name") ??
                    get(businessEINLetter, "uploadedFiles[0].originFileName")
                  }
                />

                <AnswersTextDisplay
                  className="!flex-row justify-between"
                  label="Certificate of good standing"
                  labelClassName="min-w-52"
                  value={
                    get(certificateOfGoodStanding, "files[0].name") ??
                    get(
                      certificateOfGoodStanding,
                      "uploadedFiles[0].originFileName"
                    )
                  }
                />

                <AnswersTextDisplay
                  className="!flex-row justify-between"
                  label="Fictitious name certification"
                  labelClassName="min-w-52"
                  value={
                    get(fictitiousNameCertification, "files[0].name") ??
                    get(
                      fictitiousNameCertification,
                      "uploadedFiles[0].originFileName"
                    )
                  }
                />

                <AnswersTextDisplay
                  className="!flex-row justify-between"
                  label="Articles of organization and operating agreement"
                  labelClassName="min-w-52"
                  value={
                    get(
                      articlesOfOrganizationAndOperatingAgreement,
                      "files[0].name"
                    ) ??
                    get(
                      articlesOfOrganizationAndOperatingAgreement,
                      "uploadedFiles[0].originFileName"
                    )
                  }
                />

                <AnswersTextDisplay
                  className="!flex-row justify-between"
                  label="By-laws"
                  labelClassName="min-w-52"
                  value={
                    get(bylaws, "files[0].name") ??
                    get(bylaws, "uploadedFiles[0].originFileName")
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
