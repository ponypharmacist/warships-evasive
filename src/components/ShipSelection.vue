<template lang="pug">
  
  #shipSelection
    .ship-buttons
      .ship-button(:class="this.shipButtonClass('big')"
                    @click="setShipType('big')")
        .ship-button-amount x{{ this.getShipsAvailableByType('big') }}

      .ship-button(:class="this.shipButtonClass('medium')"
                    @click="setShipType('medium')")
        .ship-button-amount x{{ this.getShipsAvailableByType('medium') }}

      .ship-button(:class="this.shipButtonClass('small')"
                    @click="setShipType('small')")
        .ship-button-amount x{{ this.getShipsAvailableByType('small') }}

      .ship-button(:class="this.shipButtonClass('tiny')"
                    @click="setShipType('tiny')")
        .ship-button-amount x{{ this.getShipsAvailableByType('tiny') }}

    .utility-buttons
      .utility-button.rotate-button(@click="toggleOrientation()")
      .utility-button.reset-button(@click="resetField()") Сброс
      .utility-button.done-button(@click="donePlacing()") Готово! 
      // Transition game phase pO, rT, pT, rO

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ShipSelection',

  computed: {
    ...mapGetters([
      'shipPlaceType',
      'shipPlaceOrientation',
      'getShipsAvailableByType',
      'getShipsAvailableAll',
    ]),
  },

  methods: {
    ...mapActions([
      'advanceGamePhase',
    ]),
    ...mapMutations([
      'setShipType',
      'toggleOrientation',
      'resetField',
      'sendAlertMessage',
    ]),

    shipButtonClass (shipClass) {
      return {
        active: this.shipPlaceType == shipClass,
        horizontal: this.shipPlaceOrientation == 'height' ? false : true,
        disabled: this.getShipsAvailableByType(shipClass) == 0
      }
    },

    donePlacing () {
      if (this.getShipsAvailableAll !== 0) {
        this.sendAlertMessage('Капитан, в этой битве нам понадобятся все корабли! Спусти же их на воду.')
      } else {
        this.advanceGamePhase()
      }
    },

  }

}
</script>

<style lang="sass">
/* Ship Selection Menu */
$size-vertical: 95vh
$vh-unit: $size-vertical / 100
$vw-unit: $size-vertical / 100 * 1.333

#shipSelection
  position: absolute
  display: flex
  flex-direction: column
  width: $vw-unit * 50
  height: $vw-unit * 45
  bottom: $vw-unit * 9.5
  right: $vw-unit * -50
  padding: $vw-unit * 3 $vw-unit * 5
  background: transparent url('../assets/book.svg') no-repeat 50% 50% / cover

  transition: right 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)

.placeShipsOne #shipSelection,
.placeShipsTwo #shipSelection
  right: $vw-unit * 1

/* Ship buttons */
.ship-buttons
  width: $vw-unit * 40
  height: $vw-unit * 33.5
  display: flex
  flex-wrap: wrap
  justify-content: space-between

.ship-button
  position: relative
  width: $vw-unit * 17
  height: $vw-unit * 14
  margin-bottom: $vw-unit * 3
  border: 1px solid #bbb
  cursor: pointer
  background-repeat: no-repeat
  background-position: 50% 50%

.ship-button:nth-child(1)
  background-image: url('../assets/place-vertical-4.svg')
  background-size: auto 88%

.ship-button:nth-child(2)
  background-image: url('../assets/ship-vertical-3.png')
  background-size: auto 66%

.ship-button:nth-child(3)
  background-image: url('../assets/ship-vertical-2.png')
  background-size: auto 44%

.ship-button:nth-child(4)
  background-image: url('../assets/ship-1.png')
  background-size: 20%

.ship-button.horizontal:nth-child(1)
  background-image: url('../assets/ship-horizontal-4.png')
  background-size: 80% auto

.ship-button.horizontal:nth-child(2)
  background-image: url('../assets/ship-horizontal-3.png')
  background-size: 60% auto

.ship-button.horizontal:nth-child(3)
  background-image: url('../assets/ship-horizontal-2.png')
  background-size: 40% auto

.ship-button:hover,
.ship-button.active
  background-color: rgba(0,255,0,0.2)

.ship-button.disabled
  border-color: transparent
  color: transparent

.ship-button-amount
  position: absolute
  width: $vw-unit * 5
  height: $vw-unit * 4
  top: $vw-unit * -1
  right: $vw-unit * -1
  background-color: #fff
  border: 1px solid #bbb
  line-height: $vw-unit * 3.75
  font-weight: bold
  
.ship-button.disabled .ship-button-amount
  display: none

/* Utility buttons */
.utility-buttons
  display: flex
  justify-content: center

.utility-button
  padding: $vw-unit * 1.5 $vw-unit * 2
  margin: 0 $vw-unit * 2 0 0
  border-radius: $vw-unit
  text-align: center
  font-weight: bold
  color: #fff
  background-color: rgba(0,138,13,1)
  cursor: pointer

.utility-button:hover
  background-color: rgba(0,111,11,1)

.rotate-button
  width: $vw-unit * 5
  background-image: url('../assets/rotate.svg')
  background-repeat: no-repeat
  background-position: 50% 50%
  background-size: $vw-unit * 2.5 $vw-unit * 2.5

.done-button
  margin-left: auto
  margin-right: 0


</style>
