import { Plugin, Context } from '@nuxt/types'

class Hiragana {
  $axios: object
  apiKey: string

  constructor (ctx: Context) {
    this.$axios = ctx.$axios
    this.apiKey = ctx.$config.apiKey
  }

  async apiSubmit (sentence: string) {
    const APIURL = 'https://labs.goo.ne.jp/api/hiragana'
    const OUTPUT_TYPE = 'hiragana'
    const data = {
      app_id: this.apiKey,
      sentence,
      output_type: OUTPUT_TYPE
    }

    return await this.$axios.$post(
      APIURL,
      data
    )
  }
}

const hiragana: Plugin = (context: Context, inject) => {
  inject('hiragana', new Hiragana(context))
}

export default hiragana
