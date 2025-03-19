import { STEP } from "@/modules/conference-demo/applicant/constants"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData"
import { ConferenceFormLayout } from "@/modules/conference-demo/applicant/components/layouts/ConferenceFormLayout.tsx"
import { Separator } from "@/components/ui/separator.tsx"

const DOCUMENT_FRAMES = [
  STEP.BANK_STATEMENTS,
  STEP.ARTICLES_OF_ORGANIZATION
] as const

interface DocumentReviewOnlyProps {
  wrapperClassName?: string
}

function DocumentReviewOnly({ wrapperClassName }: DocumentReviewOnlyProps) {
  return (
    <ConferenceFormLayout
      cardClassName="w-full"
      title="Articles of Organization"
      wrapperClassName={wrapperClassName}
    >
      <h5 className="text-lg font-semibold">Documentation</h5>
      <Separator />
      <ul className="flex flex-col gap-y-2xl">
        {DOCUMENT_FRAMES.map((frame) => (
          <DocumentFrame key={frame} title={frame} />
        ))}
      </ul>
    </ConferenceFormLayout>
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
    <li className="flex justify-between gap-4 text-sm">
      <span className="font-semibold">{title}</span>
      <div className="text-right">
        {files.map((file, idx) => (
          // eslint-disable-next-line react/no-array-index-key
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
