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
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/auth/roles.decorator';
import { CreateUserDto, ShowUserDto } from '../dto/user/user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin', 'user'])
  @Post('create')
  @ApiOkResponse({
    type: User,
    description: 'Create user',
  })
  async create(@Body() createUserData: CreateUserDto): Promise<User> {
    return this.userService.create(createUserData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOkResponse({
    type: ShowUserDto,
    description: 'Get user by id',
  })
  async getOne(@Param('id') id: string): Promise<ShowUserDto> {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin'])
  @Get()
  @ApiOkResponse({
    type: [ShowUserDto],
    description: 'Get all users',
  })
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(['super-admin'])
  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'Delete user by id',
  })
  async delete(@Param('id') id: string): Promise<void> {
    this.userService.remove(+id);
    return;
  }
}
