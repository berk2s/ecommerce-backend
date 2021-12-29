import { getManager } from 'typeorm'
import { Price } from '../entity/Price'
import { PriceDto } from '../models/Price'

class PriceService {
  constructor() {}

  public async getPrices() {
    const manager = getManager()

    const prices: Price[] = await manager.find(Price, {
      relations: ['product', 'currency'],
    })

    let pricesDto: PriceDto[] = []

    prices.forEach((price: Price) => {
      
    })
  }
}

export { PriceService }
