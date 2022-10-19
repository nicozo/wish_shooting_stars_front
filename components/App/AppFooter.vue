<template>
  <v-footer app>
    <v-row dense>
      <v-col
        cols="12"
        class="py-0"
      >
        <div class="text-center">
          &copy;2022
          <strong />
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AppFooter extends Vue {
}
</script>
