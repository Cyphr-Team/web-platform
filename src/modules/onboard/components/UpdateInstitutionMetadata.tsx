import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { useFormContext } from "react-hook-form"
import { UploadImageZone } from "@/components/ui/UploadImageZone.tsx"
import { type OnboardingFormValue } from "../types"

export function UpdateInstitutionMetadata({
  subdomain
}: {
  subdomain: string
}) {
  const form = useFormContext<OnboardingFormValue>()

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-xl font-medium">Update Institution Metadata</h1>
      <div className="flex w-full shrink-0 flex-col gap-4">
        <FormField
          control={form.control}
          name="supportEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text-secondary">
                Institution Support email
                <RequiredSymbol />
              </FormLabel>
              <FormControl>
                <Input
                  className="text-base"
                  maxLength={63}
                  placeholder="e.g. info@cyphrai.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text-secondary">
                Institution Logo
                <RequiredSymbol />
              </FormLabel>
              <FormControl>
                <UploadImageZone
                  handleUploadPhoto={(file) => {
                    field.onChange(file.url)
                  }}
                  name={field.name}
                  subdomain={subdomain}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="textLogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text-secondary">
                Institution Logo Text
                <RequiredSymbol />
              </FormLabel>
              <FormControl>
                <UploadImageZone
                  handleUploadPhoto={(file) => {
                    field.onChange(file.url)
                  }}
                  name={field.name}
                  subdomain={subdomain}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
