import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData"

const DOCUMENT_FRAMES = [
  STEP.BANK_STATEMENTS,
  STEP.ARTICLES_OF_ORGANIZATION
] as const

interface DocumentReviewOnlyProps {
  wrapperClassName?: string
}

function DocumentReviewOnly({ wrapperClassName }: DocumentReviewOnlyProps) {
  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm",
        wrapperClassName
      )}
    >
      <h5 className="text-lg font-semibold">Documentation</h5>
      <Separator />
      <ul className="flex flex-col gap-y-2xl gap-x-4xl">
        {DOCUMENT_FRAMES.map((frame) => (
          <DocumentFrame key={frame} title={frame} />
        ))}
      </ul>
    </Card>
  )
}

export default DocumentReviewOnly

type ReviewableDocument = STEP.BANK_STATEMENTS | STEP.ARTICLES_OF_ORGANIZATION
interface DocumentFrameProps {
  title: ReviewableDocument
}
function DocumentFrame({ title }: DocumentFrameProps) {
  const formFiles = useFormData.use[title]()
  const files = formFiles?.files?.length
    ? formFiles.files
    : getDefaultDocument(title)

  return (
    <li className="flex justify-between text-sm gap-4">
      <span className="font-semibold">{title}</span>
      <div className="text-right">
        {files.map((file, idx) => (
          <div key={file.name + idx} className="break-all">
            {file.name}
          </div>
        ))}
      </div>
    </li>
  )
}

const getDefaultDocument = (kind: ReviewableDocument) => {
  const option = { type: "application/pdf" }

  if (kind === STEP.BANK_STATEMENTS) {
    return [new File([""], "BankStatements_Sep2024.pdf", option)]
  }

  return [new File([""], "ArticlesOfOrganization_Apr2017.pdf", option)]
}
