import {User} from "@/interfaces/main.interface";
import {Commit} from "vuex";
import {AxiosResponse} from "axios";
import httpApi from "@/utils/http-api";
import config from "@/config";
import {LoginData} from "@/interfaces/data.interface";
import {ActionDataPayload} from "@/interfaces/base.interface";

interface State {
    user: User
}

const auth = {
    state: {
        user: {}
    },
    getters: {
        user: (state: State): User => state.user
    },
    mutations: {
        setUser: (state: State, data: User): void => {
            state.user = data
        }
    },
    actions: {
        async register({commit}: {commit: Commit}, {data, successHandler}: ActionDataPayload<LoginData>): Promise<void> {
            try {
                const res: AxiosResponse = await httpApi.post(config.api.auth.register, {...data})
                successHandler()
            } catch (e) {
                console.log(e)
                // errorHandler(e.status);
            }
        }
    }
}

export default auth