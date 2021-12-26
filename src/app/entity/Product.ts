import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from './Category'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  productName: string

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  lastModifiedAt: Timestamp
}
