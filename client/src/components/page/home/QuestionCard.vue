<template>
  <div id="card">
    <h3>{{ title }}</h3>
    <div id="detail">
      <div>questioned by {{ author.username }}</div>
      <div>{{ likes }} likes</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "QuestionCard",
  props: ["title", "author", "likes"],
});
</script>

<style lang="scss" scoped>
#card {
  border: 1px solid lightgray;
  border-radius: 0.5rem;

  h3 {
    color: #2c3e50;
  }

  #detail {
    display: flex;
    justify-content: space-between;
    color: gray;
  }
}
</style>
