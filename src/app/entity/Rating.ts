import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import { Product } from './Product'
// BURAYA USER TABLOSU EKLENECEK

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Product, (product) => product.id)
  productID: Product

  @ManyToOne(() => Product, (product) => product.userRatings)
  userRatings: number

  @ManyToOne(() => Product, (product) => product.userReviews)
  userReviews: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  lastModifiedAt: Timestamp
}