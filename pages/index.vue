<template>
  <v-row
    align="center"
    justify="center"
    dense
  >
    <v-col
      cols="12"
      class="text-center"
    >
      <div class="text-h3 mb-3">
        星に願いを
      </div>

      <v-btn
        color="purple"
        nuxt
        to="/"
      >
        お願い事をする
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>
