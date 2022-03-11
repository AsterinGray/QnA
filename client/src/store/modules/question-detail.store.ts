import {Answer, Question, QuestionData} from "@/interfaces/index.interface";
import httpApi from "@/utils/http-api";
import { Commit } from "vuex";
import { AxiosResponse } from "axios";
import config from "@/config";

interface State {
    question: Question;
    answers: Answer[];
}

const questionDetail = {
    state: {
        question: {},
        answers: []
    },
    getters: {
        question: (state: State): Question => state.question,
        questionAnswers: (state: State): Answer[] => state.answers
    },
    mutations: {
        setQuestion: (state: State, data: Question): void => {
            state.question = data;
        },
        setQuestionAnswers: (state: State, data: Answer[]): void => {
            state.answers = data;
        }
    },
    actions: {
        async getQuestion({commit}: {commit: Commit}, id: number): Promise<void> {
            const res: AxiosResponse = await httpApi.get(config.api.question.getById(id))
            commit("setQuestion", res.data)
        },
        async getAnswersByQuestion({commit}: {commit: Commit}, id: number): Promise<void> {
            const res: AxiosResponse = await httpApi.get(config.api.question.getAnswersByQuestion(id))
            commit('setQuestionAnswers', res.data)
        }
    },
};

export default questionDetail;
