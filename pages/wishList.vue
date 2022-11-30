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
        <v-container>
          <!-- <v-card-title>
            {{ wish.title + "!" }}
          </v-card-title> -->

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ wish.title + "!" }}
              </v-list-item-title>
            </v-list-item-content>

            <div>
              {{ wish.score + '点' }}
            </div>
          </v-list-item>
        </v-container>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-pagination
        v-model="page"
        :length="pageLength"
        @input="setPageNumber"
        color="purple"
        circle
        class="mt-3"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class WishListPage extends Vue {
  page = 1
  pageSize = 7
  pageNumber = 0
  wishes = []

  get pageLength () {
    return Math.ceil(this.wishes.length / this.pageSize)
  }

  get displayWishes () {
    return this.pageNumber !== 0 ? this.wishes.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber) : this.wishes.slice(0, this.pageSize)
  }

  created () {
    this.getSuccessWishes()
  }

  async getSuccessWishes () {
    await this.$axios.$get(
      '/api/v1/wishes'
    )
      .then(res => this.setWishes(res))
      .catch(e => console.log(e))
  }

  setWishes (res: []) {
    this.wishes = res
  }

  setPageNumber (number: number) {
    this.pageNumber = number
  }
}
</script>
