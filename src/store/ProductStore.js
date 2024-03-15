import {defineStore} from "pinia";
import axiosInstance from "../../services/axios.js";
export const useProductStore = defineStore( "product",{
    state:() => ({
        productsState: [],
        categoriesState: [],
    }),
    getters:{
        products: (state)=> state.productsState,
        categories: (state) => state.categoriesState,

    },
    actions:{
        getProducts(){
            axiosInstance.get('/products')
                .then(response => {
                    this.productsState = response.data;
                })
        },
        getCategories(){
            axiosInstance.get('products/categories')
                .then(response => {
                    this.categoriesState = response.data;
                })
        }
    }
})
export const useUserStore = defineStore( "user",{
    state:() => ({
      role: 'undefined'
    }),
    getters:{
        isUser(state) {
            return state.role === 'user'
        },
        combinate(state){
            const u = useProductStore()
            return 'Виклик useProductStore categories з useUserStore user: '
                + state.role + ' categories: '
                + u.categories.join(', ')
        }
    },
    actions:{
        setRole(value){
            this.role = value
        }
    },
})
export const usePaginationProducts = defineStore( "pagination",{
    state:() => ({
        page: 1,
        paginatedElements: 2,
    }),
    getters: {
        paginatedProducts: (state) =>
            useProductStore().products.slice(
                (state.page - 1) * state.paginatedElements,
                (state.page - 1) * state.paginatedElements + state.paginatedElements),
        pages: (state) =>
        Math.ceil(useProductStore().products.length / state.paginatedElements),
        productLength: () => useProductStore().products.length
    },
    actions:{
        setPage(value){
            this.page = value
        },
        setpaginateElements(value){
            this.paginatedElements = value
        }
    },
})
