import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Permission } from '../../../modules/user/entity/permissions.entity';

@Injectable()
export class PermissionsSeeder {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  public async run(): Promise<void> {
    const permissions = [
      'view roles',
      'create roles',
      'delete roles',
      'edit roles',

      'view users',
      'create users',
      'delete users',
      'edit users',

      'view books',
      'create books',
      'delete books',
      'edit books',

      'create booking',
    ];

    await this.permissionRepo.save(
      permissions.map((el) => {
        return {
          name: el,
        };
      }),
    );
  }
}
