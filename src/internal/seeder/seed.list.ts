import { Permission } from '../../modules/user/entity/permissions.entity';
import { Role } from '../../modules/user/entity/role.entity';
import { User } from '../../modules/user/entity/user.entity';
import { PermissionsSeeder } from './seeds/permission.seeder';
import { RoleSeeder } from './seeds/role.seeder';
import { UserSeeder } from './seeds/user.seeder';

export const SeedList = [PermissionsSeeder, RoleSeeder, UserSeeder];

export const Entities = [Permission, Role, User];
