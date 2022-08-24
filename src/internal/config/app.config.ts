const env = process.env;

export const AppConfig = {
  jwtConfig: {
    accessSecret: env.JWT_ACCESS_SECRET || 'secret',
    refreshSecret: env.JWT_REFRESH_SECRET || 'refresh_secret',
    expires_in_access: env.JWT_EXPIRES_IN_ACCESS || '24h',
    expires_in_refresh: env.JWT_EXPIRES_IN_REFRESH || '48h',
  },

  typeOrmConfigSeeding: {
    host: process.env.DB_HOST || 'db',
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'blah',
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    autoLoadEntities: true,
  },
};
