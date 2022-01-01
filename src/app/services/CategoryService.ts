import { getManager } from "typeorm";
import { Category } from "../entity/Category";
import { CreateCategoryDto, UpdateCategoryDto } from "../models/Category";

class CategoryService {
  constructor() {}

  public getCategoryById(categoryId: number) {
    const manager = getManager();

    return manager.findOne(Category, categoryId, {
      relations: [
        "parents",
        "parents.parents",
        "parents.parents.parents",
        "parents.parents.parents.parents",
      ],
    });
  }

  public getCategories() {
    const manager = getManager();

    return manager.find(Category, {
      relations: [
        "parents",
        "parents.parents",
        "parents.parents.parents",
        "parents.parents.parents.parents",
      ],
    });
  }

  public async createCategory(createCategoryDto: CreateCategoryDto) {
    // get repository ile aynı işi yapıyor abstraction
    const manager = getManager();

    const category = new Category();
    category.categoryName = createCategoryDto.categoryName;
    category.parents = [];

    const parents = await manager.findByIds(
      Category,
      createCategoryDto.parents
    );
    if (!parents) {
      throw new Error("Categories are required");
    }

    parents.forEach((parent) => {
      category.parents = [...category.parents, parent];
    });

    const savedCategory = manager.save(category);

    return savedCategory;
  }

  public async deleteCategory(categoryId: number) {
    const manager = getManager();

    const category = await manager.findOne(Category, categoryId);

    if (category) {
      await manager.remove(category);
    }

    return category;
  }
  public async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto
  ) {
    const manager = getManager();

    const category = await manager.findOne(Category, categoryId);

    if (!category) {
      return { message: "Category not found" };
    }

    category.categoryName = updateCategoryDto.categoryName;

    const categoryUpdated = await manager.save(category);

    return categoryUpdated;
  }
}
export { CategoryService };
