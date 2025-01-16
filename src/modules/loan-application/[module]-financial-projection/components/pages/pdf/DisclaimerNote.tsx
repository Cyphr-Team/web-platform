import loanReadyLogo from "@/assets/loanreadylogo.jpg"
import { Separator } from "@/components/ui/separator"
import { Image } from "@/shared/atoms/Image"
import { type FC } from "react"
import { getDisclaimerNoteContent } from "../../../services/disclaimer-note.service"
import { type ExportFPOption } from "../../store/fp-helpers"

interface DisclaimerNoteProps {
  companyName: string
  title?: string
  noteKeys?: ExportFPOption[]
}

export const DisclaimerNote: FC<DisclaimerNoteProps> = (props) => {
  const { companyName, title, noteKeys } = props

  return (
    <div className="flex h-[1600px] flex-col gap-y-2xl p-[72px]">
      <div className="flex-1">
        <Image
          alt="LoanReady by cyphr"
          height={90}
          placeholderClassName="rounded bg-slate-400"
          src={loanReadyLogo}
        />
      </div>

      <div className="mt-auto flex flex-col gap-y-3xl">
        <p className="text-6xl font-semibold">{companyName}</p>
        <p className="text-4xl font-normal">{title ?? "LoanReady"}</p>
        <Separator />
        <div className="flex flex-col gap-5 text-justify text-xl font-light ">
          <p className="font-semibold">Disclaimer:</p>
          {getDisclaimerNoteContent(noteKeys).map((content) => (
            <p key={content}>{content}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
