import { ActionData, Answer, Question } from "@/interfaces/index.interface";
import httpApi from "@/utils/http-api";
import { Commit } from "vuex";
import { Axios, AxiosResponse } from "axios";
import config from "@/config";

export interface QuestionDetailState {
  question: Question;
  answers: Answer[];
}

const questionDetail = {
  state: {
    question: {},
    answers: [],
  },
  getters: {
    question: (state: QuestionDetailState): Question => state.question,
    questionAnswers: (state: QuestionDetailState): Answer[] => state.answers,
  },
  mutations: {
    setQuestion: (state: QuestionDetailState, data: Question): void => {
      state.question = data;
    },
    setQuestionAnswers: (state: QuestionDetailState, data: Answer[]): void => {
      state.answers = data;
    },
  },
  actions: {
    async getQuestion(
      { commit }: { commit: Commit },
      id: number
    ): Promise<void> {
      const res: AxiosResponse = await httpApi.get(
        config.api.question.getById(id)
      );
      commit("setQuestion", res.data);
    },
    async getAnswersByQuestion(
      { commit }: { commit: Commit },
      id: number
    ): Promise<void> {
      const res: AxiosResponse = await httpApi.get(
        config.api.question.getAnswersByQuestion(id)
      );
      commit("setQuestionAnswers", res.data);
    },
    async createAnswerByQuestion(
      { commit }: { commit: Commit },
      {
        data: { id, answer },
        successHandler,
        errorHandler,
      }: ActionData<{ id: number; answer: string }>
    ): Promise<void> {
      httpApi
        .post(config.api.question.addAnswer(id), { detail: answer })
        .then(() => successHandler())
        .catch((e) => {
          console.log(e);
          errorHandler();
        });
    },
  },
};

export default questionDetail;
