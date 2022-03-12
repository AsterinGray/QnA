<template>
  <div class="main-container">
    <main>
      <h1>Get Started</h1>
      <p>Sign Up and get started to contribute into the community</p>
      <form v-on:submit.prevent="onFormSubmit({ username, password })">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <span>
          Already have an account?
          <router-link to="/login">Get right back</router-link>
        </span>
        <button type="submit" :disabled="isLoading">Sing Up</button>
      </form>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignupView",
  data: () => {
    return {
      username: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["register"]),
    changeIsLoading() {
      this.isLoading = !this.isLoading;
    },
    onFormSubmit(data) {
      this.changeIsLoading();
      this.register({ data, successHandler: this.changeIsLoading });
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  justify-content: center;
}
main {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  width: 50%;
  padding: 3rem;
  border-radius: 0.8rem;

  h1 {
    color: dodgerblue;
    margin: 0 0 1rem 0;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    button {
      padding: 0.5rem;
      color: white;
      background-color: dodgerblue;
      border: none;
      border-radius: 1rem;
      margin-top: 1rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      label {
        text-align: left;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      input {
        padding: 0.5rem;
        border: 1px solid darkgray;
        border-radius: 1rem;
      }
    }
  }
}
</style>
