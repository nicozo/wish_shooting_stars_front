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

  matchWish (wishSentence: string, resultSentence: string) {
    const splitWishSentence = this.splitWish(wishSentence)
    const splitResultSentence = this.splitWish(resultSentence)
    console.log('splitWishSentence', splitWishSentence)
    console.log('splitResultSentence', splitResultSentence)

    const result1 = this.matchNumberOfCharacters(splitWishSentence.length, splitResultSentence.length)
    const result2 = this.compareCharacters(splitWishSentence, splitResultSentence)
    const result3 = this.compareOneCharacters(splitWishSentence, splitResultSentence)
    console.log('文字数検証', result1)
    console.log('文字一致検証', result2)
    console.log('個別文字一致検証', result3)
  }

  matchNumberOfCharacters (wishSentenceLength: number, resultSentenceLength: number) {
    return wishSentenceLength === resultSentenceLength
  }

  compareCharacters (wishSentence: object[], resultSentence: object[]) {
    return wishSentence.toString() === resultSentence.toString()
  }

  compareOneCharacters (wishSentence: object[], resultSentence: object[]) {
    const result = resultSentence.map((value, index) => {
      const wishCharacter = wishSentence[index].segment
      const resultCharacter = value.segment

      return wishCharacter === resultCharacter
    })

    return result
  }
}
</script>
