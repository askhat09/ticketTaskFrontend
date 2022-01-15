<template>
  <div class="ticket_list">
    <div v-for="(ticket, index) in tickets" :key="index">
      <ticket-item v-if="pagination > index" :ticket="ticket" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TicketItem from "@/components/TicketItem.vue";
import { Tickets } from "@/types/ticketsTypes.interface";

export default defineComponent({
  props: {
    tickets: {
      type: Array as PropType<Tickets[]>,
    },
    pagination: {
      type: Number,
    },
  },
  components: {
    TicketItem,
  },
});
</script>

<style></style>
