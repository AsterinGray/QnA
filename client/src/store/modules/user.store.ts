import { Commit } from "vuex";
import httpApi from "@/utils/http-api";
import config from "@/config";
import { ActionData } from "@/interfaces/base.interface";
import { UpdateProfileData } from "@/interfaces/data.interface";
import { Answer, Question } from "@/interfaces/main.interface";

export interface UserState {
  username: string;
  fullname: string;
  gender: string;
  questions: Question[];
}

const user = {
  state: {
    username: "",
    fullname: "",
    gender: "",
    questions: [],
  },
  getters: {
    user: (state: UserState): UserState => {
      return {
        username: state.username,
        fullname: state.fullname,
        gender: state.gender,
        questions: state.questions,
      };
    },
  },
  mutations: {
    setUser: (state: UserState, data: UserState): void => {
      state.username = data.username;
      state.fullname = data.fullname;
      state.gender = data.gender;
    },
    setUsername: (state: UserState, data: string): void => {
      state.username = data;
    },
    setFullname: (state: UserState, data: string): void => {
      state.fullname = data;
    },
    setGender: (state: UserState, data: string): void => {
      state.gender = data;
    },
  },
  actions: {
    async getProfile({ commit }: { commit: Commit }): Promise<void> {
      httpApi.get(config.api.user.get).then((res) => {
        commit("setUser", res.data);
      });
    },
    async updateProfile(
      { commit }: { commit: Commit },
      { data, successHandler, errorHandler }: ActionData<UpdateProfileData>
    ): Promise<void> {
      httpApi
        .put(config.api.user.update, data, { data })
        .then((res) => {
          commit("setUser", res.data);
          successHandler();
        })
        .catch((e) => errorHandler(e.response.data.message));
    },
  },
};

export default user;
