export interface CreateRatingDto {
    productID: number
    productName: string
    userRating: number
    userReview: string
}

export interface UpdateRatingDto {
    productName?: string
    userRating?: number
    userReview?: string
}
