import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Price } from "./Price";

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Price, (price) => price.currency, {
    cascade: ["insert"],
  })
  price: Price[];

  @Column()
  currencyName: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  lastModifiedAt: Timestamp;
}
