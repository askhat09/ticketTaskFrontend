<template>
  <div class="ticket-select-group">
    <button type="button">Самый дешевый</button>
    <button type="button">Самый быстрый</button>
    <button type="button">Оптимальный</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.ticket-select-group {
  display: flex;

  button {
    width: 100%;
    padding: 15px;

    background: #ffffff;
    border: 1px solid #dfe5ec;
    color: #4a4a4a;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 20px;
    text-transform: uppercase;
    cursor: pointer;

    @media screen and (max-width: 800px) {
      font-size: 9px;
      line-height: 13px;
    }

    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    &:hover {
      border-color: #2196f3;
      background: #2196f3;
      color: #ffffff;
    }

    &.active {
      border-color: #2196f3;
      background: #2196f3;
      color: #ffffff;
    }
  }
}
</style>
