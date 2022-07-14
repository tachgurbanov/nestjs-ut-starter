import { Injectable } from '@nestjs/common';
import { AccountService } from '../user/account/account.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Account } from '../user/account/entities/account.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateAccount(email: string, pass: string): Promise<any> {
    const account = await this.accountService.getByEmail(email);
    const compare = await this.accountService.checkPassword(
      pass,
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
      sub: {
        id: account.id,
        superuser: account.superuser,
        permissions: permissions,
      },
    };
    return {
      access_token: this.jwtService.sign(payload, signOptions),
    };
  }
}
