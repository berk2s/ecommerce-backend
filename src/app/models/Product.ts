export interface CreateProductDto {
  productName: string;
  categories: number[];
  description: string;
  status?: string;
  userRating?: number;
  userReviews?: string[];
}

export interface UpdateProductDto {
  productName: string;
  description: string;
  status?: string;
}
