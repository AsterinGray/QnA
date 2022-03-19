<template>
  <form class="card" v-on:submit.prevent="onFormSubmit(answer)">
    <input type="text" v-model="answer" placeholder="Answer the question" />
    <button type="submit" :disabled="isLoading">Answer</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "InputAnswer",
  data() {
    return {
      answer: "",
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["createAnswerByQuestion", "getAnswersByQuestion"]),
    successHandler() {
      this.isLoading = false;
      this.$toast.success("Answer created");
      this.getAnswersByQuestion(Number(this.$route.params.id));
    },
    errorHandler(message) {
      this.isLoading = false;
      this.$toast.error(message);
    },
    onFormSubmit(answer) {
      this.isLoading = true;
      this.createAnswerByQuestion({
        data: { id: Number(this.$route.params.id), answer },
        successHandler: this.successHandler,
        errorHandler: this.errorHandler,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  &.card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    resize: none;
    border: 1px solid lightgray;
    margin-right: 1rem;
  }
}
</style>
