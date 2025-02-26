import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { InputPassword } from "@/components/ui/input.tsx"
import { useFormContext } from "react-hook-form"

function PasswordConfirmationForm() {
  const method = useFormContext()

  return (
    <FormField
      control={method.control}
      name="inputPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-normal text-[#252828]">
            Please confirm your password if you want to proceed:
          </FormLabel>
          <FormControl className="hover:border hover:shadow-md focus:border focus:drop-shadow-lg">
            <InputPassword
              autoComplete="current-password"
              className="text-base"
              placeholder="••••••••"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PasswordConfirmationForm
