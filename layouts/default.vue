<template>
  <v-app>
    <home-header :app-name="appName"/>

    <v-main>
      <v-container fill-height>
        <Nuxt />
      </v-container>
    </v-main>

    <app-footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppFooter from '~/components/App/AppFooter.vue'
import HomeHeader from '~/components/Home/HomeHeader.vue'

export default Vue.extend({
  components: { HomeHeader, AppFooter },
  name: 'DefaultLayout',
  data () {
    return {
      appName: this.$config.appName
    }
  }
})
</script>
