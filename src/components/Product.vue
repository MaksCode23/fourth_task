<script>
export default {
  name: "Product",
  props: {
    product: Object
  },
  data() {
    return {
      show: false,
    }
  }
}
</script>

<template>
  <v-card
      color="indigo"
      variant="tonal"
      class="mx-auto"
      max-width="200"
  >
    <v-img
        class="align-end text-white"
        height="200"
        :src="product.image"
    >

    </v-img>

    <v-card-title>
      {{ product.title }}
    </v-card-title>
    <v-card-subtitle class="pt-4">
      {{ product.category }}
    </v-card-subtitle>

    <v-card-text>

      <h3>Rating: {{ product.rating.rate }} </h3>

    </v-card-text>

    <v-card-actions>
      <v-btn
          color="orange-lighten-2"
          variant="text"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <h2>{{ product.title }}</h2>
          {{ product.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>

</style>