<template>
  <div class="app">
    <div class="app-header">
      <img
        class="app-logo"
        :class="{ loading: true }"
        src="./assets/Logo.svg"
      />
    </div>
    <div class="app-content" v-if="!errorHappened">
      <ticket-filter
        :transferFilter="transferFilter"
        @transferFilterHandler="transferFilterHandler"
      />
      <div class="app-list-wrapper">
        <ticket-sort @sortByType="sortByType" :activeSort="activeSort" />
        <ticket-list
          :tickets="filteredTickets"
          :pagination="pagination.current"
        />
        <ticket-more
          v-if="pagination.current < pagination.total"
          @click="showMore"
        />
      </div>
    </div>
    <went-wrong v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TicketFilter from "@/components/TicketFilter.vue";
import TicketSort from "@/components/TicketSort.vue";
import TicketList from "@/components/TicketList.vue";
import TicketMore from "@/components/TicketMore.vue";
import WentWrong from "@/components/WentWrong.vue";
import {
  ticketsTypes,
  Tickets,
  Filters,
  Paginations,
} from "@/types/ticketsTypes.interface";

export default defineComponent({
  data: () => {
    return {
      data: {} as ticketsTypes,
      filteredTickets: [] as Tickets[],
      transferFilter: {} as Filters,
      activeSort: "",
      pagination: {
        current: 5,
        total: 0,
      } as Paginations,
      // так как роутера нет придеться через дату редирект делать
      errorHappened: false,
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
        case "optimal": {
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
      setOfFilter.forEach((item) => {
        this.transferFilter[item] = false;
      });
    },
    transferFilterHandler(args: any) {
      if (args.key === "all") {
        if (args.checkAll === true) {
          this.filteredTickets = this.data.tickets;
          this.pagination.total = this.filteredTickets.length;
          this.pagination.current = 5;
        } else {
          this.updateFilteredTickets();
        }
      } else if (args.checkAll === true) {
        this.transferFilter[args.key] = !this.transferFilter[args.key];
        this.filteredTickets = this.data.tickets;
        this.pagination.total = this.filteredTickets.length;
        this.pagination.current = 5;
      } else {
        this.transferFilter[args.key] = !this.transferFilter[args.key];
        this.updateFilteredTickets();
      }
    },
    updateFilteredTickets() {
      this.filteredTickets = this.data.tickets.filter((item) => {
        return this.transferFilter[item.segments[0].stops.length];
      });
      this.pagination.total = this.filteredTickets.length;
      this.pagination.current = 5;
      this.sortByType(this.activeSort);
    },
    showMore() {
      this.pagination.current += 5;
    },
  },
  async mounted(): Promise<void> {
    const search = await fetch(`http://localhost:1234/search`);
    const searchResponse = await search.json();
    try {
      const t = await fetch(
        `http://localhost:1234/tickets?searchId=${searchResponse?.searchId}`
      );
      const response = await t.json();
      this.data = response;
      this.filteredTickets = response.tickets;
      this.pagination.total = response.tickets.length;
      this.getTransferFilter();
    } catch (error) {
      this.errorHappened = true;
      console.log("For some sentry or logger", error);
    }
  },
  components: {
    TicketFilter,
    TicketSort,
    TicketList,
    TicketMore,
    WentWrong,
  },
});
</script>

<style lang="scss">
@import "./assets/styles/main.css";
* {
  margin: 0;
  padding: 0;

  font-family: "Open Sans";
}

body {
  background: #f3f7fa;
}

.app {
  max-width: 754px;
  margin: 0 auto;

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
