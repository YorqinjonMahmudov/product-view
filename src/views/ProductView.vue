<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="pr">
<!--    {{ $store.state.products}}-->
<!--    {{ $store.state.counter}}-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product'
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
