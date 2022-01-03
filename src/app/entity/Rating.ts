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

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => Product, (product) => product.userRating, {
    cascade: ["insert"],
  })
  userRating: number;

  @ManyToOne(() => Product, (product) => product.userReview)
  userReview: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  lastModifiedAt: Timestamp;
}
