class Hiragana {
  constructor (ctx) {
    this.$axios = ctx.$axios
    this.apiKey = ctx.$config.apiKey
  }

  async apiSubmit (sentence) {
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

export default ({ $axios, $config }, inject) => {
  inject('hiragana', new Hiragana({ $axios, $config }))
}
