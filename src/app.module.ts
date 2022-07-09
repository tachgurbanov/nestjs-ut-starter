import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthorizationModule,
    UserModule,
  ],
})
export class AppModule {}
