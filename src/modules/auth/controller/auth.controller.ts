import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { AuthService } from '../service/auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    console.log("Hellow from post");
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    console.log("Hellow from get");
    return 'Success!';
  }
}