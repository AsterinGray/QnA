import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entities/answer.entity';
import { QuestionLikes } from './entities/question-likes.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(QuestionLikes)
    private questionLikesRepository: Repository<QuestionLikes>,
  ) {}

  create(user: any, createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionRepository.save({
      ...createQuestionDto,
      author: user,
    });
  }

  async addAnswer(
    author: any,
    questionId: number,
    createAnswerDto: CreateAnswerDto,
  ): Promise<Answer> {
    const question = await this.questionRepository.findOne(questionId);

    if (!question)
      throw new HttpException(`Question doesn't exist`, HttpStatus.NOT_FOUND);

    return this.answerRepository.save({
      ...createAnswerDto,
      author,
      question,
    });
  }

  async likeQuestion(user: any, questionId: number) {
    const question = await this.questionRepository.findOne(questionId);
    if (!question)
      throw new HttpException(`Question doesn't exist`, HttpStatus.NOT_FOUND);

    const like = await this.questionLikesRepository.findOne({ user, question });
    if (like)
      throw new HttpException(
        'You already like the question',
        HttpStatus.BAD_REQUEST,
      );

    await this.questionLikesRepository.save({ user, question });
    await this.questionRepository.update(questionId, {
      likes: question.likes + 1,
    });

    return this.questionRepository.findOne(questionId);
  }

  async removeLike(user: any, questionId: number) {
    const question = await this.questionRepository.findOne(questionId);
    if (!question)
      throw new HttpException(`Question doesn't exist`, HttpStatus.NOT_FOUND);

    const like = await this.questionLikesRepository.findOne({ user, question });
    if (!like)
      throw new HttpException(
        "You haven't like the question",
        HttpStatus.BAD_REQUEST,
      );

    await this.questionLikesRepository.delete({ user, question });
    await this.questionRepository.update(questionId, {
      likes: question.likes - 1,
    });

    return this.questionRepository.findOne(questionId);
  }

  findAll(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Question> {
    const question: Question = await this.questionRepository.findOne(id, {
      relations: ['author'],
    });

    if (!question)
      throw new HttpException(`Question doesn't exist`, HttpStatus.NOT_FOUND);

    return question;
  }

  async update(
    id: number,
    user: any,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question: Question = await this.questionRepository.findOne(id, {
      loadRelationIds: true,
    });

    if (!question)
      throw new HttpException(`Question doesn't exist`, HttpStatus.BAD_REQUEST);

    const isAuthorize = question.author === user.id;
    if (!isAuthorize)
      throw new HttpException(
        'You are not the author',
        HttpStatus.UNAUTHORIZED,
      );

    await this.questionRepository.update(id, updateQuestionDto);
    return this.questionRepository.findOne(id);
  }

  async remove(user: any, id: number): Promise<Question> {
    const question: Question = await this.questionRepository.findOne(id, {
      loadRelationIds: true,
    });

    if (!question)
      throw new HttpException(`Question doesn't exist`, HttpStatus.BAD_REQUEST);

    const isAuthorize = question.author === user.id;
    if (!isAuthorize)
      throw new HttpException(
        'You are not the author',
        HttpStatus.UNAUTHORIZED,
      );

    await this.questionRepository.delete(id);
    return question;
  }
}
