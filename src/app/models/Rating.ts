export interface RatingDto {
  productId: number;
  userRating: number;
  userReview: string;
}

export interface CreateRatingDto {
  productId: number;
  userRating: number;
  userReview: string;
}
