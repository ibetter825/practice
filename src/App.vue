<template>
  <section class="content">
    <transition name="fade">
      <router-view keep-alive></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  @import "./assets/css/style.css";
</style>