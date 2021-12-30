import { Request, Response } from "express";
import { CreateProductDto, UpdateProductDto } from "../models/Product";
import { ProductService } from "../services/ProductService";

class ProductController {
  public async saveProduct(req: Request, res: Response) {
    const productService = new ProductService();

    const createProductDto: CreateProductDto = req.body;

    const newProduct = await productService.createProduct(createProductDto);

    res.json(newProduct);
  }

  public async getProducts(req: Request, res: Response) {
    const productService = new ProductService();

    const products = await productService.getProducts();

    res.json(products);
  }

  public async getProduct(req: Request, res: Response) {
    const productService = new ProductService();

    const id = req.params.id as unknown as number;

    const product = await productService.getProduct(id);

    res.json(product);
  }

  public async deleteProduct(req: Request, res: Response) {
    const productService = new ProductService();

    const id = req.params.id as unknown as number;

    await productService.deleteProduct(id);

    res.status(204).json();
  }

  public async updateProduct(req: Request, res: Response) {
    const productService = new ProductService();
    const updateProductDto: UpdateProductDto = req.body;
    const productId = req.params.id as unknown as number;

    const updatedProduct = await productService.updateProduct(
      productId,
      updateProductDto
    );

    res.json(updatedProduct);
  }
}
export { ProductController };
