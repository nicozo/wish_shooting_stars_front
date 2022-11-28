<template>
  <v-row
    align="center"
    justify="center"
    dense
  >
    <v-col cols="12">
      <v-card
        id="wish-result"
        flat
        dark
        style="background:rgba(0,0,0,0);"
      >
        <v-card-title
          class="justify-center mb-3"
          style="font-size: 48px;"
        >
          結果
        </v-card-title>

        <v-card-text
          class="text-center"
          style="font-size: 48px;"
        >
          点数は...{{ wish.score }}点です！
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ResultPage extends Vue {
  wish: {}

  created () {
    this.setWishObject(JSON.parse(localStorage.wish))
  }

  setWishObject (localStorageWish: object) {
    this.wish = localStorageWish
  }
}
</script>
