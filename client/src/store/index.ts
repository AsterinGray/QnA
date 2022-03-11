import { createStore } from "vuex";
import search from "@/store/modules/search.store";
import question from "@/store/modules/question.store";
import questionDetail from "@/store/modules/question-detail.store";
import auth from "@/store/modules/auth.store";

export default createStore({
  modules: { auth, search, question, questionDetail },
});
