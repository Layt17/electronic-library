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
  id: number;

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  birth: string;

  @Column({ select: false })
  passport: string;

  @Column({ select: false })
  password: string;

  @Column({ default: null, select: false })
  refresh_token?: string;

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
