import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /* @Post('auth/register')
  async register(@Body() credentials: RegisterDTO) {
    return this.authService.register(credentials);
  } */

  @UseGuards(JwtAuthGuard)
  @Get('is-logged-in')
  isLoggedIn(): string {
    return 'Yes';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
