import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { CreateUserDto } from '../dto/user/user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin', 'user'])
  @Post('create')
  async create(@Body() createUserData: CreateUserDto): Promise<User> {
    return this.userService.create(createUserData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin'])
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin'])
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.userService.remove(+id);
    return;
  }
}
