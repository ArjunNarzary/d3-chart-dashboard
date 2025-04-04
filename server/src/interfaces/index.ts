export interface IAcctIndustryValues {
  total_acv: number
  total_count: number
  percentage_of_count?: number
  percentage_of_acv?: number
}

export interface IResponseType {
  [key: string]: {
    [key: string]: IAcctIndustryValues
  }
}
