import UploadDocumentsDialog from "@/modules/loan-application/capital-collab/components/organisms/upload-documents-dialog.tsx"

export function EmptyDocuments() {
  return (
    <div className="mx-auto my-5xl flex max-w-80 flex-col items-center justify-center gap-xl text-center">
      <div>
        <p className="text-md font-semibold text-text-primary">
          Your documents will appear here
        </p>
        <p className="text-sm font-normal text-text-tertiary">
          Click the “Add document” button to start uploading your files.
        </p>
      </div>
      <UploadDocumentsDialog textButton="Add document" />
    </div>
  )
}
