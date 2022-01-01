import { Request, Response } from "express";
import { CreateCurrencyDto } from "../models/Currency";
import { CurrencyService } from "../services/CurrencyService";

class CurrencyController {
  public async getCurrencies(req: Request, res: Response) {
    const currencyService = new CurrencyService();

    const currencies = await currencyService.getCurrencies();

    if (currencies.length === 0) {
      res.status(404).json({ message: "There are no currencies" });
      return;
    }

    res.json(currencies);
  }

  /**
   *
   * @param req request
   * @param res response
   * @returns the new currency
   */

  public async saveCurrency(req: Request, res: Response) {
    const currencyService = new CurrencyService();

    const currencyDto: CreateCurrencyDto = req.body;
    if (!currencyDto.price) {
      res.status(400).json({ message: "You need to specify price" });
      return;
    }
    if (!currencyDto.currencyName) {
      res.status(400).json({ message: "You need to specify currencyName" });
      return;
    }

    const newCurrency = await currencyService.createCurrency(currencyDto);

    res.status(201).json(newCurrency);
  }
  public async deleteCurrency(req: Request, res: Response) {
    const currencyService = new CurrencyService();

    const currencyId = req.params.id as unknown as number;

    const deletedCurrency = await currencyService.deleteCurrency(currencyId);
    if (!deletedCurrency) {
      res
        .status(404)
        .json({ message: "There is no currency with that id mate." });
      return;
    }

    res.status(204).json({ message: "Currency deleted successfully" });
  }

  public async updateCurrency(req: Request, res: Response) {
    const currencyService = new CurrencyService();
    const currencyDto = req.body;
    const currencyId = req.params.id as unknown as number;

    const updatedCurrency = await currencyService.updateCurrency(
      currencyId,
      currencyDto
    );

    res.json(updatedCurrency);
  }

  public async getCurrencyById(req: Request, res: Response) {
    const currencyService = new CurrencyService();
    const currencyId = req.params.id as unknown as number;

    const currency = await currencyService.getCurrencyById(currencyId);
    if (!currency) {
      res
        .status(404)
        .json({ message: "There is no currency with that id mate." });
      return;
    }

    res.json(currency);
  }
}

export { CurrencyController };
