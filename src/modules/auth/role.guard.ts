import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../user/entity/role.entity';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async getUserRole(token: string): Promise<Role[]> {
    const accessToken = token.replace('Bearer ', '');
    const dataFromAccess = await this.jwtService.verify(accessToken, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    return dataFromAccess.roles;
  }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const userRoles = await this.getUserRole(
      context.switchToHttp().getRequest().rawHeaders[1],
    );
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
