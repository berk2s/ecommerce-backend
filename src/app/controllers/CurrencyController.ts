import { Request, Response } from 'express'
import { CurrencyService } from '../services/CurrencyService'

class CurrencyController {
  public async getCurrencies(req: Request, res: Response) {
    const currencyService = new CurrencyService()

    const currencies = await currencyService.getCurrencies()

    res.json(currencies)
  }

  public async saveCurrency(req: Request, res: Response) {
    const currencyService = new CurrencyService()

    const currencyDto = req.body

    const newCurrency = await currencyService.createCurrency(currencyDto)

    res.status(201).json(newCurrency)
  }
  public async deleteCurrency(req: Request, res: Response) {
    const currencyService = new CurrencyService()

    const currencyId = req.params.id as unknown as number

    await currencyService.deleteCurrency(currencyId)

    res.status(204).json({ message: 'Currency deleted successfully' })
  }

  public async updateCurrency(req: Request, res: Response) {
    const currencyService = new CurrencyService()
    const currencyDto = req.body
    const currencyId = req.params.id as unknown as number

    const updatedCurrency = await currencyService.updateCurrency(
      currencyId,
      currencyDto
    )

    res.json(updatedCurrency)
  }
}

export { CurrencyController }
