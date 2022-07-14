import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authenticationService.generateToken(req.account);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.account;
  }
}
