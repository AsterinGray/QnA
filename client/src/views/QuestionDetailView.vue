<template>
  <question-header />
  <input-answer />
  <answer-list />
</template>

<script>
import QuestionHeader from "@/components/page/question-detail/QuestionHeader";
import AnswerList from "@/components/page/question-detail/AnswerList";
import InputAnswer from "@/components/page/question-detail/InputAnswer";

export default {
  name: "QuestionDetailView",
  components: { InputAnswer, QuestionHeader, AnswerList },
};
</script>

<style scoped>
h2 {
  text-align: left;
  margin-top: 5rem;
}
</style>
