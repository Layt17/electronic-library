module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/internal/migrations/*{.ts,.js}'],
  migrationsDir: 'migration',
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: false,
};
