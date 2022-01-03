// array olarak gelen review ve rating değerleri burada manipulate edilecek.
import { getManager } from 'typeorm'
import { Product } from '../entity/Product'
import { Rating } from '../entity/Rating'
import { CreateRatingDto, RatingDto, UpdateRatingDto } from '../models/Rating'
//import { CreateProductDto, UpdateProductDto } from '../models/Product'

class RatingService{
  constructor() {}

  public async getRatings() {
    const manager = getManager()

    const ratings: Rating[] = await manager.find(Rating, {
      relations: ['userRating', 'userReview'],
    })

    const products: Product[] = await manager.find(Product, {
      relations: ['productId', 'userRatings', 'userReviews']
    })

    let ratingsDto: RatingDto[] = []

    ratings.forEach((rating: Rating) => {
      let productId = rating.product.id;
      let userRating = rating.userRating;
      let userReview = rating.userReview;

      const ratingDto: RatingDto = {
        productId,
        userRating,
        userReview,
      };
      ratingsDto = [...ratingsDto, ratingDto];
    });
    return ratingsDto;

    // ratings.forEach((rating: Rating) => {
    //   const ratingArr = rating.userRating.map((userRating) => {
    //     return {
    //       id: userRating.id,
    //     }
    //   })

    //   const ratingDto: RatingDto = {
    //     userRating: [...ratingArr],
    //     userReview: [...reviewArr],
    //     productID: 0
    //   }

    //   ratingDto = [...currenciesDto, currencyDto]
    // })

    // return currenciesDto
    // const manager = getManager()

    // const currencies = await manager.find(Currency)

    // return currencies
  }

  public async getRating(id: number) {
    const manager = getManager()
    const rating = await manager.findOne(Rating, id)
    return rating
  }

  public async createRating(createRatingDto: CreateRatingDto) {
    // TODO: implement userID
    const manager = getManager()
    const productId = createRatingDto.productID;

    const product: Product = await manager.findOne(Product, productId);

    const rating = new Rating();
    // TODO: implement user id
    rating.product = product;
    rating.userReview = createRatingDto.userReview
    rating.userRating = createRatingDto.userRating

    const savedReview = manager.save(rating);

    return savedReview;
  }

  public async deleteRating(ratingId: number) {
    const manager = getManager()

    const rating = await manager.findOne(Rating, ratingId)

    await manager.remove(rating)
  }

  public async updateRating(ratingId: number, updateRatingDto: UpdateRatingDto) {
    const manager = getManager() // get repository

    const rating = await manager.findOne(Rating, ratingId)

    if (rating) {
      rating.userReview = updateRatingDto.userReview
    }
    const ratingUpdated = await manager.save(rating)

    return ratingUpdated
  }

}

export { RatingService };
