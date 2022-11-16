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
  apiKey = ''

  created () {
    this.setApiKey()
  }

  setApiKey () {
    this.apiKey = this.$config.apiKey
  }

  async decide () {
    await this.wishSubmit()
  }

  async wishSubmit () {
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

  submitSuccessful (res: object) {
    localStorage.setItem('wish', JSON.stringify(res))
    this.apiSubmit(res.title)
    this.$router.push('/recording')
  }

  async apiSubmit (sentence: string) {
    const APIURL = 'https://labs.goo.ne.jp/api/hiragana'
    const OUTPUT_TYPE = 'hiragana'
    const data = {
      app_id: this.apiKey,
      sentence,
      output_type: OUTPUT_TYPE
    }

    await this.$axios.$post(
      APIURL,
      data
    )
      .then(res => this.setHiragana(res.converted))
      .catch(e => console.log(e))
  }

  setHiragana (sentence: string) {
    localStorage.setItem('convertedWish', JSON.stringify(sentence))
  }
}
</script>
