import { getManager } from "typeorm";
import { Product } from "../entity/Product";
import { Rating } from "../entity/Rating";
import { RatingDto } from "../models/Rating";

class RatingService {
  constructor() {}

  public async getRatings() {
    const manager = getManager();

    const ratings: Rating[] = await manager.find(Rating, {
      relations: ["product"],
    });

    let ratingsDto: RatingDto[] = [];

    ratings.forEach((rating: Rating) => {
      let productId = rating.product.id;

      const ratingDto: RatingDto = {
        productId,
        // Dto dan gelen userRating
        userRating: rating.userRating,
        userReview: rating.userReview,
      };
      ratingsDto = [...ratingsDto, ratingDto];
    });
    return ratingsDto;
  }

  public async createRating(ratingDto: RatingDto) {
    const manager = getManager();

    const rating = new Rating();
    rating.userRating = ratingDto.userRating;
    rating.userReview = ratingDto.userReview;
    rating.product = await manager.findOne(Product, ratingDto.productId);

    const savedRating = await manager.save(rating);

    return savedRating;
  }
}

export { RatingService };
