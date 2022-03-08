import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Post,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('answer')
@UseGuards(AuthGuard())
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Patch(':id')
  update(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answerService.update(id, request.user, updateAnswerDto);
  }

  @Post(':id/like')
  likeQuestion(@Req() request: Request, @Param('id') id: number) {
    return this.answerService.likeAnswer(request.user, id);
  }

  @Delete(':id/like')
  removeLike(@Req() request: Request, @Param('id') id: number) {
    return this.answerService.removeLike(request.user, id);
  }

  @Delete(':id')
  remove(@Req() request: Request, @Param('id') id: number) {
    return this.answerService.remove(request.user, id);
  }
}
