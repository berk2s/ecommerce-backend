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
import { Currency } from './Currency'
import { Product } from './Product'

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  price: number

  @ManyToOne(() => Product, (product) => product.prices)
  product: Product

  @ManyToOne(() => Currency, (currency) => currency.price)
  currency: Currency

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  lastModifiedAt: Timestamp
}
