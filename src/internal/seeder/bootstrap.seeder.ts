import { INestApplicationContext, Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SeedList } from './seed.list';

@Injectable()
export class BootStrapSeeder {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(BootStrapSeeder.name);
  }

  async seed(app: INestApplicationContext) {
    const connection = app.get(Connection);

    try {
      await connection.query('select * from seed_success');

      this.logger.log('Already seeded');
    } catch (el: any) {
      this.logger.log('Starting seeding');

      for (let i = 0; i < SeedList.length; i++) {
        const el = SeedList[i];
        this.logger.log(`Seeding of the ${el.name}`);

        await app.get(el).run();

        this.logger.log(`Seeding of the ${el.name} success`);
      }

      await connection.query(`create table seed_success (
                    id bigint
                )`);

      this.logger.log('Seeding done.');
    } finally {
      return true;
    }
  }
}
