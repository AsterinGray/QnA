import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Question } from './question.entity';

@Entity()
export class QuestionLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.likedAnswers)
  @JoinColumn()
  user: User;

  @OneToOne(() => Question, (question) => question.likes)
  @JoinColumn()
  question: Question;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
