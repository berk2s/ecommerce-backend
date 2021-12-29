import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from './Category'
import { Price } from './Price'
import { Rating } from './Rating'


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  productName: string

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]

  @OneToMany(() => Price, (price) => price.product)
  prices: Price[]

  @Column({nullable: true})
  description: string

  @Column({nullable: true})
  status: string

  @OneToMany(() => Rating, (Rating) => Rating.userRatings)
  userRatings: Rating[]

  @OneToMany(() => Rating, (Rating) => Rating.userReviews)
  userReviews: Text[]

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  lastModifiedAt: Timestamp
}
