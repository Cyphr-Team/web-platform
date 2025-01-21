import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { Globe } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { type OnboardingFormValue } from "../types"
import { getTenantDomain } from "@/utils/domain.utils"
import { Checkbox } from "@/components/ui/checkbox"

const handleSubdomainChange = (value: string) => {
  // Replace invalid characters with valid ones
  return value
    .trim()
    .replace(/[^0-9A-Za-z\s]/g, " ")
    .replace(/\s+/g, "-")
    .toLowerCase()
}

export function SelectInstitution() {
  const form = useFormContext<OnboardingFormValue>()
  const [exampleDomain, setExampleDomain] = useState<string>(
    form.getValues("subdomain")
  )

  const handleChangeSubdomain = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value

    form.setValue("subdomain", handleSubdomainChange(value), {
      shouldValidate: true,
      shouldTouch: true
    })
  }

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name") {
        form.setValue("subdomain", handleSubdomainChange(value.name ?? ""), {
          shouldValidate: true
        })
      }
      if (name === "name" || name === "subdomain")
        setExampleDomain(handleSubdomainChange(value[name ?? "name"] ?? ""))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [form])

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-xl font-medium">Create Institution</h1>
      <div className="flex w-full shrink-0 flex-col gap-4">
        <FormField
          control={form.control}
          name="adminEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text-secondary">
                Workspace Admin email
                <RequiredSymbol />
              </FormLabel>
              <FormControl>
                <Input
                  className="text-base"
                  maxLength={63}
                  placeholder="e.g. foresight_admin@c0x12c.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text-secondary">
                Institution Name
                <RequiredSymbol />
              </FormLabel>
              <FormControl>
                <Input
                  className="text-base"
                  maxLength={63}
                  placeholder="e.g. Foresight"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subdomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text-secondary">
                Institution Subdomain
                <RequiredSymbol />
              </FormLabel>
              <FormControl>
                <Input
                  className="text-base"
                  maxLength={63}
                  placeholder="e.g. foresight"
                  {...field}
                  onChange={handleChangeSubdomain}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text-secondary">
                Institution Key
                <RequiredSymbol />
              </FormLabel>
              <FormControl>
                <Input
                  className="text-base"
                  maxLength={63}
                  placeholder="e.g. foresight"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isMfaEnabled"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormControl>
                <div className="mt-1 flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    className="size-5"
                    onCheckedChange={field.onChange}
                  />
                  <p className="flex gap-1 text-sm">
                    Enable Multi-Factor Authentication for
                    <span className="font-medium">
                      {exampleDomain
                        ? exampleDomain
                        : "[Institution Subdomain]"}
                    </span>
                  </p>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <p className="flex gap-2 text-text-tertiary">
            <Globe className="w-5" />
            Institution domain will look like:
          </p>
          <p className="flex gap-1 font-medium">
            {getTenantDomain(
              exampleDomain ? exampleDomain : "[Institution Subdomain]"
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
