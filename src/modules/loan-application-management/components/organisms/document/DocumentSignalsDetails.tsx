import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useState } from "react"
import { DocumentSignalsDetect } from "./DocumentSignalsDetect"
import { DocumentCapture } from "./DocumentCapture"

interface Section {
  title: string
  content: string
}
enum SECTION_CONTENTS {
  CAPTURE = "Capture",
  DETECT = "Detect"
}

const section_data = [
  {
    title: "Captured Data",
    content: SECTION_CONTENTS.CAPTURE
  },
  {
    title: "Detect Signals",
    content: SECTION_CONTENTS.DETECT
  }
]

interface Props {
  handleClose: () => void
}

export const DocumentSignalsDetails: React.FC<Props> = ({ handleClose }) => {
  const [section, setSection] = useState<Section>(section_data[1])

  return (
    <div className="flex flex-col gap-3 px-3">
      <div className="flex justify-between py-3">
        <div className="flex items-center gap-3">
          <Button className="p-0" variant="ghost" onClick={handleClose}>
            <X className="w-10 h-10" strokeWidth={0.75} />
          </Button>
          <p className="text-lg">{section.title}</p>
        </div>
        <div className="flex font-semibold text-sm text-center">
          {section_data.map((data) => (
            <button
              key={data.content}
              className={cn(
                "flex p-md items-center justify-center transition-colors border-b-2 border-transparent whitespace-nowrap",
                "text-disabled uppercase",
                section.content === data.content &&
                  "text-black border-b-2 border-black"
              )}
              onClick={() => setSection(data)}
            >
              {data.content}
            </button>
          ))}
        </div>
      </div>
      {section.content === SECTION_CONTENTS.DETECT ? (
        <DocumentSignalsDetect />
      ) : (
        <DocumentCapture />
      )}
    </div>
  )
}
