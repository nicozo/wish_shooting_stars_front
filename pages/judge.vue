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
    console.log('ひらがな化結果', this.convertedResult)
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
    this.matchWish(this.concatenatedWish, this.convertedResult)
  }

  concatenateWish () {
    const convertedWish = JSON.parse(localStorage.convertedWish)

    this.concatenatedWish = convertedWish.repeat(3)
    console.log('concatenatedWish', this.concatenatedWish)
  }

  splitWish (sentence :string) {
    const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' })

    return [...segmenter.segment(sentence)]
  }

  matchNumberOfCharacters (length1: number, length2: number) {
    // console.log('length1', length1)
    // console.log('length2', length2)
    // console.log(length1 === length2)
    return length1 === length2
  }

  matchWish (wishSentence: string, resultSentence: string) {
    const result1 = this.splitWish(wishSentence)
    const result2 = this.splitWish(resultSentence)
    console.log('result1', result1)
    console.log('result2', result2)

    this.matchNumberOfCharacters(result1.length, result2.length)
    this.compareCharacters(result1, result2)
  }

  // compareCharacters (result1: object[], result2: object[]) {
  //   result1.forEach(word => {
  //     console.log('word1', word)
  //     const result1Word = word
  //   })
  //   result2.forEach(word => {
  //     console.log('word2', word)
  //     const result2Word = word
  //   })
  // }

  compareCharacters (result1: object[], result2: object[]) {
    const result = result1.toString() === result2.toString()
    console.log(result)
  }
}
</script>
