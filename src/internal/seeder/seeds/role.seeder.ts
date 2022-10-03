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

    const perms_for_user = ['view users', 'view books', 'create booking'];
    const admin_perms = [];
    const user_perms = [];
    for (const el of permIds) {
      const permission = await this.permRepo.findOneOrFail({
        id: el,
      });
      admin_perms.push(permission);
      perms_for_user.includes(permission.name) && user_perms.push(permission);
    }

    await this.roleRepo.save([
      new Role('admin', admin_perms),
      new Role('user', user_perms),
    ]);
  }
}
