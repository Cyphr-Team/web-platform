import { Button } from "@/components/ui/button"
import { useConnectPlaid } from "../../hooks/useConnectPlaid"
import { Check } from "lucide-react"

export function ConnectPlaidButton() {
  const { open, ready, linkSuccess } = useConnectPlaid()

  return linkSuccess ? (
    <Button
      className="flex w-fit gap-1 bg-primary px-lg py-md text-white"
      type="button"
    >
      <p>Connected</p>
      <Check className="text-white" size={20} />
    </Button>
  ) : (
    <Button
      className="w-fit bg-black px-lg py-md text-white"
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
