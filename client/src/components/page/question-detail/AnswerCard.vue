<template>
  <div class="answer-card">
    <h3>{{ detail }}</h3>
    <p>
      <span>{{ author }}</span>
      <span>{{ likes }} likes</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "AnswerCard",
  props: ["detail", "author", "likes"],
};
</script>

<style lang="scss" scoped>
.answer-card {
  border: 1px solid lightgray;
  border-radius: 0.8rem;
  padding: 0.5rem 1rem;
  text-align: left;

  p {
    display: flex;
    justify-content: space-between;
    color: darkgray;
  }
}
</style>
