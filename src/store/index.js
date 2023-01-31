// import {createStore} from "vuex";
// import axios from "axios";
//
// // const resourseUrl= "http://94.158.54.194:9092/api/product";
// export default createStore({
//
//     state: {
//         products: [],
//         counter: 0
//     },
//     mutations: {
//         addProduct(state, product) {
//             state.products.push(product)
//         },
//
//         setProducts(state, products) {
//             state.products = products;
//         }
//     },
//     actions: {
//         setProducts() {
//             axios.get("http://94.158.54.194:9092/api/product").then(response => console.log(response))
//         }
//     },
//     modules: {},
//     getters: {}
// })