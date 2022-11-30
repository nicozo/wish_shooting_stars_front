<template>
  <v-row
    align="center"
    justify="center"
    dense
  >
    <v-col cols="12">
      <v-card
        id="wish-form"
        flat
        dark
        style="background:rgba(0,0,0,0.3);"
      >
        <v-card-title>
          願い事を一つ決めよう！
        </v-card-title>

        <validation-observer v-slot="{ invalid }">
          <form>
            <v-container>
              <validation-provider
                v-slot="{ errors }"
                name="願い事"
                rules="required|max:15|wish"
              >
                <v-text-field
                  v-model="wish"
                  label="願い事"
                  placeholder="恋人ができますように"
                  counter="15"
                  :error-messages="errors"
                  hint="語尾が「ように」「欲しい」「ください」のいずれかになるように入力してください"
                  persistent-hint
                  required
                  color="purple"
                />
              </validation-provider>

              <v-btn
                block
                color="purple"
                class="py-6 mt-3"
                :disabled="invalid"
                :loading="loading"
                @click="decide"
              >
                決定する
              </v-btn>
            </v-container>
          </form>
        </validation-observer>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class WishPage extends Vue {
  wish = ''
  apiKey = this.$config.apiKey
  loading = false

  created () {
    this.deleteLocalStorage()
  }

  deleteLocalStorage () {
    localStorage.removeItem('wish')
    localStorage.removeItem('result')
    localStorage.removeItem('convertedWish')
  }

  async decide () {
    await this.wishSubmit()
  }

  async wishSubmit () {
    this.isLoading()

    await this.$axios.$post(
      '/api/v1/wishes',
      {
        wish: {
          title: this.wish
        }
      }
    )
      .then(res => this.submitSuccessful(res))
      .catch(e => console.log(e))
  }

  submitSuccessful (res: { title: string }) {
    this.setWishInLocalStorage(res)
    this.getHiragana(res.title)
    // this.$router.push('/recording')
  }

  setWishInLocalStorage (res: object) {
    localStorage.setItem('wish', JSON.stringify(res))
  }

  setHiraganaInLocalStorage (sentence: string) {
    const str = this.deleteWhiteSpace(sentence)

    localStorage.setItem('convertedWish', JSON.stringify(str))
    // TODO 遷移後に流れ星アニメーションが正常に動作しないため一旦下記の方法で画面遷移
    window.location.href = '/recording'
  }

  deleteWhiteSpace (sentence: string) {
    return sentence.replace(/\s+/g, '')
  }

  async getHiragana (sentence: string) {
    const API_URL = 'https://labs.goo.ne.jp/api/hiragana'
    const OUTPUT_TYPE = 'hiragana'
    const data = {
      app_id: this.apiKey,
      sentence,
      output_type: OUTPUT_TYPE
    }
    await this.$axios.$post(
      API_URL,
      data
    )
      .then(res => this.setHiraganaInLocalStorage(res.converted))
  }

  isLoading () {
    this.loading = true
  }
}
</script>
