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
/* Splash Screen */
#game-menu,
#ready-player-one,
#ready-player-two
  position: absolute
  z-index: 50
  width: 100vw
  height: 100vh
  top: -100vh

  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background: #fff url('../assets/bg-ready.svg') no-repeat 50% 50% / auto 100%
  padding: 10vw

  transition: all 0.35s linear

#game-menu
  top: 0
  transition: all 1.5s linear
  transition-delay: 0.35s
  background: #fff url('../assets/bg-menu.jpg') no-repeat 50% 50% / cover

#app:not(.gameMenu) #game-menu
  top: -100vh

.readyPlayerOne #ready-player-one,
.readyPlayerTwo #ready-player-two
  top: 0

.splash-screen-title
  padding: 1vw 2vw
  margin-bottom: 4vw
  font-size: 6vw
  font-weight: bold
  background-color: rgba(255,255,255,0.8)

.ready-button,
.new-game-button
  display: inline-block
  width: 28vw
  padding: 1.5vw 2vw
  background-color: #fff
  border: 3px solid #8f673b
  border-radius: 12px
  font-size: 4vw
  font-weight: bold
  text-align: center
  cursor: pointer

</style>
