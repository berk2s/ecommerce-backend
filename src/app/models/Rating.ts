export interface RatingDto {
  productId: number;
  userRating: number;
  userReview: string;
}

export interface CreateRatingDto {
  //userID eklenecek
  productId: number;
  userRating: number;
  userReview: string;
}

export interface UpdateRatingDto {
  //sadece review değiştirilebilir olsun.
  //productName?: string
  //userRating?: number
  userReview?: string;
}
