import { getManager } from "typeorm";
import { Currency } from "../entity/Currency";
import { Price } from "../entity/Price";
import { Product } from "../entity/Product";
import { PriceDto, UpdatePriceDto } from "../models/Price";

class PriceService {
  constructor() {}

  public async getPrices() {
    const manager = getManager();

    const prices: Price[] = await manager.find(Price, {
      relations: ["product", "currency"],
    });

    let pricesDto: PriceDto[] = [];

    prices.forEach((price: Price) => {
      let productId = price.product.id;
      let currencyId = price.currency.id;

      const priceDto: PriceDto = {
        productId,
        currencyId,
        price: price.price,
      };
      pricesDto = [...pricesDto, priceDto];
    });
    return pricesDto;
  }

  public async createPrice(priceDto: PriceDto) {
    const manager = getManager();

    const price = new Price();
    price.price = priceDto.price;
    price.product = await manager.findOne(Product, priceDto.productId);
    price.currency = await manager.findOne(Currency, priceDto.currencyId);

    const savedPrice = await manager.save(price);

    return savedPrice;
  }

  public async deletePrice(priceId: number) {
    const manager = getManager();

    const price = await manager.findOne(Price, priceId);

    if (price) {
      await manager.remove(price);
    }

    return price;
  }

  public async updatePrice(priceId: number, priceDto: UpdatePriceDto) {
    const manager = getManager();

    const price = await manager.findOne(Price, priceId);

    if (price) {
      price.price = priceDto.price;
      price.product = await manager.findOne(Product, priceDto.productId);
      price.currency = await manager.findOne(Currency, priceDto.currencyId);
    }

    const savedPrice = await manager.save(price);

    return savedPrice;
  }
  public async getPriceById(priceId: number) {
    const manager = getManager();

    const price = await manager.findOne(Price, priceId);

    return price;
  }
}

export { PriceService };
