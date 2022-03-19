<template>
  <div class="card">
    <h1>{{ question.title }}</h1>
    <p>{{ question.detail }}</p>
    <div class="information">
      <span v-if="question.author">
        <span v-if="question.author.username">{{
          question.author.username
        }}</span>
      </span>
      <span>{{ question.likes }} likes</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "QuestionHeader",
  computed: {
    ...mapGetters(["question"]),
  },
  methods: {
    ...mapActions(["getQuestion"]),
  },
  mounted() {
    this.getQuestion(Number(this.$route.params.id));
  },
};
</script>

<style scoped>
h1 {
  text-align: left;
  margin: 0;
}

p {
  text-align: left;
}

.information {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: darkgray;
}
</style>
