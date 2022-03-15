import { Commit } from "vuex";
import httpApi from "@/utils/http-api";
import config from "@/config";
import { LoginData, RegisterData } from "@/interfaces/data.interface";
import { ActionData } from "@/interfaces/base.interface";

export interface AuthState {
  isAuthenticate: boolean;
}

const auth = {
  state: {
    isAuthenticate: false,
  },
  getters: {
    isAuthenticate: (state: AuthState): boolean => state.isAuthenticate,
  },
  mutations: {
    setIsAuthenticate: (state: AuthState, data: boolean): void => {
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
