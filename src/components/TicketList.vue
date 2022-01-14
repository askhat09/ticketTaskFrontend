<template>
  <div class="ticket_list">
    <div>
      <ticket-item
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket="ticket"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TicketItem from "@/components/TicketItem.vue";
import { Result } from "@/types/ticketsTypes.interface";

export default defineComponent({
  props: {
    tickets: {
      type: [] as PropType<Result>,
    },
  },
  components: {
    TicketItem,
  },
});
</script>

<style></style>
