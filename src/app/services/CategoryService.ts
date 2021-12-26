import { getManager } from 'typeorm'
import { Category } from '../entity/Category'

class CategoryService {
  constructor() {}

  public getCategories() {
    const manager = getManager()

    return manager.find(Category, {
      relations: [
        'parents',
        'parents.parents',
        'parents.parents.parents',
        'parents.parents.parents.parents',
      ],
    })
  }
}

export { CategoryService }
