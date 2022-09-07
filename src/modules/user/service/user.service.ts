import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user/user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const res = this.userRepository.find();
    return res;
  }

  async findOne(id: number): Promise<User> {
    const data = await this.userRepository.findOneOrFail(id, {
      relations: ['roles'],
    });
    return data;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const res = this.userRepository.save(createUserDto);
    return res;
  }

  async remove(id: number) {
    const res = this.userRepository.delete(id);
    return res;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email: email });
    const res = { ...user };

    // find by user id to protect against sql injection
    try {
      if (user) {
        const secret_data = await this.userRepository
          .createQueryBuilder('users')
          .select(['users.password', 'users.passport'])
          .where(`id = '${user.id}'`)
          .getOneOrFail();
        res.password = secret_data.password;
        res.passport = secret_data.passport;
        return res;
      }
    } catch (e: any) {
      throw new NotFoundException(e.message);
    }
  }

  async saveRefreshToken(user: User, refreshToken: string): Promise<void> {
    const oldUser = await this.findOneByEmail(user.email);
    oldUser.refresh_token = refreshToken;
    this.userRepository.save(oldUser);
  }

  async getOneDataByRefresh(refresh: string): Promise<User> {
    const data = await this.userRepository.findOneOrFail(
      { refresh_token: refresh },
      { relations: ['roles'] },
    );
    return data;
  }
}
