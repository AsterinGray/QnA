<template>
  <div class="main-container">
    <main>
      <h1>Get Right Back</h1>
      <p>Login and get to ask your questions</p>
      <form v-on:submit.prevent="onFormSubmit">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <span>
          Don't have any account?
          <router-link to="/signup">Get started</router-link>
        </span>
        <button type="submit">Login</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onFormSubmit() {
      console.log("Working");
      console.log(this.username, this.password);
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
