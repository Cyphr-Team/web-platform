interface Institution {
  institutionId: string
  name: string
  logo?: string
  routingNumbers: string[]
}

interface InstitutionResponse {
  total: number
  currentOffset: number
  data: Institution[]
}

export type { Institution, InstitutionResponse }
