import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './service/role.service';
import { PermissionService } from './service/permission.service';
import { RoleController } from './controller/role.controller';
import { PermissionController } from './controller/permission.controller';
import { JwtModule } from '@nestjs/jwt';
import { Permission } from './entity/permissions.entity';
import { Role } from './entity/role.entity';
import { AppConfig } from 'src/internal/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission, Role]),
    JwtModule.register({
      secret: AppConfig.jwtConfig.accessSecret,
      signOptions: {
        expiresIn: AppConfig.jwtConfig.expires_in_access,
      },
    }),
  ],
  providers: [UserService, RoleService, PermissionService],
  controllers: [UserController, RoleController, PermissionController],
  exports: [UserService, RoleService, PermissionService],
})
export class UserModule {}
