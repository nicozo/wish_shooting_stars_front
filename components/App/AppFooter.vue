<template>
  <v-footer
    app
    dark
    color="transparent"
  >
    <v-row dense>
      <v-col
        cols="12"
        class="py-0"
      >
        <div class="text-center">
          &copy;2022
          <strong>{{ appName }}</strong>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class AppFooter extends Vue {
  @Prop({ type: String }) appName: string
}
</script>
