import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userRating: number;

  @Column()
  userReview: string;

  @ManyToOne(() => Product, (product) => product.userRating, {
    cascade: true,
  })
  product: Product;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  lastModifiedAt: Timestamp;
}
