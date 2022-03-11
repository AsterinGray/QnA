import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LoginStatus, RegistrationStatus } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    try {
      await this.userService.create(createUserDto);
      return { success: true, message: 'User Registered' };
    } catch (e) {
      return { success: false, message: 'Invalid credential' };
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.userService.findByLogin(loginUserDto);
    const expiresIn = process.env.TOKEN_EXPIRES_DURATION;
    const accessToken = this.jwtService.sign({ username: user.username });
    return { expiresIn, accessToken };
  }

  async validateUser(username: string): Promise<User> {
    const user = await this.userService.findByPayload(username);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
