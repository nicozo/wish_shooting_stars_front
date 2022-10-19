<template>
  <v-row
    align="center"
    justify="center"
    dense
  >
    <v-col cols="12">
      <v-card id="wish-form">
        <v-card-title>
          願い事を一つ決めよう！
        </v-card-title>

        <form @submit.prevent="decide">
          <v-container>
            <v-text-field
              v-model="wish"
              label="願い事"
              placeholder="恋人ができますように"
              required
              color="purple"
            />

            <v-btn
              dark
              block
              color="purple"
              class="py-6"
            >
              決定する
            </v-btn>
          </v-container>
        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class WishPage extends Vue {
}
</script>
