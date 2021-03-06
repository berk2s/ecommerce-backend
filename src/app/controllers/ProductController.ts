import { Request, Response } from "express";
import { CreateProductDto, UpdateProductDto } from "../models/Product";
import { ProductService } from "../services/ProductService";

class ProductController {
  public async saveProduct(req: Request, res: Response) {
    const productService = new ProductService();

    const createProductDto: CreateProductDto = req.body;
    if (!createProductDto.productName) {
      res.status(400).json({ message: "You need to specify productName" });
      return;
    }
    if (!createProductDto.categories) {
      res.status(400).json({ message: "You need to specify categories" });
      return;
    }

    if (!createProductDto.description) {
      res.status(400).json({ message: "You need to specify description" });
      return;
    }

    const newProduct = await productService.createProduct(createProductDto);

    res.status(201).json(newProduct);
  }

  public async getProducts(req: Request, res: Response) {
    const productService = new ProductService();
    const searchTerm = req.query.search;
    const page = req.query.page;
    const limit = req.query.limit;

    const products = await productService.getProducts(
      searchTerm as any,
      page as any,
      limit as any
    );

    // if (products.length === 0) {
    //   res.status(404).json({ message: "There are no products" });
    //   return;
    // }

    res.json(products);
  }

  public async getProduct(req: Request, res: Response) {
    const productService = new ProductService();

    const id = req.params.id as unknown as number;

    const product = await productService.getProduct(id);
    if (!product) {
      res
        .status(404)
        .json({ message: "There is no product with that id mate." });
      return;
    }

    res.json(product);
  }

  public async deleteProduct(req: Request, res: Response) {
    const productService = new ProductService();

    const id = req.params.id as unknown as number;

    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) {
      res
        .status(404)
        .json({ message: "There is no product with that id mate." });
      return;
    }

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
