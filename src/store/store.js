import Vuex from "vuex"
import axios from "axios";

export default new Vuex.Store({
    state: {
        todos: [],
        products: [],
        newTodo: "",
        count: 0
    },
    mutations: {
        GET_PRODUCTS(state, products) {
            console.log(state.products);
            state.products = products
            console.log(state.products);

        },
        GET_TODO(state, todo) {
            state.newTodo = todo
        },
        ADD_TODO(state) {
            state.todos.push({
                body: state.newTodo,
                completed: false
            })
        },
        EDIT_TODO(state, todo) {
            var todos = state.todos
            todos.splice(todos.indexOf(todo), 1)
            state.todos = todos
            state.newTodo = todo.body
        },
        REMOVE_TODO(state, todo) {
            var todos = state.todos
            todos.splice(todos.indexOf(todo), 1)
        },
        COMPLETE_TODO(state, todo) {
            todo.completed = !todo.completed
        },
        CLEAR_TODO(state) {
            state.newTodo = ''
        }
    },
    actions: {
        setProducts({commit}) {
            axios.get("http://94.158.54.194:9092/api/product").then(response => {
                console.log(response.data);
                commit("GET_PRODUCTS",response.data)
            })

        },
        getTodo({commit}, todo) {
            commit("GET_TODO", todo)
        },
        addTodo({commit}) {
            commit("ADD_TODO")
        },
        editTodo({commit}, todo) {
            commit("EDIT_TODO", todo)
        },
        removeTodo({commit}, todo) {
            commit("REMOVE_TODO", todo)
        },
        completeTodo({commit}, todo) {
            commit("COMPLETE_TODO", todo)
        },
        clearTodo({commit}) {
            commit("CLEAR_TODO")
        }
    }
})