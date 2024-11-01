<script setup lang="ts">
import heroImage from "~/assets/images/index/hero/heroImage.png"
</script>

<template>
  <section class="hero">
    <div class="container">
      <img
          class="hero__image"
          :src="heroImage"
          alt="Joki Joya парк"
      >
      <div class="hero__title-container">
          <span>О</span>
          <h1 class="hero__title"> JOKI JOYA</h1>
        <div class="hero__title-stars">
          <svg v-for="item in 3" class="hero__title-star">
            <use href="~/assets/svg/sprite.svg#star" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero{
  overflow: hidden;

  &__image{
    aspect-ratio: 1216/616;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 616px;
    border-radius: 0 0 32px 32px;
    @include xs-breakpoint(){
      height: 680px;
      object-position: left;
    }
  }

  &__title{
    position: relative;
    @include font(73px, 58px, 500);
    color: var(--blue);
    @include xs-breakpoint{
      @include font(32px, 32px, 500)
    }
    &:after{
      content: "JOKI JOYA";
      color: var(--green);
      position: absolute;
      left: 6px;

    }

    &-container{
      margin-top: 42px;
      @include xs-breakpoint{
        margin-top: 32px;
      }
      display: flex;
      gap: 27px;
    }

    &-stars{
      display: flex;
      align-items: center;
      gap: 19px;
    }

    &-star{
      height: 55px;
      width: 55px;
      fill: var(--blue);
      @include xs-breakpoint{
        display: none;
        height: 24px;
        width: 24px;
        &:first-child{
          display: block;
        }
      }
    }
  }
}
</style>