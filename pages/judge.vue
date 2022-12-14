<template>
  <v-row
    align="center"
    justify="center"
    dense
  >
    <v-col cols="12">
      <v-card
        id="wish-result"
        flat
        dark
        style="background:rgba(0,0,0,0)"
      >
        <div class="text-center text-h3 font-weight-bold">
          判定中...
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class JudgePage extends Vue {
  wishObjectId = 0
  hiraganaWish = ''
  hiraganaResult = ''
  apiKey = this.$config.apiKey

  created () {
    this.setWishId(JSON.parse(localStorage.wish))
    this.concatenateWish(JSON.parse(localStorage.convertedWish))
    this.getHiragana(JSON.parse(localStorage.result))
  }

  setWishId (localStorageWish: { id: number }) {
    this.wishObjectId = localStorageWish.id
  }

  concatenateWish (convertedWish: string) {
    const repeatTimes = 3

    this.hiraganaWish = convertedWish.repeat(repeatTimes)
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
      .catch(e => this.finishJudge(e))
  }

  finishJudge (e: {}) {
    if (typeof e !== 'undefined') {
      const score = 0

      this.submitScore(score)
    }
  }

  setHiraganaResult (hiraganaSentence: string) {
    this.hiraganaResult = this.deleteWhiteSpace(hiraganaSentence)
    this.judgeWish()
  }

  deleteWhiteSpace (sentence: string) {
    return sentence.replace(/\s+/g, '')
  }

  judgeWish () {
    this.matchWish(this.hiraganaWish, this.hiraganaResult)
  }

  splitWish (sentence :string) {
    return [...sentence]
  }

  matchWish (wishSentence: string, resultSentence: string) {
    const splitWishSentence = this.splitWish(wishSentence)
    const splitResultSentence = this.splitWish(resultSentence)
    const result1 = this.matchNumberOfCharacters(splitWishSentence.length, splitResultSentence.length)
    const result2 = this.compareCharacters(splitWishSentence, splitResultSentence)
    const result3 = this.compareOneCharacters(splitWishSentence, splitResultSentence)

    this.calculateScore(result1, result2, result3)
  }

  matchNumberOfCharacters (wishSentenceLength: number, resultSentenceLength: number) {
    return wishSentenceLength === resultSentenceLength
  }

  compareCharacters (wishSentence: string[], resultSentence: string[]) {
    return wishSentence.toString() === resultSentence.toString()
  }

  compareOneCharacters (wishSentence: string[], resultSentence: string[]) {
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
    const totalScore = score1 + score2 + score3

    this.submitScore(totalScore)
  }

  countTrueCharacters (result3: boolean[]) {
    const isTrue = (el: boolean) => el === true
    const trueNumber = result3.filter(isTrue).length
    const result = result3.length - trueNumber

    return result
  }

  calculateScoreOfCharacters (result3: boolean[]) {
    const difference = this.countTrueCharacters(result3)

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

  async submitScore (totalScore: number) {
    await this.$axios.$patch(
      `/api/v1/wishes/${this.wishObjectId}`,
      {
        wish: {
          score: totalScore
        }
      }
    )
      .then(res => this.updateWishInLocalStorage(res))
  }

  updateWishInLocalStorage (res: object) {
    localStorage.setItem('wish', JSON.stringify(res))
    this.$router.push('/result')
  }
}
</script>
