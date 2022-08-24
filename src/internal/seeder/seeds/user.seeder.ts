import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from './../../../modules/user/entity/role.entity';
import { User } from './../../../modules/user/entity/user.entity';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  public async run(): Promise<any> {
    const root = await this.roleRepo.find({ id: 1 });
    const pass = 'secret';

    const admin = new User(
      'admin@admin.com',
      'Admin',
      'Admin',
      '00-00-00',
      '0000 000000',
      pass,
      root,
    );

    await this.userRepo.save(admin);
  }
}
