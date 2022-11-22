z<template>
  <div>
    judge page
    ひらがな化：{{ hiraganaResult }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class JudgePage extends Vue {
  hiraganaWish = ''
  hiraganaResult = ''

  created () {
    this.getHiragana()
    this.concatenateWish()
  }

  concatenateWish () {
    const convertedWish = JSON.parse(localStorage.convertedWish)
    const repeatTimes = 3

    this.hiraganaWish = convertedWish.repeat(repeatTimes)
    console.log('hiraganaWish', this.hiraganaWish)
  }

  getHiragana () {
    const result = JSON.parse(localStorage.result)

    this.$hiragana.apiSubmit(result).then(res => this.setHiraganaResult(res.converted))
    console.log('ひらがな化終了')
    console.log('ひらがな化結果', this.hiraganaResult)
  }

  setHiraganaResult (hiraganaSentence: string) {
    this.hiraganaResult = this.deleteWhiteSpace(hiraganaSentence)
    console.log('セット完了')
    // TODO ひらがな化される前に判定処理が発火してしまうため、処理が終了してから発火するようここに記載。
    this.judgeWish()
  }

  deleteWhiteSpace (sentence: string) {
    return sentence.replace(/\s+/g, '')
  }

  judgeWish () {
    console.log('Judge発火')
    this.matchWish(this.hiraganaWish, this.hiraganaResult)
  }

  splitWish (sentence :string) {
    const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' })

    return [...segmenter.segment(sentence)]
  }

  matchNumberOfCharacters (length1: number, length2: number) {
    return length1 === length2
  }

  matchWish (wishSentence: string, resultSentence: string) {
    const splitWishSentence = this.splitWish(wishSentence)
    const splitResultSentence = this.splitWish(resultSentence)
    console.log('splitWishSentence', splitWishSentence)
    console.log('splitResultSentence', splitResultSentence)

    const result1 = this.matchNumberOfCharacters(splitWishSentence.length, splitResultSentence.length)
    const result2 = this.compareCharacters(splitWishSentence, splitResultSentence)
  }

  compareCharacters (result1: object[], result2: object[]) {
    return result1.toString() === result2.toString()
  }
}
</script>
