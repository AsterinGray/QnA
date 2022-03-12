<template>
  <div class="question__card">
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
.question__card {
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  padding: 1rem;

  h3 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
  }

  #detail {
    display: flex;
    justify-content: space-between;
    color: gray;
  }
}
</style>
