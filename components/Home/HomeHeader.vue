<template>
  <v-app-bar
    app
  >
    <v-toolbar-title>
      星に願いを
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'HomeHeader',
  props: {
    appName: {
      type: String
    }
  }
})
</script>
