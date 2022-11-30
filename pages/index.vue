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
      <v-card
        flat
        color="transparent"
      >
        <div
          class="mb-3"
          style="font-size: 48px; color: white;"
        >
          星に願いを
        </div>

        <v-btn
          dark
          color="purple"
          width="200"
          nuxt
          :to="{ name: 'wish' }"
        >
          お願い事をする
        </v-btn>

        <v-btn
          width="200"
          nuxt
          :to="{ name: 'wishList' }"
        >
          みんなのWishを見る
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
}
</script>
