import { Button, ButtonLoading } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { RHFDragAndDropFileUpload } from "@/modules/form-template/components/molecules"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileUp } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useUploadDocuments from "../../hooks/useUploadDocuments.ts"
import { useParams } from "react-router-dom"
import useBoolean from "@/hooks/useBoolean"
import { toastError } from "@/utils"

const formInputs = z.object({
  files: z.array(
    z.instanceof(File).refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed"
    })
  )
})

type FormInputs = z.infer<typeof formInputs>

function UploadDocumentsDialog({
  textButton = "Upload document"
}: {
  textButton?: string
}) {
  const { id: applicationId } = useParams()
  const {
    value: isDialogOpen,
    onFalse: closeDialog,
    setValue: setIsDialogOpen
  } = useBoolean(false)

  const form = useForm<FormInputs>({
    resolver: zodResolver(formInputs)
  })
  const uploadDocuments = useUploadDocuments()

  const handleSubmit = form.handleSubmit((data: FormInputs) => {
    if (applicationId) {
      uploadDocuments.mutate(
        {
          applicationId,
          files: data.files
        },
        {
          onSuccess: closeDialog
        }
      )
    } else {
      toastError({
        title: "Error uploading documents",
        description: "Application not found"
      })
    }
  })

  const handleOpenChange = (value: boolean) => {
    setIsDialogOpen(value)
    form.reset()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ButtonLoading
          className="hover:bg-[#a1d80b]"
          isLoading={uploadDocuments.isPending}
          variant="success"
        >
          <FileUp className="mr-1" size="20" />
          {textButton}
        </ButtonLoading>
      </DialogTrigger>
      <DialogContent className="p-0 gap-0" showClose={false}>
        <DialogHeader className="px-8 pt-8 pb-5">
          <DialogTitle>Upload document</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className="p-8">
              <RHFDragAndDropFileUpload
                className="border-dashed border-[#4F6161] py-12"
                id="files"
                name="files"
              />
            </div>
            <DialogFooter className="border-t px-8 py-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <ButtonLoading
                isLoading={uploadDocuments.isPending}
                type="submit"
              >
                Done
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UploadDocumentsDialog
