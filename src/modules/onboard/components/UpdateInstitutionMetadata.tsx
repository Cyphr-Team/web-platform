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
import { UploadImageZone } from "../../../components/ui/UploadImageZone"
import { OnboardingFormValue } from "../types"

export function UpdateInstitutionMetadata() {
  const form = useFormContext<OnboardingFormValue>()

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-medium mb-4">Update Institution Metadata</h1>
      <div className="flex flex-col gap-4 flex-shrink-0 w-full">
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
                  placeholder="e.g. help@tryforesight.io"
                  className="text-base"
                  maxLength={63}
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
                  name={field.name}
                  handleUploadPhoto={(file) => {
                    field.onChange(file.url)
                  }}
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
                  name={field.name}
                  handleUploadPhoto={(file) => {
                    field.onChange(file.url)
                  }}
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
