import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthorizationModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
