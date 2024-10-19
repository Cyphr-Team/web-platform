import { Button } from "@/components/ui/button"
import { useConnectPlaid } from "../../hooks/useConnectPlaid"
import { Check } from "lucide-react"

export function ConnectPlaidButton() {
  const { open, ready, linkSuccess } = useConnectPlaid()

  return linkSuccess ? (
    <Button
      className="text-primary bg-primary w-fit text-white px-lg py-md flex gap-1"
      type="button"
    >
      <p>Connected</p>
      <Check className="text-white" size={20} />
    </Button>
  ) : (
    <Button
      className="text-primary bg-black w-fit text-white px-lg py-md"
      disabled={!ready}
      type="button"
      onClick={() => {
        open()
      }}
    >
      Connect
    </Button>
  )
}
