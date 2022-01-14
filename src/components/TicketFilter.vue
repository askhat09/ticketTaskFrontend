<template>
  <div class="ticket-filter">
    <div class="ticket-filter-wrapper">
      <h2>Количество пересадок</h2>
      <div class="filter-group">
        <check-filter
          v-for="transfer in transfers"
          category="genre"
          v-bind:title="transfer"
          :key="transfer"
          @check-filter="checkFilter('transfer', transfer, $event)"
        ></check-filter>
      </div>
    </div>
  </div>
</template>

<script>
import transfers from "@/util/transfers";
import CheckFilter from "@/components/CheckFilter.vue";

export default {
  data() {
    return {
      transfers,
    };
  },
  components: {
    CheckFilter,
  },
};
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
