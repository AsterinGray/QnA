<template>
  <div class="card">
    <h2>Answers</h2>
    <div class="answer-list">
      <answer-card
        v-for="answer in questionAnswers"
        :key="answer.id"
        v-bind="answer"
      />
      <div v-if="questionAnswers.length === 0">No answer yet</div>
    </div>
  </div>
</template>

<script>
import AnswerCard from "@/components/page/question-detail/AnswerCard";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AnswerList",
  computed: {
    ...mapGetters(["questionAnswers"]),
  },
  methods: {
    ...mapActions(["getAnswersByQuestion"]),
  },
  mounted() {
    this.getAnswersByQuestion(Number(this.$route.params.id));
  },
  components: { AnswerCard },
};
</script>

<style scoped>
.answer-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.8rem;
}
</style>
