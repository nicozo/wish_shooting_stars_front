<template>
  <v-row
    align="center"
    justify="center"
    dense
  >
    <v-col cols="12">
      <div
        style="font-size: 48px; color: white;"
        class="text-center"
      >
        みんなのWISH
      </div>
    </v-col>

    <v-col
      cols="12"
      align="center"
    >
      <v-btn
        class="mb-3"
        nuxt
        :to="{ name: 'index' }"
      >
        ホームへ戻る
      </v-btn>
    </v-col>

    <template v-if="loading">
      <v-progress-circular
        indeterminate
        color="purple"
      />

      <p style="color: white;">
        取得中...
      </p>
    </template>

    <template v-else>
      <v-col
        v-for="(wish, i) in displayWishes"
        :key="i"
        cols="12"
        align="center"
      >
        <v-card
          :id="`wish-${wish.id}`"
          rounded-xl
          flat
          dark
          style="background:rgba(0,0,0,0.3);"
          max-width="800"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ wish.title + "!" }}
              </v-list-item-title>
            </v-list-item-content>

            <div class="mr-3">
              {{ wish.score + '点' }}
            </div>

            <v-icon
              id="likeButton"
              class="mr-3"
              color="yellow"
              :disabled="alreadyLiked(wish.id)"
              @click="like(wish.id)"
            >
              mdi-star
            </v-icon>

            <div>
              {{ wish.likes_count }}いいね
            </div>
          </v-list-item>
        </v-card>
      </v-col>
    </template>

    <v-col cols="12">
      <v-pagination
        v-model="page"
        :length="pageLength"
        color="purple"
        circle
        class="mt-3"
        @input="setPageNumber"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import $cookies from 'cookie-universal-nuxt'

@Component
export default class WishListPage extends Vue {
  page = 1
  pageSize = 8
  pageNumber = 0
  wishes = []
  loading = false
  wishIds = []

  get pageLength () {
    return Math.ceil(this.wishes.length / this.pageSize)
  }

  get displayWishes () {
    return this.pageNumber !== 0 ? this.wishes.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber) : this.wishes.slice(0, this.pageSize)
  }

  get alreadyLiked () {
    return (wishId: number) => {
      const result = this.wishIds.includes(wishId)

      return result
    }
  }

  created () {
    this.getSuccessWishes()
    this.getCookie()
  }

  getCookie () {
    const arr = this.$cookies.get('like_wish_id').split(',')
    this.wishIds = arr.map(Number)
  }

  async getSuccessWishes () {
    this.toggleLoading()

    await this.$axios.$get(
      '/api/v1/wishes'
    )
      .then(res => this.setWishes(res))
      .catch(e => console.log(e))
  }

  setWishes (res: []) {
    this.wishes = res
    this.toggleLoading()
  }

  setPageNumber (number: number) {
    this.pageNumber = number
  }

  toggleLoading () {
    this.loading = !this.loading
  }

  async like (wishId: number) {
    await this.$axios.$post(
      '/api/v1/likes',
      {
        like: {
          wish_id: wishId
        }
      }
    )
  }
}
</script>
