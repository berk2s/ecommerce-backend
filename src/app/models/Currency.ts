export interface CurrencyDto {
  price: {
    id: number
  }[]
  currencyName: string
}

export interface CreateCurrencyDto {
  price: number[]
  currencyName: string
}
// ->
// prices: {
//     price: number
//   }[]

export interface UpdateCurrencyDto {
  currencyName: string
  price: number[]
}
