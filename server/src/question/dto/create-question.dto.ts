import { IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateQuestionDto {
  @IsString()
  title: string;

  @IsString()
  detail: string;

  @IsString()
  author?: User;
}
