<template>
  <div class="card">
    <h1>Do you have any question? Ask your question right now!</h1>
    <form v-on:submit.prevent="onFormSubmit(title, detail)">
      <input
        type="text"
        placeholder="Input your question title"
        v-model="title"
      />
      <textarea
        rows="3"
        placeholder="Input your question detail"
        v-model="detail"
      ></textarea>
      <button type="submit" :disabled="isLoading">Ask Your Question</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ROUTES_NAME } from "@/router";

export default {
  name: "SearchBar",
  data() {
    return {
      title: "",
      detail: "",
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["createQuestion", "getAllQuestions"]),
    errorHandler: function () {
      this.$toast.error("Need to login before ask question");
      this.$router.push({ name: ROUTES_NAME.LOGIN });
    },
    successHandler: function () {
      this.title = "";
      this.detail = "";
      this.$toast.success("Question created successfully");
      this.isLoading = false;
      this.getAllQuestions();
    },
    onFormSubmit: function (title, detail) {
      this.isLoading = true;
      this.createQuestion({
        data: { title, detail },
        successHandler: this.successHandler,
        errorHandler: this.errorHandler,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: block;
  width: 100%;

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    resize: none;
    border: 1px solid lightgray;
  }
}
</style>
