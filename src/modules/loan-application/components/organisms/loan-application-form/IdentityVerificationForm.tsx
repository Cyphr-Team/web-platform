import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ReactNode, useEffect, useMemo } from "react"

import { Button, ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { usePersona } from "@/lib/persona/usePersona"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowRight,
  Check,
  LockKeyhole,
  ShieldCheck,
  UserCheck,
  Zap
} from "lucide-react"
import { useForm } from "react-hook-form"
import {
  IdentityVerificationValue,
  identityVerificationSchema
} from "../../../constants/form"
import { LOAN_APPLICATION_STEPS } from "../../../models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../../providers"
import { FORM_ACTION } from "../../../providers/LoanApplicationFormProvider"

const VerifyInfoItem = ({
  leftIcon,
  title,
  subtitle
}: {
  leftIcon: ReactNode
  title: string
  subtitle: ReactNode
}) => {
  return (
    <div className="flex gap-2 text-sm">
      <div>{leftIcon}</div>
      <div>
        <h5 className="mb-1 font-semibold">{title}</h5>
        <div className="text-sm text-text-secondary font-medium">
          {subtitle}
        </div>
      </div>
    </div>
  )
}

export const IdentityVerificationForm = () => {
  /**
   * Persona Kyc
   */
  const { handleOpenPersona, isOpening, completeData } = usePersona()

  const { dispatchFormAction, identityVerificationForm } =
    useLoanApplicationFormContext()
  const { finishCurrentStep } = useLoanApplicationProgressContext()

  const defaultValues: IdentityVerificationValue = useMemo(() => {
    return {
      smartKycId: identityVerificationForm?.smartKycId,
      inquiryId: identityVerificationForm?.inquiryId,
      status: identityVerificationForm?.status
    }
  }, [
    identityVerificationForm?.inquiryId,
    identityVerificationForm?.smartKycId,
    identityVerificationForm?.status
  ])

  const form = useForm<IdentityVerificationValue>({
    resolver: zodResolver(identityVerificationSchema),
    defaultValues
  })

  const onSubmit = (data: IdentityVerificationValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION,
      state: data
    })
    finishCurrentStep()
  }

  /**
   * Listen completeData to update form value
   */
  useEffect(() => {
    if (completeData) {
      form.setValue("inquiryId", completeData?.inquiryId, {
        shouldValidate: true
      })
      form.setValue("status", completeData?.status, {
        shouldValidate: true
      })
    }
  }, [completeData, form])

  return (
    <Form {...form}>
      <Card
        className={cn(
          "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6",
          "md:col-span-6 md:col-start-2 md:mx-0"
        )}
      >
        <div className="flex gap-2 justify-between items-center">
          <h5 className="text-lg font-semibold">Identity Verification</h5>
          <div className="text-sm">
            {!form.formState.isValid ? (
              <ButtonLoading
                isLoading={isOpening}
                variant="outline"
                className="rounded-lg flex gap-1.5 font-semibold"
                onClick={handleOpenPersona}
              >
                Start Verification <UserCheck className="w-5 h-5" />
              </ButtonLoading>
            ) : (
              <div className="rounded-lg flex items-center justify-center gap-1 font-semibold text-white bg-primary h-10 px-4 py-2">
                Verified <Check className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <VerifyInfoItem
              leftIcon={<ShieldCheck className="w-5 h-5" />}
              title="Safety first"
              subtitle="Verify to ensure the security of your account"
            />
            <VerifyInfoItem
              leftIcon={<Zap className="w-5 h-5" />}
              title="Fast and secure"
              subtitle="Verification usually takes less than a few minutes and is encrypted."
            />
            <VerifyInfoItem
              leftIcon={<LockKeyhole className="w-5 h-5" />}
              title="How we verify you"
              subtitle={
                <p>
                  To learn how our service provider uses data you provide, see
                  their{" "}
                  <a
                    className="underline"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://withpersona.com/legal/privacy-policy"
                  >
                    Privacy Statement
                  </a>
                </p>
              }
            />
          </div>

          <div className="flex flex-col gap-lg">
            <Button
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
            >
              Next <ArrowRight className="ml-1.5 w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </Form>
  )
}
