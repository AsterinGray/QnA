<template>
  <question-header v-bind="question" />
  <h2>Answers</h2>
  <div class="answer-list">
    <answer-card
      v-for="answer in questionAnswers"
      :key="answer.id"
      v-bind="answer"
    />
  </div>
</template>

<script>
import QuestionHeader from "@/components/page/question-detail/QuestionHeader";
import AnswerCard from "@/components/page/question-detail/AnswerCard";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "QuestionDetailView",
  computed: {
    ...mapGetters(["question", "questionAnswers"]),
  },
  methods: {
    ...mapActions(["getQuestion", "getAnswersByQuestion"]),
  },
  mounted() {
    this.getQuestion(Number(this.$route.params.id));
    this.getAnswersByQuestion(Number(this.$route.params.id));
  },
  components: { QuestionHeader, AnswerCard },
};
</script>

<style scoped>
h2 {
  text-align: left;
  margin-top: 5rem;
}
.answer-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  border-radius: 0.8rem;
}
</style>
