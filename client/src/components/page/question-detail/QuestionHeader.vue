<template>
  <h1>{{ title }}</h1>
  <p>{{ detail }}</p>
  <p class="information">
    <span v-if="author">
      <span v-if="author.username">{{ author.username }}</span>
    </span>
    <span>{{ likes }} likes</span>
  </p>
</template>

<script>
export default {
  name: "QuestionHeader",
  props: ["title", "detail", "author", "likes"],
};
</script>

<style scoped>
h1 {
  text-align: left;
}

p {
  text-align: left;
  display: flex;
  justify-content: space-between;
}

.information {
  color: darkgray;
}
</style>
