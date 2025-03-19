export const NUMBER = "{index}"

export const getArrayFieldName = <T extends string, P>(
  fieldName: T,
  index: number
): P => {
  return fieldName.replace(NUMBER, index.toString()) as P
}
