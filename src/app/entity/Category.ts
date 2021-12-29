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

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  categoryName: string

  @ManyToMany((type) => Category, (category) => category.id, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinTable()
  parents: Category[]

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  lastModifiedAt: Timestamp
}
