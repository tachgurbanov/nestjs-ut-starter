import { Injectable } from '@nestjs/common';
import { AccountService } from '../user/account/account.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Account } from '../user/account/entities/account.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateAccount(loginDto: LoginDto): Promise<any> {
    const account = await this.accountService.getByEmail(loginDto.email);
    const compare = await this.accountService.checkPassword(
      loginDto.password,
      account.password,
    );

    if (compare) {
      const { password, ...result } = account;
      return result;
    }
    return null;
  }

  async generateToken(account: Account, signOptions: JwtSignOptions = {}) {
    const permissions = await this.accountService.getAllPermissions(account.id);
    const payload = {
      email: account.email,
      superuser: account.superuser,
      permissions: permissions,
      sub: {
        id: account.id,
      },
    };
    return {
      access_token: this.jwtService.sign(payload, signOptions),
    };
  }
}
