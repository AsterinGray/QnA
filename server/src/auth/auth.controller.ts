import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  Get,
  Req,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto } from '@/user/dto/create-user.dto';
import { LoginUserDto } from '@/user/dto/login-user.dto';
import { User } from '@/user/entities/user.entity';

import { LoginResponse } from '@/shared/interface/response';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return await this.authService.login(loginUserDto);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<string> {
    return req.user;
  }
}
