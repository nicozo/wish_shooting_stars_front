<template>
  <v-app-bar
    app
    dark
    elevation="0"
    color="transparent"
    class="toolbar"
    @click="goTopPage"
  >
    <v-toolbar-title>
      {{ appName }}
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class HomeHeader extends Vue {
  @Prop({ type: String }) appName!: string

  goTopPage () {
    this.$router.push('/')
  }
}
</script>

<style scoped>
.toolbar{
  cursor: pointer;
}
</style>
