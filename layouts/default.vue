<template>
  <v-app>
    <home-header :app-name="appName" />

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
import Component from 'vue-class-component'
import AppFooter from '~/components/App/AppFooter.vue'
import HomeHeader from '~/components/Home/HomeHeader.vue'

@Component({
  components: {
    HomeHeader,
    AppFooter
  }
})
export default class DefaultLayout extends Vue {
  appName = this.$config.appName
}
</script>
