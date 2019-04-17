<template lang="pug">
  
  #splashScreen
    .splash-screen-title Ready {{ this.currentPlayerText }}
    .ready-button(@click="advanceGamePhase()") I am ready!

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

    currentPlayerText: function () {
      return this.getCurrentPlayer == 'playerOne' ? 'Player Two' : 'Player One'
    },
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
#splashScreen
  position: absolute
  z-index: 50
  width: 100vw
  height: 100vh
  top: -100vh

  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background-color: rgba(255,255,255,0.85)
  padding: 10vw

  transition: all 0.35s linear

.readyPlayerOne #splashScreen,
.readyPlayerTwo #splashScreen
  top: 0

.splash-screen-title
  font-size: 5vw
  padding-bottom: 4vw

.ready-button
  width: 20vw
  display: inline-block
  border: 1px solid #8f673b
  border-radius: 12px
  text-align: center
  padding: 1.5vw 2vw
  cursor: pointer

</style>
