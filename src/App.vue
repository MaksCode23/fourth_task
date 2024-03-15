<script>
import {useProductStore, useUserStore} from "@/store/ProductStore.js";
import {mapActions, mapState} from "pinia";

export default {
  name: 'App',
  data(){
    return{
      inline: 'undefined',
      tab: null,
    }
  },
methods:{
  ...mapActions(useProductStore,['getCategories']),
  ...mapActions(useUserStore, ['setRole']),
},
  computed:{
    ...mapState(useUserStore, ['combinate'])
  },
watch:{
 inline(newRole){
   this.setRole(newRole)
 },
  $route(to) {
   if(to.path==='/'){
     this.tab = 1
   }
   if(to.path==='/products'){
    this.tab = 2
   }
  },
},
  mounted() {
    this.getCategories()
  }
}
</script>
<template>
<v-app class="main" >
  <div class="width">
    {{combinate}}
    <v-tabs
        v-model="tab"
        align-tabs="center"
        color="deep-purple-accent-4"
    >
      <router-link  to="/" >
        <v-tab :value="1">Home</v-tab>
      </router-link>
      <router-link to="/products">
        <v-tab :value="2" >Products</v-tab>
      </router-link>
    </v-tabs>

    <v-radio-group
        v-model="inline"
        inline
    >
      <v-radio
          label="Без авторизації"
          value="undefined"
      ></v-radio>
      <v-radio
          label="Користувач"
          value="user"
      ></v-radio>

    </v-radio-group>

<router-view/>

  </div>
</v-app>

</template>

<style scoped>

.main{
  min-height: 100vh;
  width: 100%;
  margin: 0;
}
.width{
  padding: 2rem;
  text-align: center;
}
.width .select{
  max-width: 400px;
  margin: 0 auto;
}
</style>
