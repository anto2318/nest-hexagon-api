import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'financial_services_test',
      entities: [
        'dist/infrastructure/database/entity/*.js',
      ],
      synchronize: true,
    }),
  },
];