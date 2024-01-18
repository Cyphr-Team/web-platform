import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export default function SignUpGoogleButton() {
  return (
    <Button
      className="w-full text-base"
      variant="outline"
      type="button"
      onClick={() => {}}
    >
      <Icons.google className="mr-2 h-4 w-4" />
      Sign up with Google
    </Button>
  )
}
