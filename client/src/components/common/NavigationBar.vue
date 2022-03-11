<template>
  <header>
    <div id="brand">
      <h1>QnA</h1>
      <span>Question and Answer everything here</span>
    </div>
    <search-bar />
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/signup"><button>Sign Up</button></router-link>
    </nav>
  </header>
</template>

<script>
import SearchBar from "@/components/common/SearchBar.vue";
export default {
  name: "NavigationBar",
  components: {
    SearchBar,
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem 10rem;
  background-color: white;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.25);

  #brand {
    display: flex;
    align-items: baseline;
    margin: 0;

    h1 {
      margin: 0 1rem 0 0;
    }
  }

  nav {
    display: flex;
    align-items: center;

    a,
    button {
      font-weight: bold;
      color: black;
      margin-left: 1rem;

      &.router-link-exact-active {
        color: dodgerblue;
      }
    }

    button {
      color: white;
      background-color: dodgerblue;
      margin-left: 1rem;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.8rem;
      cursor: pointer;
    }
  }
}

@media only screen and (max-width: 992px) {
  header {
    padding: 1rem 5rem;
  }
}

@media only screen and (max-width: 768px) {
  header {
    padding: 1rem 3rem;
    font-size: 14px;
  }
}

@media only screen and (max-width: 640px) {
  header {
    padding: 1rem 3rem;

    span {
      display: none;
    }
  }
}

@media only screen and (max-width: 480px) {
  header {
    padding: 1rem;
  }
}
</style>
