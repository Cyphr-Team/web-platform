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
      <h1 className="text-xl font-medium mb-4">Create Institution</h1>
      <div className="flex flex-col gap-4 flex-shrink-0 w-full">
        <FormField
          control={form.control}
          name="adminEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text-secondary">
                Admin email
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

        <div>
          <p className="text-text-tertiary flex gap-2">
            <Globe className="w-5" />
            Institution domain will look like:
          </p>
          <p className="font-medium flex gap-1">
            {getTenantDomain(
              exampleDomain ? exampleDomain : "[Institution Subdomain]"
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
