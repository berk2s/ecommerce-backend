import { getManager } from "typeorm";
import { Product } from "../entity/Product";
import { Rating } from "../entity/Rating";
import { CreateRatingDto, RatingDto, UpdateRatingDto } from "../models/Rating";

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
        id: rating.id,
        productId,
        // Dto dan gelen userRating
        userRating: rating.userRating,
        userReview: rating.userReview,
      };
      ratingsDto = [...ratingsDto, ratingDto];
    });
    return ratingsDto;
  }

  public async createRating(ratingDto: CreateRatingDto) {
    const manager = getManager();

    const rating = new Rating();
    rating.userRating = ratingDto.userRating;
    rating.userReview = ratingDto.userReview;
    rating.product = await manager.findOne(Product, ratingDto.productId);

    const savedRating = await manager.save(rating);

    return savedRating;
  }

  public async updateRating(productId: number, ratingDto: UpdateRatingDto) {
    const manager = getManager();

    const rating = await manager.findOne(Rating, productId);

    if (rating) {
      rating.userRating = ratingDto.userRating;
      rating.userReview = ratingDto.userReview;
      rating.product = await manager.findOne(Product, ratingDto.productId);

      await manager.save(rating);
    }

    return rating;
  }

  public async deleteRating(productId: number) {
    const manager = getManager();

    const rating = await manager.findOne(Rating, productId);

    if (rating) {
      await manager.remove(rating);
    }

    return rating;
  }

  public async getRatingById(ratingId: number) {
    const manager = getManager();

    const rating = await manager.findOne(Rating, ratingId);

    return rating;
  }
}

export { RatingService };
