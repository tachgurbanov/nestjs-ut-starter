import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dbName =
        configService.get<string>('NODE_ENV') === 'test'
          ? configService.get<string>('database.test.name')
          : configService.get<string>('database.development.name');

      const dataSource = new DataSource({
        type: 'postgres',
        database: dbName,
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      const dataSourceProd = new DataSource({
        type: 'postgres',
        database: configService.get<string>('database.production.name'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      if (configService.get<string>('NODE_ENV') === 'production') {
        return dataSourceProd.initialize();
      }
      return dataSource.initialize();
    },
  },
];
