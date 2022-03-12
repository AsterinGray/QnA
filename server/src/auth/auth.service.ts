import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@/user/user.service';
import { User } from '@/user/entities/user.entity';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { LoginUserDto } from '@/user/dto/login-user.dto';
import { LoginResponse } from '@/shared/interface/response';

import { validateData } from '@/shared/utlis/validator';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto): Promise<User> {
    validateData(data);
    return await this.userService.create(data);
  }

  async login(data: LoginUserDto): Promise<LoginResponse> {
    validateData(data);
    const user = await this.userService.findByLogin(data);
    const expiresIn = process.env.TOKEN_EXPIRES_DURATION;
    const accessToken = this.jwtService.sign({ username: user.username });
    return { expiresIn, accessToken };
  }

  async validateUser(username: string): Promise<User> {
    return await this.userService.findByPayload(username);
  }
}
