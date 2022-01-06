export interface CreateProductDto {
  productName: string;
  categories: number[];
  description: string;
  status?: string;
  userRating?: number;
  userReviews?: string[];
  properties?: number[];
}

export interface UpdateProductDto {
  productName?: string;
  description?: string;
  categories?: number[];
  status?: string;
  properties?: number[];
}
