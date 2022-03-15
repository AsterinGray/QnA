import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findOne(@Req() request: Request) {
    return this.userService.findOne(request.user);
  }

  @Put()
  update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    console.log(request.user);
    return this.userService.update(request.user.id, updateUserDto);
  }

  @Delete()
  remove(@Req() request: Request) {
    return this.userService.remove(request.user.id);
  }
}
