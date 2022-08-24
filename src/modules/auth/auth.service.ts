import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShowUserDto } from '../user/dto/user/user.dto';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/service/user.service';
import { LoginDto, RegistrationDto } from './dto/registration.dto';
import { TokensDto } from './dto/tokens.dto';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/internal/config/app.config';
import { RoleService } from '../user/service/role.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private jwtService: JwtService,
  ) {}

  private readonly JWTconfig = AppConfig.jwtConfig;

  async registration(registrationDto: RegistrationDto): Promise<ShowUserDto> {
    const userRole = await this.roleService.findRoleByName('user');

    const user = new User(
      registrationDto.email,
      registrationDto.first_name,
      registrationDto.last_name,
      registrationDto.birth,
      registrationDto.passport,
      registrationDto.password,
      [userRole.data],
    );

    const userToSave = await this.userService.create(user);

    return userToSave;
  }

  async login(loginDto: LoginDto): Promise<TokensDto> {
    const user = await this.validateUser(loginDto);
    const fullData = await this.userService.findOne(+user.id);
    return this.generateTokens(fullData);
  }

  async updateTokens(tokensDto: TokensDto): Promise<TokensDto> {
    if (!tokensDto) {
      throw new HttpException('unauthorized Error', HttpStatus.UNAUTHORIZED);
    }

    const refreshToken = tokensDto.refreshToken;
    const user = await this.userService.getOneDataByRefresh(refreshToken);
    const userData = await this.jwtService.verify(refreshToken, {
      secret: this.JWTconfig.refreshSecret,
    });

    if (!user || !userData) {
      throw new HttpException('unauthorized Error', HttpStatus.UNAUTHORIZED);
    }

    const newTokens = await this.generateTokens(user);
    this.userService.saveRefreshToken(user, newTokens.refreshToken);

    return newTokens;
  }

  async generateTokens(user: User) {
    const roles = [];
    user.roles.forEach((el) => {
      roles.push(el.name);
    });
    const payload = {
      id: user.id,
      email: user.email,
      roles: roles,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWTconfig.expires_in_access,
      secret: this.JWTconfig.accessSecret,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWTconfig.expires_in_refresh,
      secret: this.JWTconfig.refreshSecret,
    });

    this.userService.saveRefreshToken(user, refreshToken);

    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getOneDataByEmail(loginDto.email);

    if (user && user.password === loginDto.password) {
      return user;
    }

    throw new HttpException(
      'invalid password or email',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
