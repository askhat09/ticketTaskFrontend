<template>
  <div :class="{ 'check-filter': true, active: checked }" @click="checkFilter">
    <span class="checkbox"></span>
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

      &::after {
        content: "";
        border-color: #2196f3;
        background-color: #2196f3;
        position: absolute;
        width: 14px;
        height: 14px;
        left: 3px;
        top: 3px;
        border-radius: 2px;
      }
    }
  }

  .checkbox {
    display: inline-block;
    position: relative;
    width: 18px;
    height: 18px;
    border: 1px solid #9abbce;
    border-radius: 3px;
    user-select: none;
  }

  .check-filter-title {
    user-select: none;
    vertical-align: top;
    line-height: 1.6rem;
    padding-left: 0.45rem;
  }
}
</style>
