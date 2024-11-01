<script setup lang="ts">

</script>

<template>
  <aside class="aside">
    <div class="aside__container">
      <slot/>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.aside{
  background-color: var(--purple);
  height: 100%;
  width: 64px;
  &__container{
    padding: 104px 16px;
    display: flex;
    flex-direction: column;
    gap: 113px;
    height: 100%;
  }
}
</style>