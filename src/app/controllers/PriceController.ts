import { Request, Response } from "express";
import { UpdatePriceDto } from "../models/Price";
import { PriceService } from "../services/PriceService";

class PriceController {
  public async getPrices(req: Request, res: Response) {
    const priceService = new PriceService();

    const prices = await priceService.getPrices();

    if (prices.length === 0) {
      res.status(404).json({ message: "There are no prices" });
      return;
    }

    res.json(prices);
  }

  public async createPrice(req: Request, res: Response) {
    const priceService = new PriceService();

    const priceDto = req.body;
    if (!priceDto.price) {
      res.status(400).json({ message: "You need to specify price" });
      return;
    }
    if (!priceDto.productId) {
      res.status(400).json({ message: "You need to specify productId" });
      return;
    }
    if (!priceDto.currencyId) {
      res.status(400).json({ message: "You need to specify currencyId" });
      return;
    }

    const newPrice = await priceService.createPrice(priceDto);

    res.status(201).json(newPrice);
  }

  public async updatePrice(req: Request, res: Response) {
    const priceService = new PriceService();

    const priceId = req.params.id as unknown as number;
    const priceDto: UpdatePriceDto = req.body;

    const updatedPrice = await priceService.updatePrice(priceId, priceDto);
    if (!updatedPrice) {
      res.status(404).json({ message: "There is no price with that id mate." });
      return;
    }

    res.json(updatedPrice);
  }

  public async deletePrice(req: Request, res: Response) {
    const priceService = new PriceService();

    const priceId = req.params.id as unknown as number;

    const deletedPrice = await priceService.deletePrice(priceId);
    if (!deletedPrice) {
      res.status(404).json({ message: "There is no price with that id mate." });
      return;
    }

    res.status(204).json({ message: "Price deleted" });
  }
  public async getPriceById(req: Request, res: Response) {
    const priceService = new PriceService();

    const priceId = req.params.id as unknown as number;

    const price = await priceService.getPriceById(priceId);
    if (!price) {
      res.status(404).json({ message: "There is no price with that id mate." });
      return;
    }

    res.json(price);
  }
}

export { PriceController };
