<template>
  <v-app>
    <home-header :app-name="appName" />

    <div class="starry_sky" />

    <v-main>
      <v-container fill-height>
        <Nuxt />
      </v-container>
    </v-main>

    <app-footer :app-name="appName" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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
  numberOfStars = 800
  numberOfShootingStars = 7

  mounted () {
    this.ignitionStarrySkyAnimation()
  }

  ignitionStarrySkyAnimation () {
    for (let i = 0; i < this.numberOfStars; i++) {
      this.createStars()
    }
  }

  createStars () {
    const starrySky = document.querySelector('.starry_sky')!
    const starEl = document.createElement('span')!
    starEl.className = 'star'

    const minSize = 1
    const maxSize = 2
    const size = Math.random() * (maxSize - minSize) + minSize
    starEl.style.width = `${size}px`
    starEl.style.height = `${size}px`
    starEl.style.left = `${Math.random() * 100}%`
    starEl.style.top = `${Math.random() * 100}%`
    starEl.style.animationDelay = `${Math.random() * 10}s`
    starrySky.appendChild(starEl)
  }
}
</script>

<style>
div{
  font-family: 'Yomogi', cursive;
}
.starry_sky{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(0deg, #4300de, #451189, #080f1c);
  background-position-x: center;
  background-size: cover;
  overflow: hidden;
}

.star {
  position: absolute;
  display: block;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 4px 2px rgba(#fff, 0.2);
  opacity: 0;
  animation: twinkle 5s infinite;
}

@keyframes twinkle {
  0% {
    opacity: 0;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
