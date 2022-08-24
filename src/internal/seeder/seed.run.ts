import { Global, INestApplication, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '../config/app.config';
import { BootStrapSeeder } from './bootstrap.seeder';
import { Entities, SeedList } from './seed.list';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...AppConfig.typeOrmConfigSeeding,
    }),
    TypeOrmModule.forFeature(Entities),
  ],
  providers: [BootStrapSeeder, ...SeedList],
})
class SeedModule {}

describe('seeding', () => {
  let app: INestApplication;
  let bootStrapSeeder: BootStrapSeeder;

  beforeAll(async () => {
    app = await NestFactory.create(SeedModule);

    bootStrapSeeder = app.get(BootStrapSeeder);
  });

  it('seeder', async () => {
    const resultOfSeeding = await bootStrapSeeder.seed(app);

    expect(resultOfSeeding).toBeTruthy();
  });

  afterAll(() => {
    app.close();
  });
});
