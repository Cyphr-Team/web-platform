export const revenueToDateOptions = [
  {
    label: "No revenue",
    value: "no_revenue"
  },
  {
    label: "$1 - $5,000",
    value: "one_to_five_thousands"
  },
  {
    label: "$5,001 - $50,000",
    value: "five_thousands_one_to_fifty_thousands"
  },
  {
    label: "$50,001 - $100,000",
    value: "fifty_thousands_one_to_one_hundred_thousands"
  },
  {
    label: "$100,001 - $500,000",
    value: "one_hundred_thousands_one_to_two_fifty_thousands"
  },
  {
    label: "$500,001 - $1,000,000",
    value: "five_hundred_thousands_one_to_one_million"
  },
  {
    label: "Over $1,000,000",
    value: "over_one_million"
  }
]

export const revenueLastMonthOptions = [
  {
    label: "No revenue",
    value: "no_revenue"
  },
  {
    label: "$1 - $5,000",
    value: "one_to_five_thousands"
  },
  {
    label: "$5,001 - $50,000",
    value: "five_thousands_one_to_fifty_thousands"
  },
  {
    label: "$50,001 - $100,000",
    value: "fifty_thousands_one_to_one_hundred_thousands"
  },
  {
    label: "$100,001 - $250,000",
    value: "one_hundred_thousands_one_to_two_fifty_thousands"
  },
  {
    label: "$250,001 - $500,000",
    value: "two_fifty_thousands_one_to_five_hundred_thousands"
  },
  {
    label: "Over $500,000",
    value: "over_five_hundred_thousands"
  }
]

export const convertRevenueRangeToNumber = (revenueRange: string): string => {
  switch (revenueRange) {
    case "no_revenue":
      return "No revenue"
    case "one_to_five_thousands":
      return "$1 - $5,000"
    case "five_thousands_one_to_fifty_thousands":
      return "$5,001 - $50,000"
    case "fifty_thousands_one_to_one_hundred_thousands":
      return "$50,001 - $100,000"
    case "one_hundred_thousands_one_to_two_fifty_thousands":
      return "$100,001 - $250,000"
    case "two_fifty_thousands_one_to_five_hundred_thousands":
      return "$250,001 - $500,000"
    case "five_hundred_thousands_one_to_one_million":
      return "$500,001 - $1,000,000"
    case "over_five_hundred_thousands":
      return "Over $500,000"
    case "over_one_million":
      return "Over $1,000,000"
    default:
      return "No revenue"
  }
}
