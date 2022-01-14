<template>
  <div class="ticket">
    <div class="ticket_row --mb">
      <div class="ticket-price">{{ formatCurrency(ticket.price) }} P</div>
      <div class="ticket-brand">
        {{ ticket.carrier }}
        <!-- <img src="../assets/s7logo.svg" alt="s7" /> -->
      </div>
    </div>
    <div class="ticket_row">
      <div class="ticket_way">
        <div class="ticket_way --title">MOW – HKT</div>
        <div class="ticket_way --time">
          {{ renderDate(ticket.segments[0].date, ticket.segments[0].duration) }}
        </div>
      </div>
      <div class="ticket_long">
        <div class="ticket_long --title">В пути</div>
        <div class="ticket_long --time">
          {{ getTimeFromMins(ticket.segments[0].duration) }}
        </div>
      </div>
      <div class="ticket_transfers">
        <div class="ticket_transfers --title">
          {{ formatTransfer(ticket.segments[0].stops.length) }}
        </div>
        <div class="ticket_transfers --time">
          {{ ticket.segments[0].stops.join(", ") }}
        </div>
      </div>
    </div>
    <div class="ticket_row">
      <div class="ticket_way">
        <div class="ticket_way --title">MOW – HKT</div>
        <div class="ticket_way --time">
          {{ renderDate(ticket.segments[1].date, ticket.segments[1].duration) }}
        </div>
      </div>
      <div class="ticket_long">
        <div class="ticket_long --title">В пути</div>
        <div class="ticket_long --time">
          {{ getTimeFromMins(ticket.segments[1].duration) }}
        </div>
      </div>
      <div class="ticket_transfers">
        <div class="ticket_transfers --title">
          {{ formatTransfer(ticket.segments[1].stops.length) }}
        </div>
        <div class="ticket_transfers --time">
          {{ ticket.segments[1].stops.join(", ") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Tickets } from "@/types/ticketsTypes.interface";
import { formatTransfer } from "@/services/helper";
export default defineComponent({
  props: {
    ticket: {
      type: Object as PropType<Tickets>,
      required: true,
    },
  },
  methods: {
    formatTransfer,
    renderDate(date: string, duration: number) {
      const startTime = new Date(date);
      const endTime = new Date(
        new Date(startTime).getTime() + new Date(duration).getTime() * 60000
      );
      function formatHours(time: Date) {
        return time.toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      return `${formatHours(startTime)} – ${formatHours(endTime)}`;
    },

    getTimeFromMins(mins: number) {
      let hours = Math.trunc(mins / 60);
      let minutes = mins % 60;
      return hours + "ч " + minutes + "м";
    },

    formatCurrency(num: number) {
      return new Intl.NumberFormat("ru-RU").format(num);
    },
  },
});
</script>

<style lang="scss" scoped>
.ticket {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;

  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  &_row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;

    &.--mb {
      margin-bottom: 20px;
    }
  }

  .--title {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #a0b0b9;
  }

  .--time {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #4a4a4a;
  }

  &-price {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #2196f3;
  }

  &-brand {
    background: #bad332;
    border-radius: 100%;
    padding: 10px;
    color: #ffffff;
    font-weight: bold;
  }

  &_transfers {
    min-width: 140px;
  }
}
</style>
