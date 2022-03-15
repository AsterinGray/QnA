import { createStore } from "vuex";
import search, { SearchState } from "@/store/modules/search.store";
import question, { QuestionState } from "@/store/modules/question.store";
import questionDetail, {
  QuestionDetailState,
} from "@/store/modules/question-detail.store";
import auth, { AuthState } from "@/store/modules/auth.store";
import user, { UserState } from "@/store/modules/user.store";

interface RootState {
  auth: AuthState;
  user: UserState;
  search: SearchState;
  question: QuestionState;
  questionDetail: QuestionDetailState;
}

export default createStore<RootState>({
  modules: { auth, user, search, question, questionDetail },
});
