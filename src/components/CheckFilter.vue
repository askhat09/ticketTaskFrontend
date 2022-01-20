<template>
  <div :class="{ 'check-filter': true, active: checked }" @click="checkFilter">
    <span class="checkbox">
      <img v-if="checked" src="../assets/shape.svg" />
    </span>
    <span class="check-filter-title">{{ title }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    value: {
      type: Boolean,
    },
  },
  data: function () {
    return {
      checked: this.value,
    };
  },
  methods: {
    checkFilter() {
      this.checked = !this.checked;
    },
  },
});
</script>

<style lang="scss">
.check-filter {
  display: flex;
  align-items: center;
  padding: 5px 20px;

  color: #4a4a4a;
  cursor: pointer;
  font-size: 13px;
  line-height: 20px;

  @media screen and (max-width: 800px) {
    width: 125px;
  }

  &:hover {
    background: #f1fcff;
  }

  &.active {
    .checkbox {
      border-color: #2196f3;
    }
  }

  .checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    border: 1px solid #9abbce;
    border-radius: 2px;
    user-select: none;

    img {
      width: 12px;
    }
  }

  .check-filter-title {
    user-select: none;
    vertical-align: top;
    font-weight: 400;
    line-height: 1.6rem;
    padding-left: 0.45rem;
  }
}
</style>
