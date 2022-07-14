import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const account = await this.authenticationService.validateAccount(loginDto);
    if (account != null) {
      return await this.authenticationService.generateToken(account);
    }
    return new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.account;
  }
}
