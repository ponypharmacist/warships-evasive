<template lang="pug">

  #app(:class="this.getCurrentPhase")
    SplashScreen

    CharacterBar
    #go-button(@click="advanceGamePhase()") Go!
    #settings ⚙️
    #alerts.koala {{ this.getAlertMessage }}

    #fieldMy(:class = "[this.placeShipTypeClass, this.isMovesLeft ? '' : 'no-moves-left']")
      FieldGrid(:player="this.getCurrentPlayer")
      .ship(v-for="ship in this.getShipsByPlayer(this.getCurrentPlayer)"
            :class="[ship.classification, ship.isDamaged ? 'isDamaged' : '', ship.isDead ? 'isDead' : '']" 
            :style="ship.style")
        ShipControls(:ship="ship")

    #fieldTheir
      FieldGridOpponent(:player="this.getOpponent")
    
    ShipSelection

    // img(alt="Vue logo" src="./assets/logo.png")

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SplashScreen from './components/SplashScreen.vue'
import CharacterBar from './components/CharacterBar.vue'
import ShipSelection from './components/ShipSelection.vue'
import FieldGrid from './components/FieldGrid.vue'
import FieldGridOpponent from './components/FieldGridOpponent.vue'
import ShipControls from './components/ShipControls.vue'

export default {
  name: 'app',
  components: {
    SplashScreen,
    CharacterBar,
    ShipSelection,
    FieldGrid,
    FieldGridOpponent,
    ShipControls
  },

  computed: {
    ...mapGetters([
      'getAlertMessage',
      'getCurrentPhase',
      'getCurrentPlayer',
      'getOpponent',
      'getShipsByPlayer',
      'shipPlaceType',
      'shipPlaceOrientation',
      'isMovesLeft',
    ]),

    placeShipTypeClass: function() {
      return 'place-' + this.shipPlaceType + ' orient-' + this.shipPlaceOrientation
    }
  },

  methods: {
    ...mapActions([
      'advanceGamePhase',
    ]),
  }

}
</script>

<style lang="sass">
/* @import 'sass/reset.sass'; */
/* Main styles */
$size-vertical: 95vh
$vh-unit: $size-vertical / 100
$vw-unit: $size-vertical / 100 * 1.333
$size-horizontal: $size-vertical * 1.333
$field-width: $vw-unit * 44

body
  display: flex
  min-height: 100vh
  background: #f1f1f1 url('assets/bg-body.jpg') repeat 0 0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

  overflow: hidden
  width: $size-horizontal
  height: $size-vertical
  margin: auto
  position: relative
  background: #f1f1f1 url('assets/map-retro.svg') no-repeat 50% 100% / cover

#settings,
#alerts
  position: absolute
  display: flex
  align-items: center
  justify-content: center  

#settings
  width: $vw-unit * 9
  height: $vw-unit * 9
  right: 0
  font-size: $vw-unit * 5
  cursor: pointer

#alerts
  display: flex
  max-width: $vw-unit * 80
  height: $vw-unit * 6
  bottom: $vw-unit * 2
  left: $vw-unit * 10
  padding: 0 $vw-unit * 3 0 $vw-unit * 12
  color: #ffffff
  background-color: rgba(0, 0, 0, 0.3)
  border-radius: $vw-unit * 1
  font-weight: bold
  line-height: 120%

#alerts:before
  position: absolute
  content: ''
  width: $vw-unit * 8
  height: $vw-unit * 8
  left: $vw-unit * 2
  bottom: 0
  background: transparent url('assets/pirate-parrot.svg') no-repeat 100% 100% / cover

#alerts.koala:before
  background: transparent url('assets/koala.svg') no-repeat 100% 100% / cover

#fieldMy,
#fieldTheir
  position: absolute
  background-color: rgba(0, 0, 0, 0.1)
  width: $field-width
  height: $field-width
  bottom: $vw-unit * 10

  overflow: hidden

#fieldMy
  left: $vw-unit * 4

#fieldTheir
  right: $vw-unit * 4

#go-button
  position: absolute
  width: $vw-unit * 13
  height: $vw-unit * 13
  right: $vw-unit * 13
  top: $vw-unit * 4
  margin-left: auto
  border-radius: $vw-unit * 4
  background: rgba(0,138,13,0.6)
  color: #fff
  font-size: $vw-unit * 5
  line-height: $vw-unit * 13
  font-weight: bold
  cursor: pointer
  opacity: 1
  transition: all 0.35s linear
  
#go-button:hover,
#go-button:active
  background: rgba(0,138,13,0.9)

.placeShipsOne #go-button,
.placeShipsTwo #go-button
  display: none

.readyPlayerOne #go-button,
.readyPlayerTwo #go-button
  opacity: 0


/* Ships */
.ship
  position: absolute
  width: 10%
  height: 10%
  background-color: rgba(0, 0, 255, 0.1)
  touch-action: none
  user-select: none
  transition: all 0.25s ease-in-out

.ship-big.height
  background: transparent url('assets/ship-vertical-4.svg') no-repeat 50% 50% / cover

.ship-medium.height
  background: transparent url('assets/ship-vertical-3.svg') no-repeat 50% 50% / cover

.ship-small.height
  background: transparent url('assets/ship-vertical-2.svg') no-repeat 50% 50% / cover

.ship-big.width
  background: transparent url('assets/ship-horizontal-4.svg') no-repeat 50% 50% / cover

.ship-medium.width
  background: transparent url('assets/ship-horizontal-3.svg') no-repeat 50% 50% / cover

.ship-small.width
  background: transparent url('assets/ship-horizontal-2.svg') no-repeat 50% 50% / cover

.ship-tiny
  background: transparent url('assets/ship-1.svg') no-repeat 50% 50% / cover
</style>
