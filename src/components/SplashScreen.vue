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
  background-color: #fff
  padding: 10vw

  transition: all 0.35s linear

#game-menu
  top: 0
  transition: all 2s linear
  transition-delay: 0.35s

#app:not(.gameMenu) #game-menu
  top: -100vh

.readyPlayerOne #ready-player-one,
.readyPlayerTwo #ready-player-two
  top: 0

.splash-screen-title
  font-size: 5vw
  padding-bottom: 4vw

.ready-button,
.new-game-button
  width: 20vw
  display: inline-block
  border: 1px solid #8f673b
  border-radius: 12px
  text-align: center
  padding: 1.5vw 2vw
  cursor: pointer

</style>
