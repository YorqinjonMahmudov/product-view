<script setup></script>


{{console.log(this.$store.state.count)}}}
<template>
  <!--  <main>-->
  <!--    <TheWelcome />-->
  <!--  </main>-->
  <div>
    <!--    {{ this.$store.state.products}}-->
    <!--    {{ this.$store.state.counter}}-->
  </div>
  <p> {{ this.$store.state.count }}</p>
  <button @click="this.$store.dispatch('setProducts')"> get products</button>
</template>
