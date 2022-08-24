import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from '../../../modules/user/entity/role.entity';
import { Permission } from '../../../modules/user/entity/permissions.entity';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permRepo: Repository<Permission>,
  ) {}

  public async run(): Promise<any> {
    const permsLenght = await this.permRepo.count();
    const permIds = Array.from(Array(permsLenght + 1).keys()).slice(1);

    const admin_perms = [];
    for (const el of permIds) {
      const permission = await this.permRepo.findOneOrFail({
        id: el,
      });
      admin_perms.push(permission);
    }

    const perms_for_user = [1, 5, 9, 13];
    const user_perms = [];

    for (const el of perms_for_user) {
      const permission = await this.permRepo.findOneOrFail({
        id: el,
      });
      user_perms.push(permission);
    }

    await this.roleRepo.save([
      new Role('super-admin', admin_perms),
      new Role('user', user_perms),
    ]);
  }
}
