<template>
  <div class="main-container">
    <main>
      <form v-on:submit.prevent="onFormSubmit()">
        <div>
          <div class="input-group">
            <label for="username">Username</label>
            <input type="text" id="username" :value="user.username" disabled />
          </div>
          <div class="input-group">
            <label for="name">Fullname</label>
            <input
              type="text"
              id="name"
              :value="user.fullname"
              @input="updateFullname"
            />
          </div>
          <div class="input-group">
            <label for="gender">Gender</label>
            <select id="gender" :value="user.gender" @input="updateGender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" />
          </div>
        </div>
        <button type="submit" :disabled="isLoading">Update Profile</button>
      </form>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "ProfileView",
  data() {
    return {
      isLoading: false,
      password: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["getProfile", "updateProfile"]),
    ...mapMutations(["setFullname", "setGender"]),
    updateFullname(e) {
      this.setFullname(e.target.value);
    },
    updateGender(e) {
      this.setGender(e.target.value);
    },
    successHandler() {
      this.$toast.success("Profile Updated");
    },
    errorHandler(message) {
      this.$toast.error(message);
    },
    onFormSubmit() {
      console.log("ON FORM SUBMIT");
      this.isLoading = true;
      this.updateProfile({
        data: {
          username: this.user.username,
          fullname: this.user.fullname,
          password: this.password,
        },
        successHandler: this.successHandler,
        errorHandler: this.errorHandler,
      });
      this.isLoading = false;
    },
  },
  mounted() {
    this.getProfile();
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
        font-size: 1rem;

        &:disabled {
          border: none;
          color: black;
          padding: 0;
        }
      }
    }
  }
}
</style>
