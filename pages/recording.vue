<template>
  <v-row
    justify="center"
    align="center"
  >
    <v-col cols="12">
      <v-card
        flat
        color="transparent"
        dark
      >
        <div v-show="isListening()">
          <v-card-title class="justify-center mb-5">
            流れ星観察中！
          </v-card-title>
        </div>
        <div v-show="!isListening()">
          <v-card-title class="justify-center mb-5">
            流れ星にWISHを３回唱えよう！
          </v-card-title>
        </div>

        <v-row justify="center">
          <v-tooltip
            left
            color="purple"
          >
            <template #activator="{ on, attrs }">
              <v-fab-transition>
                <v-btn
                  class="btnripple"
                  color="purple"
                  dark
                  fab
                  :disabled="disabled"
                  x-large
                  v-bind="attrs"
                  v-on="on"
                  @click="record"
                >
                  <div v-show="isListening()">
                    <v-icon>mdi-account-voice</v-icon>
                  </div>
                  <div v-show="!isListening()">
                    <v-icon>mdi-hands-pray</v-icon>
                  </div>
                </v-btn>
              </v-fab-transition>
            </template>
            <span>クリックで録音！</span>
          </v-tooltip>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class RecordingPage extends Vue {
  listening: boolean = false
  disabled: boolean = false
  numberOfShootingStars: number = 7
  timeout: number = 2000

  created () {
    this.initializeWebSpeechApi()
  }

  mounted () {
    this.setShootingStars()
    this.setLastShootingStar()
  }

  initializeWebSpeechApi () {
    this.$recognition.initializeApi()
  }

  startRecording () {
    const shootingStar = document.querySelector('.shooting_star')!
    shootingStar.addEventListener('animationstart', () => {
      this.$recognition.start()
    })

    this.endRecording()
  }

  endRecording () {
    const lastShootingStar = document.querySelector('.last_shooting_star')!
    lastShootingStar.addEventListener('animationend', () => {
      this.$recognition.result()
    })
  }

  record () {
    this.changeListening()
    if (this.isListening()) {
      this.changeDisabled()
      this.startShootingStarAnimation()
      this.startRecording()
    }
  }

  startShootingStarAnimation () {
    setTimeout(() => {
      const shootingStars = document.querySelectorAll('.shooting_star')!
      for (let i = 0; i < shootingStars.length; i++) {
        const dom = shootingStars[i]
        dom.classList.add('shooting_star_animation')
      }
    }, this.timeout)
  }

  createShootingStars () {
    const starrySky = document.querySelector('.starry_sky')!
    const shootingStarEl = document.createElement('span')!
    shootingStarEl.className = 'shooting_star'
    starrySky.appendChild(shootingStarEl)
  }

  setShootingStars () {
    for (let i = 0; i < this.numberOfShootingStars; i++) {
      this.createShootingStars()
    }
  }

  setLastShootingStar () {
    const shootingStarEl = document.querySelector('.shooting_star')!

    shootingStarEl.classList.add('last_shooting_star')
    console.log(shootingStarEl)
  }

  changeListening () {
    this.listening = !this.listening
  }

  isListening () {
    return this.listening === true
  }

  changeDisabled () {
    this.disabled = true
  }
}
</script>

<style>
.btnripple{
  /*波紋の基点とするためrelativeを指定*/
  position: relative;
  /*アニメーションの設定*/
  transition: all .3s;
}

/*波形を2つ設定*/
.btnripple::after {
  content: '';
  /*絶対配置で波形の位置を決める*/
  position: absolute;
  left: -25%;
  top: -25%;
  /*波形の形状*/
  border: 1px solid #9c27b0;
  width: 150%;
  height: 150%;
  border-radius: 50%;
  /*はじめは不透明*/
  /* opacity: 1; */
  /*ループするアニメーションの設定*/
  animation:1s circleanime linear infinite;
}

/*波形の2つ目は0.5秒遅らせてアニメーション*/
.btnripple::before {
  animation-delay:.5s;
}

/*波形のアニメーション*/
@keyframes circleanime{
  0%{
    transform: scale(0.68);
  }
  100%{
    transform: scale(1.2);
    opacity: 0;
  }
}

.shooting_star{
  position: absolute;
  top: 40%;
  left: 110%;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 1)  ;
}

.shooting_star_animation {
  animation: animate 3s linear forwards;
}

.shooting_star::before{
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 150px;
  height: 1px;
  background: linear-gradient(90deg, #fff, transparent);
}

@keyframes animate {
  0%
  {
    transform: rotate(315deg) translateX(0);
    opacity: 1;
  }
  70%
  {
    opacity: 1;
  }
  100%
  {
    transform: rotate(315deg) translateX(-1500px);
    opacity: 0;
  }
}

.last_shooting_star{
  top: 0;
  right: 600px;
  left: initial;
  animation-delay: 1s;
  animation-duration: 3s;
}

.shooting_star:nth-child(1){
  top: 0;
  right: 0;
  left: initial;
  animation-delay: 0;
  animation-duration: 1s;
}

.shooting_star:nth-child(2){
  top: 80px;
  right: 0px;
  left: initial;
  animation-delay: 0.4s;
  animation-duration: 1s;
}

.shooting_star:nth-child(3){
  top: 0;
  right: 180px;
  left: initial;
  animation-delay: 0.6s;
  animation-duration: 1.5s;
}

.shooting_star:nth-child(4){
  top: 0;
  right: 400px;
  left: initial;
  animation-delay: 0.8s;
  animation-duration: 2.5s;
}

.shooting_star:nth-child(5){
  top: 0;
  right: 80px;
  left: initial;
  animation-delay: 0.2s;
  animation-duration: 3s;
}

.shooting_star:nth-child(6){
  top: 300px;
  right: 0px;
  left: initial;
  animation-delay: 1s;
  animation-duration: 1s;
}
</style>
