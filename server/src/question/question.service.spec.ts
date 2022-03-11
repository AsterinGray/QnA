import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionLikes } from './entities/question-likes.entity';
import { AnswerLikes } from './entities/answer-likes.entity';
import { MockType, repositoryMockFactory } from '../shared/utils';

describe('QuestionService', () => {
  let service: QuestionService;
  let repositoryMock: MockType<Repository<Question>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Answer),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(QuestionLikes),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(AnswerLikes),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    repositoryMock = module.get(getRepositoryToken(Question));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('method:findAll should return all data', () => {
    const questions: Question[] = [
      {
        id: 1,
        title: 'Title',
        detail: 'Detail',
        likes: 0,
        author: {
          id: 1,
          username: 'Author Username',
          full_name: 'Author Full',
          password: 'Password',
          gender: 'Male',
          questions: [],
          answers: [],
          likedQuestions: [],
          likedAnswers: [],
          created_at: new Date(),
          updated_at: new Date(),
        },
        answers: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: 'Title',
        detail: 'Detail',
        likes: 0,
        author: {
          id: 1,
          username: 'Author Username',
          full_name: 'Author Full',
          password: 'Password',
          gender: 'Male',
          questions: [],
          answers: [],
          likedQuestions: [],
          likedAnswers: [],
          created_at: new Date(),
          updated_at: new Date(),
        },
        answers: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    repositoryMock.find.mockReturnValue(questions);
    expect(service.findAll()).toEqual(questions);
  });
});
