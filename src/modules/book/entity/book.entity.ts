import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() author: string;
  @Column() genre: string;
  @Column({ default: null }) current_user: string;
}
