export interface RatingDto {
  id: number;
  productId: number;
  userRating: number;
  userReview: string;
}

export interface CreateRatingDto {
  productId: number;
  userRating: number;
  userReview: string;
}

export interface UpdateRatingDto {
  productId: number;
  userRating: number;
  userReview: string;
}
