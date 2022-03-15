import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { validateData } from '@/shared/utlis/validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOne(user: any): Promise<User> {
    return this.findByPayload(user.username);
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

  async create(data: CreateUserDto): Promise<User> {
    validateData(data);

    const { username } = data;
    const password = await bcrypt.hash(data.password, 10);

    try {
      await this.userRepository.findOne({ where: { username } });
    } catch (e) {
      throw new HttpException('Username is invalid', HttpStatus.BAD_REQUEST);
    }

    return this.userRepository.save({ ...data, password });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    if (!data.password)
      throw new HttpException('Password required', HttpStatus.BAD_REQUEST);

    const user: User = await this.userRepository.findOne(id);

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    if (data.username && data.username !== user.username)
      throw new HttpException(
        'Username cannot be change',
        HttpStatus.BAD_REQUEST,
      );

    await this.userRepository.update(id, { ...data, password: user.password });
    console.log(user.username);
    return await this.findByPayload(user.username);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  findByPayload(username: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'fullname',
        'gender',
        'created_at',
        'updated_at',
      ],
    });
    if (!user)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

    return user;
  }
}
