<template lang="pug">
  
  #splash-screen
    #ready-player-one
      .splash-screen-title Ready Player One
      .ready-button(@click="advanceGamePhase()") I am ready!
    #ready-player-two
      .splash-screen-title Ready Player Two
      .ready-button(@click="setShipType('big'), advanceGamePhase()") I am ready!
    #game-menu
      .splash-screen-title 10 кораблей!
      .new-game-button(@click="advanceGamePhase()") Погнали!

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
/* Splash Screen */
$size-vertical: 95vh
$vh-unit: $size-vertical / 100
$vw-unit: $size-vertical / 100 * 1.333

#game-menu,
#ready-player-one,
#ready-player-two
  position: absolute
  z-index: 50
  width: $vw-unit * 100
  height: 100vh
  top: -100vh

  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background: #fff url('../assets/bg-ready.svg') no-repeat 50% 50% / auto 100%
  padding: $vw-unit * 10

  transition: all 0.35s linear
  transition-delay: 0.25s

#game-menu
  top: 0
  transition: top 1.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)
  transition-delay: 0.35s
  background: #fff url('../assets/bg-menu.jpg') no-repeat 50% 50% / cover

#app:not(.gameMenu) #game-menu
  top: -100vh

.readyPlayerOne #ready-player-one,
.readyPlayerTwo #ready-player-two
  top: 0

.splash-screen-title
  padding: $vw-unit * 1 $vw-unit * 2
  margin-bottom: $vw-unit * 4
  font-size: $vw-unit * 6
  font-weight: bold
  background-color: rgba(255,255,255,0.8)

.ready-button,
.new-game-button
  display: inline-block
  width: $vw-unit * 28
  padding: $vw-unit * 1.5 $vw-unit * 2
  background-color: #fff
  border: 3px solid #8f673b
  border-radius: 12px
  font-size: $vw-unit * 4
  font-weight: bold
  text-align: center
  cursor: pointer

</style>
