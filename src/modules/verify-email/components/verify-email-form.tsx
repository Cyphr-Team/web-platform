import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

import { VerifyEmailCodeInput } from "./verify-email-input-code"
import { useVerifyEmail } from "../hooks/useVerifyEmail"

export function VerifyEmailForm() {
  const {
    loading,
    form,
    onSubmit,
    inputRefs,
    handleInputCode,
    handlePasteCode
  } = useVerifyEmail()

  return (
    <div className="flex flex-col space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col items-center"
        >
          <div className="flex space-x-3">
            {inputRefs.current.map((_, index) => {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={`codes.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <VerifyEmailCodeInput
                          maxLength={1}
                          type="string"
                          placeholder="0"
                          disabled={loading}
                          className="input-number-remove-arrow"
                          {...field}
                          onKeyDown={handleInputCode(index)}
                          onChange={() => null}
                          onPaste={handlePasteCode}
                          autoFocus={index === 0}
                          ref={(e) => {
                            field.ref(e)
                            inputRefs.current[index] = e
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )
            })}
          </div>

          <Button
            variant="outline"
            disabled={loading}
            className="ml-auto w-full text-base"
            type="submit"
          >
            Verify email
          </Button>

          <div>
            <p className="text-center text-sm text-muted-foreground inline mr-1">
              Didn’t receive the email?
            </p>
            <Button
              type="button"
              variant="ghost"
              className="p-1 h-8 inline text-primary"
            >
              Click to resend
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
