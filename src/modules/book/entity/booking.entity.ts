import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn() id: number;
  @Column() book_name: string;
  @Column() user_name: string;
}
