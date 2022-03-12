<template>
  <div class="main-container">
    <main>
      <h1>Get Started</h1>
      <p>Sign Up and get started to contribute into the community</p>
      <form v-on:submit.prevent="onFormSubmit(user)">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="user.username" />
        </div>
        <div class="input-group">
          <label for="fullname">Fullname</label>
          <input type="text" id="fullname" v-model="user.fullname" />
        </div>
        <div class="input-group">
          <label for="gender">Gender</label>
          <select id="gender" v-model="user.gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="user.password" />
        </div>
        <span>
          Already have an account?
          <router-link :to="{ name: ROUTES_NAME.LOGIN }">
            Get right back
          </router-link>
        </span>
        <button type="submit" :disabled="isLoading">Sign Up</button>
      </form>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ROUTES_NAME } from "@/router";

export default {
  name: "SignupView",
  data: () => {
    return {
      user: { username: "", fullname: "", gender: "", password: "" },
      isLoading: false,
      ROUTES_NAME,
    };
  },
  methods: {
    ...mapActions(["register"]),
    successHandler() {
      this.$toast.success("Account registered");
      this.$router.push({ name: ROUTES_NAME.LOGIN });
    },
    errorHandler(message) {
      this.$toast.error(message);
      this.isLoading = false;
    },
    onFormSubmit(data) {
      this.isLoading = true;
      this.register({
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
      }

      input,
      select {
        padding: 0.5rem;
        border: 1px solid darkgray;
        border-radius: 1rem;
        background-color: white;
      }
    }
  }
}
</style>
