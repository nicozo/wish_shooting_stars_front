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
      >
        <v-card-title>
          結果
        </v-card-title>

        点数は・・・{{ wish.score }}点です！
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
