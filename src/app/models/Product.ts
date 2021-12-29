export interface CreateProductDto {
  productName: string
  categories: number[]
}

export interface UpdateProductDto {
  productName: string
  description: string
  status: string
}
