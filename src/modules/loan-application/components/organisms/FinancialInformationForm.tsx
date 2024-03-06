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
import { Button } from "@/components/ui/button"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput"
import { useLoanApplicationContext } from "../../providers"
import { LOAN_APPLICATION_STEPS } from "../../constants"
import { ConnectPlaidButton } from "../molecules/ConnectPlaidButton"
import { FileUploadCard } from "../molecules/FileUploadCard"
import { useQueryGetIncomeCategories } from "../../hooks/useQuery/useQueryIncomeCategories"
import { capitalizeWords } from "@/utils"
import { useEffect } from "react"

export const FinancialInformationForm = () => {
  const {
    draftForm,
    changeProgress,
    changeStep,
    saveDraftForm,
    setFormIsEdited
  } = useLoanApplicationContext()

  const form = useForm<FinancialFormValue>({
    resolver: zodResolver(financialFormSchema),
    defaultValues: {
      cashflow: draftForm.financialInformationForm?.cashflow ?? [],
      w2sFile: draftForm.financialInformationForm?.w2sFile ?? []
    },
    mode: "onChange"
  })

  const incomeCategories = useQueryGetIncomeCategories()
  const items = incomeCategories.data?.map((val) => ({
    id: val,
    label: capitalizeWords(val.replace(/_/g, "-"))
  }))

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
  useEffect(() => {
    if (form.formState.isDirty && !form.formState.isSubmitted) {
      setFormIsEdited()
    }
  }, [form.formState, setFormIsEdited])

  const handleRemoveFile = (index: number) => {
    const currentFiles = form.getValues("w2sFile")
    const newFiles = currentFiles.filter((_, i) => i !== index)
    form.setValue("w2sFile", newFiles)
  }

  const onSubmit = (data: FinancialFormValue) => {
    saveDraftForm(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION, data)
    changeStep(LOAN_APPLICATION_STEPS.CONFIRMATION, true)
    changeProgress(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION)
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
            <Button
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
