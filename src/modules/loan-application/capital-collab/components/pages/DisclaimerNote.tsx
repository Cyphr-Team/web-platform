import capitalCollabLogo from "@/assets/capitalcollab-logo.png"
import { Separator } from "@/components/ui/separator"
import { Image } from "@/shared/atoms/Image"
import { type FC } from "react"

interface DisclaimerNoteProps {
  companyName: string
  title?: string
}

export const DisclaimerNote: FC<DisclaimerNoteProps> = (props) => {
  const { companyName } = props

  return (
    <div className="flex h-[1600px] flex-col gap-y-2xl p-[72px]">
      <div className="flex-1">
        <Image
          alt="Capital Collab"
          height={90}
          placeholderClassName="rounded bg-slate-400"
          src={capitalCollabLogo}
        />
      </div>

      <div className="mt-auto flex flex-col gap-y-3xl">
        <p className="text-6xl font-semibold">{companyName}</p>
        <p className="text-4xl font-normal">Application Summary</p>
        <Separator />
        <div className="flex flex-col gap-5 text-justify text-xl font-light ">
          <p className="font-semibold">Disclaimer:</p>
          <p>
            This application is generated based on user inputs, data retrieved
            from banking sources, and other third-party data providers. All
            information is provided "as is,"" with no guarantees of
            completeness, accuracy, or timeliness. We are not responsible for
            any errors or omissions in the information or for the results
            obtained from its use.
          </p>
          <p>
            Our platform incorporates third-party data, and while we strive to
            ensure its accuracy, we do not assume any responsibility for
            inaccuracies or delays from external data providers. Users are
            encouraged to consult a financial professional before making
            decisions based on the projections generated by this application.
          </p>
          <p>
            We take the privacy of your data seriously. Please refer to our
            Privacy Policy for details on how your information is collected and
            used. By utilizing this application, you acknowledge and agree to
            these terms.
          </p>
        </div>
      </div>
    </div>
  )
}
