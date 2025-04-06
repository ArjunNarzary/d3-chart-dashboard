export interface IResponseType {
  [key: string]: {
    [key: string]: {
      [key: string]: number
    }
  }
}

export interface DataItem {
  category: string
  value: number
}
