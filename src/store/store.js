import Vuex from "vuex"
import axios from "axios";

export default new Vuex.Store({
    state: {
        products: [],
        productTypes: []
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
            console.log(state.products);
        },
        SET_PRODUCT_TYPES(state, productTypes) {
            state.productTypes = productTypes
            console.log(state.productTypes);
        },

    },
    actions: {
        setProducts({commit}) {
            axios.get("http://94.158.54.194:9092/api/product").then(response => {
                commit("SET_PRODUCTS", response.data)
            })
        },
        setProductTypes({commit}) {
            axios.get("http://94.158.54.194:9092/api/product/get-product-types").then(response => {
                commit("SET_PRODUCT_TYPES", response.data)
            })
        }

    }
})