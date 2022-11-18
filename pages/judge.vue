z<template>
  <div>
    judge page
    ひらがな化：{{ convertedResult }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class JudgePage extends Vue {
  concatenatedWish = ''
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

  deleteWhiteSpace (sentence: string) {
    return sentence.replace(/\s+/g, '')
  }

  judgeWish () {
    console.log('Judge発火')
    this.concatenateWish()
    this.matchNumberOfCharacters(this.concatenatedWish, this.convertedResult)
  }

  concatenateWish () {
    const convertedWish = JSON.parse(localStorage.convertedWish)

    this.concatenatedWish = convertedWish.repeat(3)
    console.log('concatenatedWish', this.concatenatedWish)
  }

  countCharacters (sentence :string) {
    const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" })

    console.log([...segmenter.segment(sentence)])
    return [...segmenter.segment(sentence)].length
  }

  matchNumberOfCharacters (wishSentence: string, resultSentence: string) {
    const result1 = this.countCharacters(wishSentence)
    const result2 = this.countCharacters(resultSentence)

    console.log(result1 === result2)
    return result1 === result2
  }
}
</script>
