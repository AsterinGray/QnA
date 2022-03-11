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
import { mapActions, mapGetters } from "vuex";
import {ROUTES_NAME} from "@/router";

export default {
  name: "SearchBar",
  data () {
    return {
      title: "",
      detail: "",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      createdQuestion: "getCreatedQuestion",
    }),
  },
  methods: {
    ...mapActions(["createQuestion"]),
    redirectToLogin: function () {
      this.$router.push({name: ROUTES_NAME.LOGIN})
    },
    onFormSubmit: function (title, detail) {
      this.isLoading = true;
      this.createQuestion({
            data: {title, detail},
            errorHandle: this.redirectToLogin
          }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: block;
  width: 100%;

  input {
    font-weight: bold;
    font-size: 1.2rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    resize: none;
    border: 1px solid lightgray;
  }

  button {
    background-color: dodgerblue;
    color: white;
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    cursor: pointer;

    &:disabled {
      background-color: gray;
    }
  }
}
</style>
