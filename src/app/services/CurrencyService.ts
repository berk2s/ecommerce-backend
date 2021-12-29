import { getManager } from 'typeorm'
import { Currency } from '../entity/Currency'
import { Price } from '../entity/Price'
import { CreateCurrencyDto, CurrencyDto, UpdateCurrencyDto } from '../models/Currency'

class CurrencyService {
  constructor() {}
  public async getCurrencies() {
    const manager = getManager()

    const currencies: Currency[] = await manager.find(Currency, {
      relations: ['price'],
    })

    let currenciesDto: CurrencyDto[] = []

    currencies.forEach((currency: Currency) => {
      const priceArr = currency.price.map((price) => {
        return {
          id: price.id,
        }
      })

      const currencyDto: CurrencyDto = {
        price: [...priceArr],
        currencyName: currency.currencyName,
      }

      currenciesDto = [...currenciesDto, currencyDto]
    })

    return currenciesDto
    // const manager = getManager()

    // const currencies = await manager.find(Currency)

    // return currencies
  }

  public async createCurrency(createCurrencyDto: CreateCurrencyDto) {
    const manager = getManager()

    const currency = new Currency()
    currency.currencyName = createCurrencyDto.currencyName
    currency.price = []

    const prices = await manager.findByIds(Price, createCurrencyDto.price)

    prices.forEach((price) => {
      currency.price = [...currency.price, price]
    })

    const savedCurrency = await manager.save(currency)

    return savedCurrency
  }

  public async deleteCurrency(currencyId: number) {
    const manager = getManager()

    const currency = await manager.findOne(Currency, currencyId)

    await manager.remove(currency)
  }

  public async updateCurrency(currencyId: number, updateCurrencyDto: UpdateCurrencyDto) {
    const manager = getManager() // get repository

    const currency = await manager.findOne(Currency, currencyId)

    if (currency) {
      currency.currencyName = updateCurrencyDto.currencyName
      currency.price = [...updateCurrencyDto.price] as unknown as Price[]
    }
    const currencyUpdated = await manager.save(currency)

    return currencyUpdated
  }
}

export { CurrencyService }
