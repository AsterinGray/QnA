import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entities/answer.entity';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Req() request: Request,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionService.create(request.user, createQuestionDto);
  }

  @Post(':id/answer')
  @UseGuards(AuthGuard())
  addAnswer(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() createAnswerDto: CreateAnswerDto,
  ): Promise<Answer> {
    return this.questionService.addAnswer(request.user, id, createAnswerDto);
  }

  @Post(':id/like')
  @UseGuards(AuthGuard())
  likeQuestion(@Req() request: Request, @Param('id') id: number) {
    return this.questionService.likeQuestion(request.user, id);
  }

  @Delete(':id/like')
  @UseGuards(AuthGuard())
  removeLike(@Req() request: Request, @Param('id') id: number) {
    return this.questionService.removeLike(request.user, id);
  }

  @Get()
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Question> {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: number,
    @Req() request: Request,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionService.update(id, request.user, updateQuestionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: number, @Req() request: Request): Promise<Question> {
    return this.questionService.remove(request.user, id);
  }
}
