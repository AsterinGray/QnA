<template>
  <div class="main-container">
    <main>
      <h1>Get Right Back</h1>
      <p>Login and get to ask your questions</p>
      <form v-on:submit.prevent="onFormSubmit(user)">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="user.username" />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="user.password" />
        </div>
        <span>
          Don't have any account?
          <router-link :to="{ name: ROUTES_NAME.SIGNUP }">
            Get started
          </router-link>
        </span>
        <button type="submit" :disabled="isLoading">Login</button>
      </form>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import cookies from "js-cookie";
import { ROUTES_NAME } from "@/router";

export default {
  name: "LoginView",
  data() {
    return {
      user: { username: "", password: "" },
      isLoading: false,
      ROUTES_NAME,
    };
  },
  methods: {
    ...mapActions(["login"]),
    successHandler({ accessToken, expiresIn }) {
      cookies.set("QnA_token", accessToken, {
        expires: Number(expiresIn.charAt(0)),
      });
      this.$toast.success("Login Success");
      this.$router.push({ name: this.ROUTES_NAME.HOME });
    },
    errorHandler(message) {
      this.$toast.error(message);
      this.isLoading = false;
    },
    onFormSubmit(data) {
      this.isLoading = true;
      this.login({
        data,
        successHandler: this.successHandler,
        errorHandler: this.errorHandler,
      });
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
      cursor: pointer;

      &:disabled {
        background-color: gray;
        cursor: default;
      }
    }

    .input-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      label {
        text-align: left;
        font-weight: bold;
        margin-bottom: 0.5rem;
        cursor: pointer;
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
