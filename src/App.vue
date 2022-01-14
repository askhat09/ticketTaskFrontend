<template>
  <div class="app">
    <div class="app-header">
      <img class="app-logo" src="./assets/Logo.svg" />
    </div>
    <div class="app-content">
      <ticket-filter
        :transferFilter="transferFilter"
        @transferFilterHandler="transferFilterHandler"
      />
      <div class="app-list-wrapper">
        <ticket-sort @sortByType="sortByType" :activeSort="activeSort" />
        <ticket-list :tickets="filteredTickets" />
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
import { ticketsTypes, Tickets } from "@/types/ticketsTypes.interface";

export default defineComponent({
  data: () => {
    return {
      data: {} as ticketsTypes,
      filteredTickets: [] as Tickets[],
      transferFilter: [] as number[],
      filteredTicketsByTransfer: [] as (string | number)[],
      activeSort: "",
    };
  },
  methods: {
    sortByType(type: string) {
      this.activeSort = type;
      switch (type) {
        case "cheapest": {
          this.filteredTickets?.sort((current, next) => {
            return current.price - next.price;
          });
          break;
        }
        case "fastest": {
          this.filteredTickets?.sort((current, next) => {
            const totalTimeTo =
              current.segments[0].duration + current.segments[1].duration;
            const totalTimeFrom =
              next.segments[0].duration + next.segments[1].duration;
            return totalTimeTo - totalTimeFrom;
          });
          break;
        }
        default: {
          // допустим что оптимальный - это будет сортировкой по количеству пересадок
          this.filteredTickets?.sort((current, next) => {
            const totalTransferTo =
              current.segments[0].stops.length +
              current.segments[1].stops.length;
            const totalTransferFrom =
              next.segments[0].stops.length + next.segments[1].stops.length;
            return totalTransferTo - totalTransferFrom;
          });
          break;
        }
      }
    },
    getTransferFilter() {
      // получаем существующее количество пересадок
      const tickets = this.data.tickets;
      const setOfFilter = new Set(
        tickets?.map((item) => item.segments[0].stops.length)
      );
      this.transferFilter = [...setOfFilter].sort();
    },
    transferFilterHandler(amount: number | string) {
      if (this.filteredTicketsByTransfer.includes(amount)) {
        this.filteredTicketsByTransfer = this.filteredTicketsByTransfer.filter(
          (item) => item !== amount
        );
      } else {
        this.filteredTicketsByTransfer.push(amount);
      }
      this.updateFilteredTickets();
    },
    updateFilteredTickets() {
      if (this.filteredTicketsByTransfer.includes("all")) {
        this.filteredTickets = this.data.tickets;
      } else {
        this.filteredTickets = this.data.tickets.filter((item) =>
          this.filteredTicketsByTransfer.includes(item.segments[0].stops.length)
        );
      }
      this.sortByType(this.activeSort);
    },
  },
  async mounted(): Promise<void> {
    const search = await fetch(`http://localhost:1234/search`);
    const searchResponse = await search.json();
    const t = await fetch(
      `http://localhost:1234/tickets?searchId=${searchResponse?.searchId}`
    );
    const response = await t.json();
    this.data = response;
    this.filteredTickets = response.tickets;
    this.getTransferFilter();
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
