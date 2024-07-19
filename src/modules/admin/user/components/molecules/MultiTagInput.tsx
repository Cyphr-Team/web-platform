import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useState, useCallback, KeyboardEvent } from "react"
import { FormControl, FormItem, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Controller, useFormContext } from "react-hook-form"
import { inviteLaunchKCRoleOptions } from "../../constants/roles.constants"
import { checkValidEmail, removeWhitespace } from "@/utils"

const useTags = (initialTags: string[] = []) => {
  const [tags, setTags] = useState<string[]>(initialTags)

  const addTag = useCallback(
    (tag: string) => {
      if (tag && !tags.includes(tag)) {
        setTags((prevTags) => [...prevTags, tag])
      }
    },
    [tags]
  )

  const removeTag = useCallback((index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index))
  }, [])

  return {
    tags,
    addTag,
    removeTag
  }
}

export const MultiTagInput = () => {
  const { tags, addTag, removeTag } = useTags()
  const form = useFormContext()

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const target = event.target as HTMLInputElement
    if (event.key === "Enter") {
      const trimmedValue = removeWhitespace(target.value)
      if (trimmedValue && checkValidEmail(trimmedValue)) {
        addTag(trimmedValue)
        form.setValue("emails", [...tags, trimmedValue])
        form.trigger("emails")
        target.value = ""
      }
    }
  }

  // This function is added to prevent auto-submitting the form when pressing Enter key
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }

  return (
    <div className="mt-1">
      <p className="font-medium">Invite team members</p>
      <div className="flex flex-wrap flex-row gap-2 border border-black shadow-md p-2 rounded-lg mt-1">
        <div className="w-3/5 flex flex-wrap items-center">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="border rounded-lg px-3 py-1 m-1 flex items-center w-fit"
            >
              <span className="text-sm">{tag}</span>
              <i
                className="material-icons ml-1 cursor-pointer"
                onClick={() => {
                  removeTag(index)
                  form.setValue(
                    "emails",
                    tags.filter((_, i) => i !== index)
                  )
                  form.trigger("emails")
                }}
              >
                <X size={14} className="text-gray-400" />
              </i>
            </div>
          ))}
          <Input
            type="text"
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
            placeholder="Type to add..."
            className="rounded-sm w-full border-1 m-1"
            wrapperClassName="w-full"
          />
        </div>

        <div className="md:w-1/3 mt-1 mr-0 ml-auto">
          <Controller
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="bg-gray-200 rounded-lg px-3 py-1 flex items-center group">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {inviteLaunchKCRoleOptions().map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}
