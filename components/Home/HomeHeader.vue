<template>
  <v-app-bar app>
    <v-toolbar-title>
      {{ appName }}
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class HomeHeader extends Vue {
  @Prop({ type: String }) appName: string
}
</script>
