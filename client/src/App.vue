<template>
  <navigation-bar />
  <div id="container">
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "@/components/common/NavigationBar";
import { mapMutations } from "vuex";
import { initAuthentication } from "@/utils/auth";

export default {
  components: { NavigationBar },
  methods: {
    ...mapMutations(["setIsAuthenticate"]),
  },
  created() {
    this.setIsAuthenticate(initAuthentication());
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  text-decoration: none;
}

body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#container {
  padding: 2rem 10rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.8rem;
  padding: 1.5rem;
  text-align: left;
  margin-bottom: 2rem;
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

@media only screen and (max-width: 992px) {
  #container {
    padding: 1rem 5rem;
  }
}

@media only screen and (max-width: 768px) {
  #container {
    padding: 1rem 3rem;
    font-size: 14px;
  }
}

@media only screen and (max-width: 640px) {
  #container {
    padding: 1rem 3rem;
  }
}

@media only screen and (max-width: 480px) {
  #container {
    padding: 1rem;
  }
}
</style>
