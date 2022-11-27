<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class JudgePage extends Vue {
  wishObjectId = 0
  hiraganaWish = ''
  hiraganaResult = ''
  apiKey = this.$config.apiKey

  created () {
    this.setWishObject(JSON.parse(localStorage.wish))
    this.concatenateWish(JSON.parse(localStorage.convertedWish))
    this.getHiragana(JSON.parse(localStorage.result))
  }

  setWishObject (localStorageWish: { id: number }) {
    this.wishObjectId = localStorageWish.id
  }

  concatenateWish (convertedWish: string) {
    const repeatTimes = 3

    this.hiraganaWish = convertedWish.repeat(repeatTimes)
    // console.log('hiraganaWish', this.hiraganaWish)
  }

  async getHiragana (localStorageResult: string) {
    const API_URL = 'https://labs.goo.ne.jp/api/hiragana'
    const OUTPUT_TYPE = 'hiragana'
    const data = {
      app_id: this.apiKey,
      sentence: localStorageResult,
      output_type: OUTPUT_TYPE
    }
    await this.$axios.$post(
      API_URL,
      data
    )
      .then(res => this.setHiraganaResult(res.converted))
  }

  setHiraganaResult (hiraganaSentence: string) {
    this.hiraganaResult = this.deleteWhiteSpace(hiraganaSentence)
    // console.log('セット完了')
    this.judgeWish()
  }

  deleteWhiteSpace (sentence: string) {
    return sentence.replace(/\s+/g, '')
  }

  judgeWish () {
    // console.log('Judge発火')
    this.matchWish(this.hiraganaWish, this.hiraganaResult)
  }

  splitWish (sentence :string) {
    // const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' })

    // return [...segmenter.segment(sentence)]
    return [...sentence]
  }

  matchWish (wishSentence: string, resultSentence: string) {
    const splitWishSentence = this.splitWish(wishSentence)
    const splitResultSentence = this.splitWish(resultSentence)

    const result1 = this.matchNumberOfCharacters(splitWishSentence.length, splitResultSentence.length)
    const result2 = this.compareCharacters(splitWishSentence, splitResultSentence)
    const result3 = this.compareOneCharacters(splitWishSentence, splitResultSentence)
    // console.log('文字数検証', result1)
    // console.log('文字一致検証', result2)
    // console.log('個別文字一致検証', result3)
    this.calculateScore(result1, result2, result3)
  }

  matchNumberOfCharacters (wishSentenceLength: number, resultSentenceLength: number) {
    return wishSentenceLength === resultSentenceLength
  }

  compareCharacters (wishSentence: string[], resultSentence: string[]) {
    return wishSentence.toString() === resultSentence.toString()
  }

  compareOneCharacters (wishSentence: string[], resultSentence: string[]) {
    // console.log('resultSentence', resultSentence)
    const result = resultSentence.map((value, index) => {
      const wishCharacter = wishSentence[index]
      const resultCharacter = value

      return wishCharacter === resultCharacter
    })

    return result
  }

  calculateScore (result1: boolean, result2: boolean, result3: boolean[]) {
    const score1 = result1 ? 30 : 0
    const score2 = result2 ? 30 : 0
    const score3 = this.calculateScoreOfCharacters(result3)
    // console.log('score1', score1)
    // console.log('score2', score2)
    // console.log('score3', score3)

    const score = score1 + score2 + score3
    // console.log('score', score)

    this.submitScore(score)
  }

  countTrueCharacters (result3: boolean[]) {
    const isTrue = (el: boolean) => el === true
    const trueNumber = result3.filter(isTrue).length
    const result = result3.length - trueNumber
    // console.log('true数の差分', result)

    return result
  }

  calculateScoreOfCharacters (result3: boolean[]) {
    const difference = this.countTrueCharacters(result3)
    // console.log('差分', difference)
    if (difference === 0) {
      return 40
    } else if (difference < 3) {
      return 30
    } else if (difference < 6) {
      return 20
    } else if (difference < 9) {
      return 10
    } else {
      return 0
    }
  }

  async submitScore (score: number) {
    await this.$axios.$patch(
      `/api/v1/wishes/${this.wishObjectId}`,
      {
        wish: {
          score
        }
      }
    )
  }
}
</script>
