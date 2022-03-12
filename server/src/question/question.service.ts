import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entities/answer.entity';
import { QuestionLikes } from './entities/question-likes.entity';
import { validateData } from '@/shared/utlis/validator';

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

  create(user: any, data: CreateQuestionDto): Promise<Question> {
    validateData(data);
    return this.questionRepository.save({
      ...data,
      author: user,
    });
  }

  async addAnswer(
    author: any,
    questionId: number,
    data: CreateAnswerDto,
  ): Promise<Answer> {
    validateData(data);

    const question = await this.questionRepository.findOne(questionId);

    if (!question)
      throw new HttpException(`Question doesn't exist`, HttpStatus.NOT_FOUND);

    return this.answerRepository.save({
      ...data,
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

  async findOneAnswer(id: number): Promise<Answer[]> {
    const question: Question = await this.findOne(id);
    return await this.answerRepository.find({
      where: { question },
      relations: ['author'],
    });
  }

  async update(
    id: number,
    user: any,
    data: UpdateQuestionDto,
  ): Promise<Question> {
    validateData(data);
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

    await this.questionRepository.update(id, data);
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
