<template>
  <div class="app">
    <div class="app-header">
      <img class="app-logo" src="./assets/Logo.svg" />
    </div>
    <div class="app-content">
      <ticket-filter />
      <div class="app-list-wrapper">
        <ticket-sort />
        <ticket-list v-if="data.tickets" :tickets="data.tickets" />
        <ticket-more />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TicketFilter from "@/components/TicketFilter.vue";
import TicketSort from "@/components/TicketSort.vue";
import TicketList from "@/components/TicketList.vue";
import TicketMore from "@/components/TicketMore.vue";
import { ticketsTypes } from "@/types/ticketsTypes.interface";

export default defineComponent({
  data: () => {
    return {
      data: {} as ticketsTypes,
    };
  },
  async mounted(): Promise<void> {
    const search = await fetch(`http://localhost:1234/search`);
    const searchResponse = await search.json();
    const t = await fetch(
      `http://localhost:1234/tickets?searchId=${searchResponse?.searchId}`
    );
    const response = await t.json();
    console.log("response", response);
    this.data = response;
    console.log("this.tickets", this.data);
  },
  components: {
    TicketFilter,
    TicketSort,
    TicketList,
    TicketMore,
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  background: #f3f7fa;
}

.app {
  max-width: 754px;
  margin: 0 auto;

  font-family: "Open Sans", Helvetica, Arial, sans-serif;

  @media screen and (max-width: 800px) {
    padding: 0 15px;
  }

  &-header {
    display: flex;
    justify-content: center;
    padding-top: 50px;

    @media screen and (max-width: 800px) {
      padding-top: 30px;
    }
  }

  &-logo {
    width: 60px;
    height: 60px;
  }

  &-content {
    display: flex;
    margin-bottom: 50px;
    padding-top: 50px;

    @media screen and (max-width: 800px) {
      flex-direction: column;
      padding-top: 30px;
    }
  }

  &-list-wrapper {
    display: flex;
    flex-direction: column;
    flex-basis: 67%;
  }
}
</style>
