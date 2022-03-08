import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return user;
  }

  findByPayload(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;
    const password = await bcrypt.hash(createUserDto.password, 10);

    try {
      await this.userRepository.findOne({ where: { username } });
    } catch (e) {
      throw new HttpException('Username is invalid', HttpStatus.BAD_REQUEST);
    }

    return this.userRepository.save({ ...createUserDto, password });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
