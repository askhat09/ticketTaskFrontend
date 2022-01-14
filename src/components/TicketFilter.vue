<template>
  <div class="ticket-filter">
    <div class="ticket-filter-wrapper">
      <h2>Количество пересадок</h2>
      <div class="filter-group">
        <check-filter @click="filterChangeHandler('all')" :title="'Все'" />
        <check-filter
          v-for="transfer in transferFilter"
          :title="formatTransfer(transfer)"
          :key="transfer"
          @click="filterChangeHandler(transfer)"
        ></check-filter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CheckFilter from "@/components/CheckFilter.vue";
import { formatTransfer } from "@/services/helper";

export default defineComponent({
  props: {
    transferFilter: {
      type: Array as PropType<number[]>,
    },
  },
  data() {
    return {};
  },
  methods: {
    formatTransfer,
    filterChangeHandler(amount: number | string) {
      this.$emit("transferFilterHandler", amount);
    },
  },
  components: {
    CheckFilter,
  },
});
</script>

<style lang="scss" scoped>
.ticket-filter {
  flex-basis: 31%;
  margin-right: 20px;

  @media screen and (max-width: 800px) {
    margin-right: 0;
    margin-bottom: 20px;
  }

  &-wrapper {
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  h2 {
    padding: 20px;

    font-size: 12px;
    text-transform: uppercase;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;

    @media screen and (max-width: 800px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
