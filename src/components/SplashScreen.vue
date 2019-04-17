<template lang="pug">
  
  #splashScreen
    | Title
    br
    .ready-button(@click="advanceGamePhase()") I am ready!

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'SplashScreen',
  data() {
    return {
    }
  },
  props: {
    player: String,
  },

  computed: {
    ...mapGetters([
      'getFieldByParams',
      'getShipsAvailableByType',
      'getShipsAvailableAll',
      'shipPlaceOrientation',
      'shipPlaceType',
      'isTileForbidden',
      'isTileShip',
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

<style lang="sass" scoped>
/* Splash Screen */
#splashScreen
  position: absolute
  z-index: 50
  width: 100vw
  height: 100vh
  top: -100vh
  background-color: rgba(255,255,255,0.85)

  transition: all 0.35s linear

.readyPlayerOne #splashScreen,
.readyPlayerTwo #splashScreen
  top: 0

.ready-button
  display: inline-block
  border: 1px solid #8f673b
  border-radius: 12px
  text-align: center
  padding: 1.5vw 2vw
  cursor: pointer

</style>
