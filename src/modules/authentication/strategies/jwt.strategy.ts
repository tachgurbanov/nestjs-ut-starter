import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.key.public'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return {
      accountId: payload.sub,
      email: payload.email,
      permissions: payload.permissions,
      superuser: payload.superuser,
    };
  }
}
