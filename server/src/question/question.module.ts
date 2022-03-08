import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AnswerController } from './answer/answer.controller';
import { AnswerService } from './answer/answer.service';
import { Answer } from './entities/answer.entity';
import { QuestionLikes } from './entities/question-likes.entity';
import { AnswerLikes } from './entities/answer-likes.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([
      Question,
      Answer,
      User,
      QuestionLikes,
      AnswerLikes,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
  ],
  controllers: [QuestionController, AnswerController],
  providers: [QuestionService, AnswerService],
})
export class QuestionModule {}
