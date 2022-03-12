export interface QuestionData {
  title: string;
  detail: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  gender: string;
  fullname: string;
}

export interface BaseComponentData {
  isLoading: boolean;
}
