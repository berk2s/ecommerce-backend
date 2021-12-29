import { MigrationInterface, QueryRunner } from 'typeorm'

interface Table {
  tableName: string
}

const tables: Table[] = [
  {
    tableName: 'category_parents_category',
  },
  {
    tableName: 'product_categories_category',
  },
  {
    tableName: 'category',
  },
  {
    tableName: 'product',
  },
]

export class DatabaseDroppingTable1640590691422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
  
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    tables.forEach(async (table) => {
      await queryRunner.query(`DROP TABLE ${table.tableName.toLowerCase()}`)
      console.log(`Table has been dropped ${table.tableName}`)
    })
  }
}
