import { PriceService } from '../services/PriceService'

class PriceController {
  public async getPrices(req: Request, res: Response) {
    const priceService = new PriceService()

    const prices = await priceService.getPrices()

    res.json(prices)
  }
}

export { PriceController }
