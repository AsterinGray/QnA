import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '../entities/answer.entity';
import { Repository } from 'typeorm';
import { AnswerLikes } from '../entities/answer-likes.entity';
import { validate } from 'class-validator';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(AnswerLikes)
    private answerLikesRepository: Repository<AnswerLikes>,
  ) {}

  async likeAnswer(user: any, answerId: number) {
    const answer = await this.answerRepository.findOne(answerId);
    if (!answer)
      throw new HttpException(`Answer doesn't exist`, HttpStatus.NOT_FOUND);

    const like = await this.answerLikesRepository.findOne({ user, answer });
    if (like)
      throw new HttpException(
        'You already like the answer',
        HttpStatus.BAD_REQUEST,
      );

    await this.answerLikesRepository.save({ user, answer });
    await this.answerRepository.update(answerId, {
      likes: answer.likes + 1,
    });

    return this.answerRepository.findOne(answerId);
  }

  async removeLike(user: any, questionId: number) {
    const answer = await this.answerRepository.findOne(questionId);
    if (!answer)
      throw new HttpException(`Answer doesn't exist`, HttpStatus.NOT_FOUND);

    const like = await this.answerLikesRepository.findOne({ user, answer });
    if (!like)
      throw new HttpException(
        "You haven't like the answer",
        HttpStatus.BAD_REQUEST,
      );

    await this.answerLikesRepository.delete({ user, answer });
    await this.answerRepository.update(questionId, {
      likes: answer.likes - 1,
    });

    return this.answerRepository.findOne(questionId);
  }

  async update(id: number, user: any, data: UpdateAnswerDto): Promise<Answer> {
    validate(data);
    const answer: Answer = await this.answerRepository.findOne(id, {
      loadRelationIds: true,
    });

    if (!answer)
      throw new HttpException(`Answer doesn't exist`, HttpStatus.BAD_REQUEST);

    const isAuthorize = answer.author === user.id;
    if (!isAuthorize)
      throw new HttpException(
        'You are not the author',
        HttpStatus.UNAUTHORIZED,
      );

    await this.answerRepository.update(id, data);
    return this.answerRepository.findOne(id);
  }

  async remove(user: any, id: number): Promise<Answer> {
    const answer: Answer = await this.answerRepository.findOne(id, {
      loadRelationIds: true,
    });

    if (!answer)
      throw new HttpException("Answer doesn't exists", HttpStatus.BAD_REQUEST);

    const isAuthorize = answer.author === user.id;
    if (!isAuthorize)
      throw new HttpException(
        'You are not the author',
        HttpStatus.UNAUTHORIZED,
      );

    await this.answerRepository.delete(id);
    return answer;
  }
}
