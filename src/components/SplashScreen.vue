<template lang="pug">
  
  #splash-screen
    #ready-player-one
      .splash-screen-title 
        span {{ this.getOpponentName }}
        | , готовься к бою! Враг не дремлет...
      .ready-button(@click="advanceGamePhase()") 1к чертей!
    #ready-player-two
      .splash-screen-title 
        span {{ this.getOpponentName }}
        | , они оскорбили твою бороду!
        br
        | Отмой позор кровью!
      .ready-button(@click="setShipType('big'), advanceGamePhase()") Яррр!
    #game-menu
      .new-game-button(@click="advanceGamePhase()") Готовь пушки!
    #settings-menu(:class="{ show: this.getSettingsVisibility }")
      | Настроечки

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'SplashScreen',
  props: {
    player: String,
  },

  computed: {
    ...mapGetters([
      'getCurrentPlayer',
      'getOpponentName',
      'getSettingsVisibility',
    ]),

  },

  methods: {
    ...mapActions([
      'advanceGamePhase',
    ]),
    ...mapMutations([
      'setShipType',
    ]),

  }

}
</script>

<style lang="sass">
@import '../sass/reset.sass';

@font-face
  font-family: 'Guerilla'
  src: url('../assets/fonts/Guerilla.eot?#iefix') format('embedded-opentype'), url('../assets/fonts/Guerilla.woff') format('woff'), url('../assets/fonts/Guerilla.ttf') format('truetype'), url('../assets/fonts/Guerilla.svg#Guerilla') format('svg')
  font-weight: normal
  font-style: normal

/* Splash Screen */
$size-vertical: 100vh
$vh-unit: $size-vertical / 100
$vw-unit: $size-vertical / 100 * 1.333

#splash-screen
  display: flex
  width: 100%
  height: 100%
  justify-content: center
  align-items: center

#game-menu,
#ready-player-one,
#ready-player-two
  position: absolute
  z-index: 50
  width: $vw-unit * 100
  height: $size-vertical
  top: -$size-vertical

  align-items: center
  background: #fff url('../assets/bg-ready.svg') no-repeat 50% 50% / auto 100%

  transition: all 0.35s linear
  transition-delay: 0.25s

#ready-player-one,
#ready-player-two
  display: flex
  flex-direction: column
  justify-content: center

#game-menu
  top: 0
  transition: top 1.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)
  transition-delay: 0.35s
  background: #fff url('../assets/bg-menu.jpg') no-repeat 50% 50% / cover

#app:not(.gameMenu) #game-menu
  top: -$size-vertical

.readyPlayerOne #ready-player-one,
.readyPlayerTwo #ready-player-two
  top: 0

.splash-screen-title
  padding: $vw-unit * 1 $vw-unit * 2
  margin-bottom: $vw-unit * 4
  color: #422b18
  font-size: $vw-unit * 6
  font-weight: bold
  background-color: rgba(255,255,255,0.8)

  span
    color: #881e1e

.goPlayerTwo #ready-player-two *,
.goPlayerOne #ready-player-one *
  opacity: 0

.ready-button
  display: inline-block
  width: $vw-unit * 28
  padding: $vw-unit * 1.25 $vw-unit * 1.5
  background-color: #fff
  border: 3px solid #8f673b
  border-radius: 12px
  color: #422b18
  font-size: $vw-unit * 4
  font-weight: bold
  text-align: center
  cursor: pointer
  transition: all 0.25s linear

.ready-button:hover
  background-color: #d9cab9

.new-game-button
  position: absolute
  display: inline-block
  text-align: center
  border-radius: 12px
  top: $vh-unit * 54
  left: $vw-unit * 6
  padding: $vw-unit * 1 $vw-unit * 2.5 $vw-unit * 1.25
  color: #69413d
  background-color: rgba(255,255,255,0.75)
  border: 5px solid #be938d
  font-size: $vw-unit * 4.75
  cursor: pointer
  
.new-game-button:hover
  color: rgba(255,255,255,0.75)
  background-color: #69413d

#settings-menu
  position: relative
  z-index: 5
  width: 60%
  height: 40%
  top: -100vh
  padding: 2.5%
  background-color: #fff
  box-shadow: 0 0 1.5rem rgba(95,50,10,.15)
  transition: top 0.45s cubic-bezier(0.68, -0.55, 0.265, 1.55)

#settings-menu.show
  top: 0
  
</style>
