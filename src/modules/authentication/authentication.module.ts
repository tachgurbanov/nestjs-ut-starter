import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { AccountModule } from '../user/account/account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from '../../config/jwt.config';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.get<string>('jwt.key.private'),
        publicKey: configService.get<string>('jwt.key.public'),
        signOptions: {
          expiresIn: '3h',
          algorithm: 'RS256',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
