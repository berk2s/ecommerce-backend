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
} from "typeorm";
import { Category } from "./Category";
import { Price } from "./Price";
import { Rating } from "./Rating";
import { Property } from "./Property";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @ManyToMany(() => Property, property => property.id)
  // @JoinTable()
  properties: Property[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Price, (price) => price.product)
  prices: Price[];

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  status: string;

  @OneToMany(() => Rating, (rating) => rating.product, {
    cascade: ["insert"],
    onDelete: "CASCADE",
  })
  userRating: number[];

  @OneToMany(() => Rating, (rating) => rating.product, {
    cascade: ["insert"],
    onDelete: "CASCADE",
  })
  userReviews: string[];

  // @OneToMany(() => Rating, (rating) => rating.product, {
  //   cascade: ["insert"],
  // })
  // userReviews: number[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  lastModifiedAt: Timestamp;
}
