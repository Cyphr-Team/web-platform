const NOT_FOUND_INSTITUTION_SUPPORT =
  "mailto:info@cyphrai.com?subject=404%20Error%20Report&body=Hello%20Support%20Team,%0D%0A%0D%0AI%20encountered%20a%20404%20error%20while%20trying%20to%20access%20the%20following%20URL:%20[Please%20insert%20the%20URL%20of%20the%20page%20here].%20%0D%0A%0D%0AAdditional%20comments:%20[Please%20provide%20any%20additional%20details%20or%20comments%20here].%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]"

const SUPPORT_EMAIL = (email: string) =>
  `mailto:${email}?subject=Support&body=Hello%20Support%20Team,%0A%0D%0AAdditional%20comments:%20[Please%20provide%20any%20additional%20details%20or%20comments%20here].%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]`

export { NOT_FOUND_INSTITUTION_SUPPORT, SUPPORT_EMAIL }
