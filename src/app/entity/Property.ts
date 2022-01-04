import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
  JoinTable
} from "typeorm";
//import { Product } from "./Product";

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string

  @Column()
  model: string

  @Column()
  colour: string

  @Column()
  memory: string

  @Column()
  mass: string

  @Column()
  cpu: string

  @Column()
  graphicCard: string

  @Column()
  disk: string

}
