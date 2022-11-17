z<template>
  <div>
    judge page
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class JudgePage extends Vue {
  convertedResult = ''
  keyword = ''
  endingWords = [
    'ように',
    'ほしい',
    'ください'
  ]

  created () {
    this.getHiragana()
  }

  getHiragana () {
    const result = JSON.parse(localStorage.result)

    this.$hiragana.apiSubmit(result).then(res => this.setConvertedResult(res.converted))
    console.log('ひらがな化終了')
  }

  setConvertedResult (sentence: string) {
    const str = this.deleteWhiteSpace(sentence)

    this.convertedResult = str
    console.log('セット完了')
    // TODO ひらがな化される前に判定処理が発火してしまうため、処理が終了してから発火するようここに記載。
    this.judgeWish()
  }

  judgeWish () {
    console.log('Judge発火')
    this.checkEndingWord()
  }

  deleteWhiteSpace (sentence: string) {
    return sentence.replace(/\s+/g, '')
  }

  checkEndingWord () {
    for (let i = 0; i < this.endingWords.length; i++) {
      const word = this.endingWords[i]
      const regex = new RegExp(word)

      // console.log(regex.test(this.convertedResult))
      if (regex.test(this.convertedResult)) {
        // console.log('word', word)
        this.keyword = word
      }
    }
  }
}
</script>
