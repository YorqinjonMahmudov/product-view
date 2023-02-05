<template>
  <div class="child">
    <button @click="deleteFromChild"> delete from child component</button>
    <h3> being deleted name: {{ product.name_uz }}</h3>
    <h3> being deleted id: {{ product.id }}</h3>
  </div>
</template>

<script>

export default {
  name: 'ProductOne',
  props: {
    product: {}

  },
  data: function () {

  },
  methods: {
    deleteFromChild() {
      this.$parent.openDeleteModal(this.product)
    }

  }

}
</script>

<style>

.child button {
  padding: 10px 20px;
  margin-left: 20px;
  height: 50px;
  cursor: pointer;
  width: 60%;
  background-color: red;
}

.child h3 {
  margin-left: 20px;
}

</style>