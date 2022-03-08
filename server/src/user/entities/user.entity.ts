import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../../question/entities/answer.entity';
import { Question } from '../../question/entities/question.entity';
import { AnswerLikes } from '../../question/entities/answer-likes.entity';
import { QuestionLikes } from '../../question/entities/question-likes.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @Column()
  gender: string;

  @OneToMany(() => Answer, (answer) => answer.author)
  answers: Answer[];

  @OneToMany(() => Question, (question) => question.author)
  questions: Question[];

  @OneToMany(() => AnswerLikes, (answerLikes) => answerLikes.user)
  likedAnswers: AnswerLikes[];

  @OneToMany(() => QuestionLikes, (questionLikes) => questionLikes.user)
  likedQuestions: QuestionLikes[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
