<template>
  <form v-on:submit.prevent="onFormSubmit">
    <input
      type="text"
      placeholder="Search any question"
      v-model="searchQuery"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "SearchBar",
  data: () => {
    return {
      searchQuery: "",
    };
  },
  methods: {
    ...mapMutations(["setSearchQuery"]),
    onFormSubmit() {
      this.setSearchQuery(this.searchQuery);
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 40%;
  button {
    display: none;
  }

  input {
    padding: 0.5rem 1rem;
    width: 60%;
    border-radius: 1rem;
  }
}
</style>
