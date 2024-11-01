<script setup lang="ts">
import LayoutHeader from "~/components/layoutComponents/LayoutHeader.vue";
import LayoutFooter from "~/components/layoutComponents/LayoutFooter.vue";
import LayoutAside from "~/components/layoutComponents/LayoutAside.vue";
</script>

<template>
  <LayoutHeader/>
  <LayoutAside class="aside">
    <button>
      1
    </button>
    <button>
      1
    </button>
    <button>
      1
    </button>
    <button>
      1
    </button>
  </LayoutAside>
  <main class="main">
    <slot/>
  </main>
  <LayoutFooter/>
</template>

<style lang="scss" scoped>
.aside{
  position: absolute;
  @include xs-breakpoint(){
    display: none;
  }
}

.main{
  width: 100%;
  height: 100%;
}
</style>