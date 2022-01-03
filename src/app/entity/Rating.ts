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
} from "typeorm";
import { Product } from "./Product";
// BURAYA USER TABLOSU İMPORTLANACAK

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.userReviews)
  product: Product;

  //@ManyToOne(() => Product, (product) => product.userRatings)
  userRating: number;

  //@ManyToOne(() => Product, (product) => product.userReviews)
  userReview: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  lastModifiedAt: Timestamp;
}
