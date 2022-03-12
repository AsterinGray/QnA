import {
  ActionDataPayload,
  Question,
  QuestionData,
} from "@/interfaces/index.interface";
import httpApi from "@/utils/http-api";
import { Commit } from "vuex";
import { AxiosResponse } from "axios";
import config from "@/config";

interface State {
  allQuestions: Question[];
  createdQuestion: Question;
}

const question = {
  state: {
    allQuestions: [],
    createdQuestion: {},
  },
  getters: {
    allQuestions: (state: State): Question[] => state.allQuestions,
    getCreatedQuestion: (state: State): Question => state.createdQuestion,
  },
  mutations: {
    setAllQuestions: (state: State, data: Question[]): void => {
      state.allQuestions = data;
    },
    setCreatedQuestion: (state: State, data: Question): void => {
      state.createdQuestion = data;
    },
  },
  actions: {
    async getAllQuestions({ commit }: { commit: Commit }): Promise<void> {
      const res: AxiosResponse = await httpApi.get("/question");
      commit("setAllQuestions", res.data);
    },
    async createQuestion(
      { commit }: { commit: Commit },
      { data, successHandler, errorHandler }: ActionDataPayload<QuestionData>
    ): Promise<void> {
      httpApi
        .post(config.api.question.create, data)
        .then((res) => {
          commit("setCreatedQuestion", res.data);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            console.log("unaithorize");
            errorHandler();
          }
        });
    },
  },
};

export default question;
