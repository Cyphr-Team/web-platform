import { Card } from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { FinancialFormValue, financialFormSchema } from "../../constants/form"
import { ButtonLoading } from "@/components/ui/button"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput"
import { useLoanApplicationContext } from "../../providers"
import { LOAN_APPLICATION_STEPS } from "../../constants"
import { ConnectPlaidButton } from "../molecules/ConnectPlaidButton"
import { FileUploadCard } from "../molecules/FileUploadCard"
import { useQueryGetIncomeCategories } from "../../hooks/useQuery/useQueryIncomeCategories"
import { capitalizeWords } from "@/utils"
import { useSubmitLoanFinancialInformation } from "../../hooks/useMutation/useSubmitLoanFinancialInformation"
import { useMutateUploadDocument } from "../../hooks/useMutation/useUploadDocumentMutation"
import { FORM_TYPE } from "../../constants/type"

export const FinancialInformationForm = () => {
  const { changeProgress, changeStep, loanApplicationId } =
    useLoanApplicationContext()

  const form = useForm<FinancialFormValue>({
    resolver: zodResolver(financialFormSchema),
    defaultValues: {
      cashflow: []
    },
    mode: "onChange"
  })

  const incomeCategories = useQueryGetIncomeCategories()
  const items = incomeCategories.data?.map((val) => ({
    id: val,
    label: capitalizeWords(val.replace(/_/g, "-"))
  }))
  const { mutate, isPending } = useSubmitLoanFinancialInformation()
  const { mutateAsync, isUploading } = useMutateUploadDocument()

  const handleSelectFile = (files: FileList) => {
    const currentFiles = form.getValues("w2sFile")

    const mergedFiles =
      files && currentFiles
        ? [...currentFiles, ...Array.from(files)]
        : Array.from(files)

    form.setValue("w2sFile", mergedFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const handleRemoveFile = (index: number) => {
    const currentFiles = form.getValues("w2sFile")
    const newFiles = currentFiles.filter((_, i) => i !== index)
    form.setValue("w2sFile", newFiles)
  }

  const onSubmit = (data: FinancialFormValue) => {
    const formattedData = {
      loanApplicationId: loanApplicationId,
      incomeCategories: data.cashflow
    }

    mutate(formattedData, {
      onSuccess: (res) => {
        handleUploadDocument(res.data.id)
      }
    })
  }

  const handleUploadDocument = async (formId: string) => {
    const request = new FormData()

    const reqBody = {
      files: form.getValues("w2sFile"),
      formType: FORM_TYPE.FINANCIAL,
      formId: formId
    }

    for (const [key, value] of Object.entries(reqBody)) {
      if (Array.isArray(value)) {
        value.forEach((file: File) => {
          request.append(key, file)
        })
      } else if (value) {
        request.append(key, value + "")
      }
    }

    await mutateAsync(request, {
      onSuccess: () => {
        changeProgress(LOAN_APPLICATION_STEPS.CONFIRMATION)
        changeStep(LOAN_APPLICATION_STEPS.CONFIRMATION)
      }
    })
  }

  return (
    <div className="flex flex-col flex-1 gap-3xl">
      <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
        <h5 className="text-lg font-semibold">Financial Information</h5>
        <Separator />
        <Form {...form}>
          <form className="flex flex-col gap-y-2xl gap-x-4xl">
            <FormItem>
              <FormLabel className="text-sm text-text-secondary font-medium">
                How do you make money? (Check all that apply)
              </FormLabel>
              {items?.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="cashflow"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center space-x-lg space-y-0 "
                      >
                        <FormControl>
                          <Checkbox
                            className="w-5 h-5"
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
            <div className="flex flex-col gap-y-sm">
              <p className="text-sm text-text-secondary font-medium">
                Connect your business accounts to report your cash flow and
                income
              </p>
              <ConnectPlaidButton />
            </div>
          </form>
          <div className="flex flex-col gap-y-sm">
            <p className="text-sm text-text-secondary font-medium">
              Do you have any individual income to add? (if yes, upload W2s
              below)
            </p>
            <FormField
              control={form.control}
              name="w2sFile"
              render={() => (
                <FormItem>
                  <DragDropFileInput onFileSelect={handleSelectFile} />
                  {form.getValues("w2sFile") &&
                    Array.from(form.getValues("w2sFile")).map(
                      (file: File, index: number) => (
                        <FileUploadCard
                          key={index}
                          file={file}
                          index={index}
                          handleRemoveFile={handleRemoveFile}
                        />
                      )
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <ButtonLoading
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
              isLoading={isPending || isUploading}
            >
              Save
            </ButtonLoading>
          </div>
        </Form>
      </Card>
    </div>
  )
}
