import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permissions.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.id, {
    cascade: ['soft-remove'],
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'roles_permissions_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  @ApiProperty({
    type: [Permission],
  })
  permissions: Permission[];

  constructor(name: string, permissions: Permission[]) {
    this.name = name;
    this.permissions = permissions;
  }
}
