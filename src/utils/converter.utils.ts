import _ from "lodash"

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

/**
 * Recursively convert all keys in an object to camelCase.
 *
 * @example
 * const obj = {
 *   some_key: 'value',
 *   nested: {
 *     another_key: 'another value'
 *   }
 * }
 *
 * camelize(obj) // { someKey: 'value', nested: { anotherKey: 'another value' } }
 *
 * @param obj The object to convert
 * @returns The object with camelCased keys
 *
 * Ref: https://stackoverflow.com/questions/59769649/recursively-convert-an-object-fields-from-snake-case-to-camelcase
 */
export const camelize = (obj: Record<string, unknown>) =>
  _.transform(obj, (acc: Record<string, unknown>, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key)

    acc[camelKey] = _.isObject(value)
      ? camelize(value as Record<string, unknown>)
      : value
  })

/**
 * Converts a JSON string representation of an object to an object with camelCased keys.
 *
 * @example
 * const jsonString = '{"some_key": "value", "nested": {"another_key": "another value"}}';
 * camelizeStringObject(jsonString); // { someKey: 'value', nested: { anotherKey: 'another value' } }
 *
 * @param obj The JSON string of the object to convert
 * @returns The object with camelCased keys
 */
export const camelizeStringObject = (obj: string) =>
  camelize(JSON.parse(obj) as Record<string, unknown>) as object

/**
 * Converts bytes to megabytes (MB).
 *
 * @param {number} bytes - The size in bytes to be converted.
 * @param {number} [decimalPlaces=2] - (Optional) The number of decimal places to round to.
 * @returns {number} - The converted size in megabytes (MB), rounded to the specified decimal places.
 *
 * @throws {Error} If bytes or decimalPlaces are invalid (negative or non-numeric).
 *
 * @example
 * convertBytesToMB(1048576); // Returns 1
 * convertBytesToMB(1048576, 3); // Returns 1.000
 */
export const convertBytesToMB = (bytes: number, decimalPlaces = 2): number => {
  if (typeof bytes !== "number" || bytes < 0) {
    throw new Error("Bytes must be a non-negative number.")
  }
  if (typeof decimalPlaces !== "number" || decimalPlaces < 0) {
    throw new Error("Decimal places must be a non-negative number.")
  }

  const MB = 1024 * 1024 // 1 MB = 1024 KB = 1024 * 1024 bytes

  return parseFloat((bytes / MB).toFixed(decimalPlaces))
}
