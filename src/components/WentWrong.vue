<template>
  <div class="went-wrong">
    Что-то пошло не так, пожалуйста, обновите страницу
    <button @click="refreshPage">Обновить</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  methods: {
    refreshPage() {
      document.location.reload();
    },
  },
});
</script>

<style lang="scss" scoped>
.went-wrong {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-content: center;
  align-items: center;

  button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #2196f3;
    border-radius: 5px;
    color: #ffffff;
  }
}
</style>
