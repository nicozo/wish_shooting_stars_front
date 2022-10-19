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
        dark
        color="purple"
        nuxt
        :to="{ name: 'wish' }"
      >
        お願い事をする
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
}
</script>
