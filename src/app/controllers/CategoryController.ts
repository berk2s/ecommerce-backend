import { Request, Response } from "express";
import { CreateCategoryDto, UpdateCategoryDto } from "../models/Category";
import { CategoryService } from "../services/CategoryService";

class CategoryController {
  /**
   *
   * @param req the object that contains the information of the request
   * @param res response
   * @returns Arrays of Category
   */
  public async getCategoryById(req: Request, res: Response) {
    const categoryService = new CategoryService();

    const categoryId = req.params.id as unknown as number;

    const category = await categoryService.getCategoryById(categoryId);

    res.json(category);
  }

  /**
   *
   * @param req request
   * @param res response
   * @returns the new category
   */
  public async saveCategory(req: Request, res: Response) {
    const categoryService = new CategoryService();
    const createCategoryDto: CreateCategoryDto = req.body;

    const savedCategory = await categoryService.createCategory(
      createCategoryDto
    );

    if (!createCategoryDto.parents) {
      res.status(400).json({ message: "Categories are required" });
    }

    if (!savedCategory) {
      res.status(400).json();
    }

    res.status(201).json(savedCategory);
  }

  /**
   *
   * @param req request
   * @param res response
   * @returns all categories
   */
  public async getCategories(req: Request, res: Response) {
    const categoryService = new CategoryService();

    const categories = await categoryService.getCategories();

    console.log(req);
    res.json(categories);
  }

  /**
   * Delete a category
   * @param req request
   * @param res response
   */
  public async deleteCategory(req: Request, res: Response) {
    const categoryService = new CategoryService();
    const categoryId = req.params.id as unknown as number;

    await categoryService.deleteCategory(categoryId);

    res.status(204).json();
  }

  /**
   *
   * @param req request
   * @param res response
   * @returns updated category object
   */

  public async updateCategory(req: Request, res: Response) {
    const categoryService = new CategoryService();
    const updateCategoryDto: UpdateCategoryDto = req.body;
    const categoryId = req.params.id as unknown as number;

    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      updateCategoryDto
    );

    res.json(updatedCategory);
  }
}

export { CategoryController };
