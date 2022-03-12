import { User } from "@/interfaces/main.interface";
import { Commit } from "vuex";
import httpApi from "@/utils/http-api";
import config from "@/config";
import { LoginData, RegisterData } from "@/interfaces/data.interface";
import { ActionData } from "@/interfaces/base.interface";

interface State {
  user: User;
  isAuthenticate: boolean;
}

const auth = {
  state: {
    user: {},
    isAuthenticate: false,
  },
  getters: {
    user: (state: State): User => state.user,
    isAuthenticate: (state: State): boolean => state.isAuthenticate,
  },
  mutations: {
    setUser: (state: State, data: User): void => {
      state.user = data;
    },
    setIsAuthenticate: (state: State, data: boolean): void => {
      state.isAuthenticate = data;
    },
  },
  actions: {
    async register(
      _: any,
      { data, successHandler, errorHandler }: ActionData<RegisterData>
    ): Promise<void> {
      await httpApi
        .post(config.api.auth.register, { ...data })
        .then(() => successHandler())
        .catch((e) => errorHandler(e.response.data.message));
    },
    async login(
      { commit }: { commit: Commit },
      { data, successHandler, errorHandler }: ActionData<LoginData>
    ): Promise<void> {
      httpApi
        .post(config.api.auth.login, data)
        .then((res) => {
          commit("setIsAuthenticate", true);
          successHandler(res.data);
        })
        .catch((e) => errorHandler(e.response.data.message));
    },
  },
};

export default auth;
