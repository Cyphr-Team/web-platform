export const parseGooglePlaceInfoForCreateAddress = (
  addressComponents?: google.maps.GeocoderAddressComponent[]
) => {
  const addressInfo = {
    state: "",
    city: "",
    zip: "",
    country: "",
    countryCode: ""
  }

  if (!addressComponents) return addressInfo
  /**
   * Place details response
   * https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResponses
   */
  for (const component of addressComponents) {
    if (component.types.includes("locality")) {
      addressInfo.city = component.long_name
    } else if (component.types.includes("administrative_area_level_1")) {
      addressInfo.state = component.long_name
      if (addressInfo.city === "") addressInfo.city = component.long_name
    } else if (component.types.includes("country")) {
      addressInfo.country = component.long_name
      addressInfo.countryCode = component.short_name
    } else if (component.types.includes("postal_code")) {
      addressInfo.zip = component.long_name
    }
  }
  return addressInfo
}
