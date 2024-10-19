import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { type Libraries, useJsApiLoader } from "@react-google-maps/api"
import { debounce } from "lodash"
import { useEffect, useMemo, useRef, useState } from "react"
import { APP_CONFIGS } from "@/configs"
import { type AddressType } from "@/types/common.type"
import { parseGooglePlaceInfoForCreateAddress } from "@/utils/converter.utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useDebounce } from "react-use"

type PlaceType = google.maps.places.AutocompletePrediction
interface Props {
  onSelect: (value: AddressType) => void
  defaultValues: AddressType
}

const FormSchema = z.object({
  search: z.string()
})

const placesLibrary: Libraries = ["places"]

export const AutoCompleteGoogleMap: React.FC<Props> = ({
  onSelect,
  defaultValues
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: APP_CONFIGS.VITE_GOOGLE_PLACE_API_KEY,
    libraries: placesLibrary,
    region: "US"
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: defaultValues?.addressLine1 ?? ""
    }
  })

  const formValues = form.watch()

  const [value, setValue] = useState<PlaceType | null>(null)
  const [options, setOptions] = useState<readonly PlaceType[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const [open, setOpen] = useState(false)

  const fakeMapRef = useRef<HTMLDivElement | null>(null)
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>()

  const mapRef = useRef<google.maps.Map | null>(null)
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null)

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results: PlaceType[] | null) => void
        ) => {
          setIsFetching(true)
          autocompleteServiceRef.current?.getPlacePredictions(request, callback)
        },
        400
      ),
    []
  )

  const handleChange = async (value: PlaceType | null) => {
    if (!placesServiceRef.current) return
    if (value) {
      setValue(value)
      placesServiceRef.current.getDetails(
        { placeId: value.place_id },
        (res) => {
          const placeInfo = parseGooglePlaceInfoForCreateAddress(
            res?.address_components
          )
          const address = {
            addressLine1: value.structured_formatting.main_text,
            state: placeInfo.state,
            country: placeInfo.country,
            countryCode: placeInfo.countryCode,
            zip: placeInfo.zip,
            city: placeInfo.city
          } as AddressType

          form.setValue("search", address.addressLine1)

          onSelect(address)
          setOptions([])
          setOpen(false)
        }
      )
    }
  }

  /**
   * Searching input
   */
  useDebounce(
    () => {
      if (!autocompleteServiceRef.current) return

      let active = true

      if (formValues.search === "") {
        setOptions(value ? [value] : [])

        return
      } else {
        fetch({ input: formValues.search }, (results) => {
          if (active) {
            setIsFetching(false)
            let newOptions: readonly PlaceType[] = []

            if (value) {
              newOptions = results?.some(
                (result) => result.place_id === value.place_id
              )
                ? []
                : [value]
            }

            if (results) {
              newOptions = [...newOptions, ...results]
            }
            setOptions(newOptions)
            setOpen(true)
          }
        })
      }

      return () => {
        active = false
      }
    },
    500,
    [formValues.search]
  )

  /**
   * initial autocompleteService
   */
  useEffect(() => {
    if (!isLoaded) return
    if (!autocompleteServiceRef.current) {
      autocompleteServiceRef.current =
        new google.maps.places.AutocompleteService()
    }
  }, [isLoaded])

  /**
   * initial placesServiceRef for getDetails address
   * (lat, lng, state, country, country code, zip, city)
   */
  useEffect(() => {
    if (!fakeMapRef.current || !isLoaded) return

    if (!mapRef.current) {
      mapRef.current = new google.maps.Map(fakeMapRef.current)
    }
    if (!placesServiceRef.current) {
      placesServiceRef.current = new google.maps.places.PlacesService(
        mapRef.current
      )
    }
  }, [fakeMapRef, isLoaded])

  return (
    <div className="col-span-12">
      <div ref={fakeMapRef} />
      <Popover open={open} onOpenChange={setOpen}>
        <div className="relative">
          <Label className="text-text-secondary">Business street address</Label>
          <Input
            className="mt-2"
            placeholder="Start typing your address"
            type="text"
            {...form.register("search")}
          />
          <PopoverTrigger className="absolute" />
        </div>

        <PopoverContent align="start" className="p-0 w-screen max-w-screen-sm">
          <Command>
            <CommandGroup className="overflow-auto">
              {isFetching ? <CommandItem>Loading...</CommandItem> : null}
              {options.map((option) => {
                return (
                  <CommandItem
                    key={option.place_id}
                    onSelect={() => {
                      handleChange(option)
                    }}
                  >
                    {option.description}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
