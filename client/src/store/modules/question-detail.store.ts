import { Answer, Question } from "@/interfaces/index.interface";
import httpApi from "@/utils/http-api";
import { Commit } from "vuex";
import { AxiosResponse } from "axios";
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
  },
};

export default questionDetail;
