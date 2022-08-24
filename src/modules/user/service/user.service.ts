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
    const resp = this.userRepository.find();
    return resp;
  }

  async findOne(id: number): Promise<User> {
    const data = await this.userRepository.findOneOrFail(id, {
      relations: ['roles'],
    });
    return data;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const resp = this.userRepository.save(createUserDto);
    return resp;
  }

  async remove(id: number) {
    const resp = this.userRepository.delete(id);
    return resp;
  }

  async getOneDataByEmail(email: string): Promise<User> {
    try {
      const data = await this.userRepository
        .createQueryBuilder('users')
        .select([
          'users.refresh_token',
          'users.first_name',
          'users.last_name',
          'users.password',
          'users.passport',
          'users.email',
          'users.id',
        ])
        .where(`email = '${email}'`)
        .getOneOrFail();

      return data;
    } catch (e: any) {
      throw new NotFoundException(e.message);
    }
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({ email: email });
  }

  async saveRefreshToken(user: User, refreshToken: string): Promise<void> {
    const oldUser = await this.getOneDataByEmail(user.email);
    oldUser.refresh_token = refreshToken;
    this.userRepository.save(oldUser);
  }

  async getOneDataByRefresh(refresh: string): Promise<User> {
    try {
      const data = await this.userRepository
        .createQueryBuilder('users')
        .select([
          'users.refresh_token',
          'users.first_name',
          'users.last_name',
          'users.passport',
          'users.password',
          'users.email',
          'users.id',
        ])
        .where(`refresh_token = '${refresh}'`)
        .getOneOrFail();

      return data;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
