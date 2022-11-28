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
          判定結果
        </v-card-title>

        <v-card-text
          class="text-center"
          style="font-size: 48px;"
        >
          スコアは...{{ wish.score }}点です！
        </v-card-text>

        <div v-show="wish.score === 100">
          <v-card-text
            class="text-center"
            style="font-size: 16px;"
          >
            おめでとう！流れ星はあなたの願い事を聞き取れたよ！
          </v-card-text>
        </div>

        <div v-show="wish.score >= 51 && wish.score <= 90">
          <v-card-text
            class="text-center"
            style="font-size: 16px;"
          >
            惜しい！ほとんど正確に願い事を唱えれたよ！
          </v-card-text>
        </div>

        <div v-show="wish.score <= 50">
          <v-card-text
            class="text-center"
            style="font-size: 16px;"
          >
            頑張ろう！再チャレンジ待ってるよ！
          </v-card-text>
        </div>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      align="center"
    >
      <v-btn
        dark
        color="#1d9bf0"
        width="250"
        @click="twitterShare"
      >
        <v-icon left>
          mdi-twitter
        </v-icon>
        Twitterで共有
      </v-btn>
    </v-col>

    <v-col
      cols="12"
      align="center"
    >
      <v-btn
        dark
        color="purple"
        width="250"
      >
        願い事一覧へ
      </v-btn>
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

  twitterShare () {
    const shareURL =
      'https://twitter.com/intent/tweet?text=' +
      '願い事をしたよ！' +
      '%0Ahttp://localhost:8080/wish' +
      '%20%23星に願いを'

    location.href = shareURL
  }
}
</script>
