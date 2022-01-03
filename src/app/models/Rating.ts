export interface RatingDto {
  productID: number
  userRating: number[]
  userReview: string[]
}

export interface CreateRatingDto {
  //userID eklenecek
  productID: number
  userRating: number
  userReview: string
}

export interface UpdateRatingDto {
  //sadece review değiştirilebilir olsun.
  //productName?: string
  //userRating?: number
  userReview?: string
}
