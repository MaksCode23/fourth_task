<script>
import Product from "@/components/Product.vue";
import {mapActions, mapState} from "pinia";
import {
  usePaginationProducts,
  useProductStore,} from "@/store/ProductStore.js";

export default {
  name: "Products",
  components:{
    Product,
  },
  data(){
    return{
      page: 1,
      paginatedElements: 2,
    }
  },
  methods:{
   ...mapActions(useProductStore,['getProducts']),
    ...mapActions(usePaginationProducts, ['setPage']),
    ...mapActions(usePaginationProducts, ['setpaginateElements']),
  },
  mounted() {
    this.getProducts()
  },
  computed:{
    ...mapState(usePaginationProducts, ['paginatedProducts']),
    ...mapState(usePaginationProducts, ['pages']),
    ...mapState(usePaginationProducts, ['productLength']),


  },
  watch:{
    paginatedElements(newValue){
      this.setpaginateElements(newValue)
      if (this.page > this.pages) {
        this.page = this.pages;
      }
    },
    page(newValue){
      this.setPage(newValue)
    }
  }
}
</script>

<template>
  <v-container>
    <label>Кількість продуктів на 1 сторінці: {{paginatedElements}}</label>
    <v-slider step="1"
              show-ticks="always"
              tick-size="1"
              v-model="paginatedElements"
              :max="productLength"
              min="1"
    ></v-slider>
    <v-pagination
        v-model="page"
        :length="pages"
        rounded="circle"
    ></v-pagination>
    <v-row>
      <v-col v-for="product in paginatedProducts" :key ="product.id">
        <Product :product="product"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>