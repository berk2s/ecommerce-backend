import { getManager } from "typeorm";
import { Currency } from "../entity/Currency";
import { Price } from "../entity/Price";
import {
  CreateCurrencyDto,
  CurrencyDto,
  UpdateCurrencyDto,
} from "../models/Currency";

class CurrencyService {
  constructor() {}
  public async getCurrencies() {
    const manager = getManager();

    const currencies: Currency[] = await manager.find(Currency, {
      relations: ["price"],
    });

    let currenciesDto: CurrencyDto[] = [];

    currencies.forEach((currency: Currency) => {
      const priceArr = currency.price.map((price) => {
        return {
          id: price.id,
        };
      });

      const currencyDto: CurrencyDto = {
        price: [...priceArr],
        currencyName: currency.currencyName,
        id: currency.id,
      };

      currenciesDto = [...currenciesDto, currencyDto];
    });

    return currenciesDto;
  }

  public async createCurrency(createCurrencyDto: CreateCurrencyDto) {
    const manager = getManager();

    const currency = new Currency();
    currency.currencyName = createCurrencyDto.currencyName;
    currency.price = [];

    const prices = await manager.findByIds(Price, createCurrencyDto.price);

    prices.forEach((price) => {
      currency.price = [...currency.price, price];
    });

    const savedCurrency = await manager.save(currency);

    return savedCurrency;
  }

  public async deleteCurrency(currencyId: number) {
    const manager = getManager();

    const currency = await manager.findOne(Currency, currencyId);

    if (currency) {
      await manager.remove(currency);
    }

    return currency;
  }

  public async updateCurrency(
    currencyId: number,
    updateCurrencyDto: UpdateCurrencyDto
  ) {
    const manager = getManager(); // get repository

    const currency = await manager.findOne(Currency, currencyId, {
      relations: ["price"],
    });

    if (!currency) {
      return { message: "There is no currency with that id mate." };
    }

    if (
      updateCurrencyDto.deletedPrices &&
      Array.isArray(updateCurrencyDto.deletedPrices)
    ) {
      updateCurrencyDto.deletedPrices.forEach((priceId) => {
        const isPriceExist = currency.price.find(
          (price) => price.id === priceId
        );
        if (isPriceExist) {
          currency.price = [
            ...currency.price.filter((price) => price.id !== priceId),
          ];
        }
      });
    }

    if (
      updateCurrencyDto.addedPrices &&
      Array.isArray(updateCurrencyDto.addedPrices)
    ) {
      const prices = await manager.findByIds(
        Price,
        updateCurrencyDto.addedPrices
      );

      if (prices) {
        prices.forEach((price) => {
          currency.price = [...currency.price, price];
        });
      }
    }

    currency.currencyName = updateCurrencyDto.currencyName;

    const currencyUpdated = await manager.save(currency);

    return currencyUpdated;
  }

  public async getCurrencyById(currencyId: number) {
    const manager = getManager();

    const currency = await manager.findOne(Currency, currencyId);

    return currency;
  }
}

export { CurrencyService };
