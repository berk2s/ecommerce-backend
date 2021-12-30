export interface CreateProductDto {
  productName: string;
  categories: number[];
  description: string;
  status: string;
}

export interface UpdateProductDto {
  productName: string;
  description: string;
  status: string;
}
