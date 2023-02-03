<template>
  <div class="head">
    <h1>
      {{ msg }}
    </h1>
    <button @click="showModalForAdd">Add New</button>
  </div>
  <br>
  <table border="1px">
    <tr>
      <th>id</th>
      <th>name</th>
      <th>cost</th>
      <th>address</th>
      <th>created_date</th>
      <th>product type</th>
      <th colspan="2">action</th>
    </tr>

    <tr v-for="product in products">
      <td> <span> {{product.id}}</span></td>
      <td><span>{{ product.name_uz }}</span></td>
      <td><span>{{ product.cost }}</span></td>
      <td><span>{{ product.address }}</span></td>
      <td><span>{{ new Date(product.created_date).toUTCString() }}</span></td>
      <td>
          <span> {{
              productTypes.find(pro => pro.id === product.product_type_id)?.name_uz
                  ? productTypes.find(pro => pro.id === product.product_type_id)?.name_uz : product.product_type_id
            }}</span>
      </td>
      <td class="action edit">
        <button v-if="product.id%2===0" @click="setCurrentProduct(product.id)" style="  background-color: yellow ">
          Edit
        </button> <button v-else @click="setCurrentProduct(product.id)" style="  background-color: green ">
          Edit
        </button>
      </td>
      <td class="action delete">
        <button @click="openDeleteModal(product)" style="background-color: red">Delete</button>
      </td>
    </tr>

  </table>

  <ProductOne :product="products[0]" />



  <div class="modal" v-if="showModal">
    <div class="registerDiv" id="registerDiv">
      <h1 v-if="currentProduct?.id"> Edit Product </h1>
      <h1 v-else>Add product</h1>
      <div id="register_form"
           class="add-request-content">

        <div class="form-item">
          <input type="text"
                 id="name_uz" name="name_uz"
                 v-model=currentProduct.name_uz
                 placeholder="uzbek name">
        </div>
        <div class="form-item">
          <label for="cost"></label>
          <input type="number"
                 id="cost" name="cost"
                 v-model=currentProduct.cost
                 placeholder="cost">
        </div>
        <div class="form-item">
          <label for="address"></label>
          <input type="text"
                 id="address" name="address"
                 v-model=currentProduct.address
                 placeholder="address">
        </div>
        <div class="form-item">
          <label for="createdAt"></label>
          <input type="datetime-local" STEP="1"
                 id="createdAt" name="createdAt"
                 v-model="created_date"
                 placeholder="createdAt">
        </div>

        <div class="form-item">

          <select v-model="selected_product_type">
            <option selected> {{ productTypes.find(pro => pro.id === currentProduct?.product_type_id)?.name_uz }}
            </option>
            <option v-for="productType in productTypes"> {{ productType.name_uz }}</option>
          </select>
        </div>


        <div class="buttons">
          <div class="cancel">
            <button @click="cancel" style="background-color: red">Cancel</button>
          </div>

          <div class="addOrEdit">
            <button v-if="currentProduct?.id" style="background-color: green"
                    @click="edit">Edit
            </button>
            <button v-else @click="add" style="background-color: green" class="btn btn-block btn-primary">Add</button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="hide" id="modalBig">
    <h3 style="margin-left: 40px">Are you sure?</h3>
    <div class="aaa" id="modal">
      <button id="no" @click="hide" style="background-color: red">NO</button>
      <button id="yes" @click="deleteProduct(currentProduct.id)" style="background-color: green">YES</button>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import store from "@/store/store";
import ProductOne from "@/views/ProductOneView.vue";

export default {
  name: 'Product',
  components: {ProductOne},
  props: {
    msg: String
  },
  data: function () {
    return {
      products: this.$store.state.products,
      productTypes: this.$store.state.productTypes,
      currentProduct: {},
      showModal: false,
      created_date: null,
      selected_product_type: {},
    }
  },
  methods: {
    setCurrentProduct(id) {
      this.currentProduct = store.state.products.find(product => product.id === id);
      const d = new Date(this.currentProduct.created_date);
      this.created_date = (new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()).slice(0, -1)
      this.selected_product_type = this.productTypes.find(pro => pro.id === this.currentProduct?.product_type_id)?.name_uz
      this.showModal = true;
      this.setProductTypes()
    },

    cancel() {
      this.showModal = false;
      this.currentProduct = {};
      store.dispatch("setProducts")
    },

    showModalForAdd() {
      this.showModal = true;
      this.currentProduct = {};
      this.setProductTypes()
    },
    add() {
      this.currentProduct.created_date = this.created_date
      this.currentProduct.product_type_id = this.productTypes.find(productType => productType.name_uz === this.selected_product_type)?.id
      console.log(this.currentProduct);
      axios.post("http://94.158.54.194:9092/api/product", this.currentProduct).then(response => {
        console.log(response);
        if (response.status === 200) {
          this.showModal = false;
          store.dispatch('setProducts')
          this.currentProduct = {}
          this.created_date = {}
          this.selected_product_type = {}
        }
      }).catch(error => console.log(error))
    },

    setProductTypes() {
      store.dispatch("setProductTypes");
      this.productTypes = store.state.productTypes;
    },
    edit() {
      this.currentProduct.created_date = this.created_date
      this.currentProduct.product_type_id = this.productTypes.find(productType => productType.name_uz === this.selected_product_type)?.id
      axios.put("http://94.158.54.194:9092/api/product", this.currentProduct)
          .then(response => {
            if (response.status === 200) {
              this.showModal = false;
              store.dispatch('setProducts')
              this.currentProduct = {}
            }
          }).catch(error => console.log(error))
    },
    deleteProduct(id) {
      axios.delete("http://94.158.54.194:9092/api/product/" + id).then(() => {
        store.dispatch('setProducts')
        this.currentProduct = {}
        document.getElementById("modalBig").className = "hide";
      }).catch(error => console.log(error))
    },
    openDeleteModal(product) {
      this.currentProduct = product
      document.getElementById("modalBig").className = "open"

    },
    hide() {
      this.currentProduct = {}
      document.getElementById("modalBig").className = "hide";
    }
  },
  computed: {
    products() {
      return store.state.products;
    },
    productTypes() {
      return store.state.productTypes;
    }
  },
  async setup() {
    await store.dispatch('setProducts')
    await store.dispatch("setProductTypes");

  }
}


</script>

<style>

template {
  display: flex;
  flex-direction: column;
}

.modal {
  position: absolute;
  background: #ffffff;
  padding: 60px;
  border-radius: 10px;
  width: 400px;
  scale: 1.5;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  left: 36%;
  top: 20%;
  box-shadow: 5px 5px 10px #000;
}


input {
  margin-top: 10px;
  padding: 2px 10px;
  width: 100%;
}


table {
  width: 50%;
  border-collapse: collapse;
  margin-top: 30px;
  backdrop-filter: blur(10px);
}

th, td {
  padding: 30px;
}

.buttons {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;

}

.buttons button {
  width: 90px;
  height: 30px;
  cursor: pointer;
}

tr button {
  padding: 5px;
}

select {
  padding: 2px 10px;
  width: 100%;
  margin-top: 10px;
}

.head {
  display: flex;
}

.head button {
  background-color: #00bd7e;
  margin: 10px 0 0 50px;
  width: 20%;
}

td select {
  width: 150%;
  margin-left: -12px;
}

.hide {
  width: 0;
  height: 0;
  overflow: hidden;
}

.open {
  position: absolute;
  top: 30vh;
  left: 85vh;
  width: 300px;
  height: 200px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.open button {
  padding: 5px 10px;
  margin-top: 10px;
  margin-left: 60px;
  justify-content: space-between;
}

</style>
