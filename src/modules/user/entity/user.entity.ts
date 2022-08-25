import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  first_name: string;

  @Column()
  @ApiProperty()
  last_name: string;

  @Column()
  @ApiProperty()
  birth: string;

  @Column({ select: false })
  @ApiProperty()
  passport: string;

  @Column({ select: false })
  @ApiProperty()
  password: string;

  @Column({ default: null, select: false })
  @ApiProperty()
  refresh_token?: string;

  @ApiProperty({
    type: [Role],
  })
  @ManyToMany(() => Role, (role) => role.id, {
    cascade: ['soft-remove'],
  })
  @JoinTable({
    name: 'users_roles_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  constructor(
    email: string,
    first_name: string,
    last_name: string,
    birth: string,
    passport: string,
    password: string,
    roles: Role[],
  ) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birth = birth;
    this.passport = passport;
    this.password = password;
    this.roles = roles;
  }
}
