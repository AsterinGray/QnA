<template>
  <input-question />
  <h1>See what other have questioned</h1>
  <div class="card question__container" v-if="questions">
    <div v-if="questions.length === 0">No Data</div>
    <router-link
      v-else
      v-for="question in questions"
      :key="question.id"
      :to="{ path: `/question/${question.id}` }"
    >
      <question-card v-bind="question" />
    </router-link>
  </div>
</template>

<script>
import QuestionCard from "@/components/page/home/QuestionCard";
import InputQuestion from "@/components/page/home/InputQuestion";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomeView",
  computed: {
    ...mapGetters({
      questions: "allQuestions",
      createdQuestion: "getCreatedQuestion",
    }),
  },
  methods: {
    ...mapActions(["getAllQuestions"]),
  },
  mounted() {
    this.getAllQuestions();
  },
  components: {
    QuestionCard,
    InputQuestion,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 3rem;
  text-align: left;
}

.question__container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
