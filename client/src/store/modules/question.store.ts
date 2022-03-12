import {
  ActionData,
  Question,
  QuestionData,
} from "@/interfaces/index.interface";
import httpApi from "@/utils/http-api";
import { Commit } from "vuex";
import { AxiosResponse } from "axios";
import config from "@/config";

interface State {
  allQuestions: Question[];
  createQuestion: QuestionData;
}

const question = {
  state: {
    allQuestions: [],
    createQuestion: {},
  },
  getters: {
    allQuestions: (state: State): Question[] => state.allQuestions,
    createQuestion: (state: State): QuestionData => state.createQuestion,
  },
  mutations: {
    setAllQuestions: (state: State, data: Question[]): void => {
      state.allQuestions = data;
    },
    setCreateQuestion: (state: State, data: QuestionData): void => {
      state.createQuestion = data;
    },
  },
  actions: {
    async getAllQuestions({ commit }: { commit: Commit }): Promise<void> {
      const res: AxiosResponse = await httpApi.get("/question");
      commit("setAllQuestions", res.data);
    },
    async createQuestion(
      _: any,
      { data, successHandler, errorHandler }: ActionData<QuestionData>
    ): Promise<void> {
      httpApi
        .post(config.api.question.create, data)
        .then(() => successHandler())
        .catch(() => errorHandler());
    },
  },
};

export default question;
