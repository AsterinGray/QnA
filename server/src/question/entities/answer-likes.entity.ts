import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Answer } from './answer.entity';

@Entity()
export class AnswerLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.likedAnswers)
  @JoinColumn()
  user: User;

  @OneToOne(() => Answer, (answer) => answer.likes)
  @JoinColumn()
  answer: Answer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
