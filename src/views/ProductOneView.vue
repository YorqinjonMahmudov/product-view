<template>
<h1>{{ product}}</h1>
<button @click="deleteFromChild"> delete</button>
</template>

<script>

export default {
  name: 'ProductOne',
  props:{
    product:{}

  },
  data: function () {

  },
  methods: {
    deleteFromChild(){
      this.$parent.openDeleteModal(this.product)
    }

  }

}
</script>