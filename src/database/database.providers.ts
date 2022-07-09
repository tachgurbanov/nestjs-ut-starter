import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dbName =
        configService.get<string>('NODE_ENV') === 'test'
          ? configService.get<string>('entities.test.file')
          : configService.get<string>('entities.development.file');
      const dataSource = new DataSource({
        type: 'better-sqlite3',
        database: dbName,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
