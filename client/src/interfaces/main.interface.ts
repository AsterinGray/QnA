export interface Base {
  id: number;
  create_at: Date;
  updated_at: Date;
}

export interface User extends Base {
  username: string;
  fullname: string;
  gender: string;
  answers: Answer[];
  questions: Question[];
}

export interface Question extends Base {
  title: string;
  detail: string;
  likes: number;
  author: User;
  answers: Answer[];
}

export interface Answer extends Base {
  detail: string;
  likes: number;
  author: User;
  question: Question;
}

export interface AnswerLike extends Base {
  user: User;
  answer: Answer;
}

export interface QuestionLike extends Base {
  user: User;
  question: Question;
}
