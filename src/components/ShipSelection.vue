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
      .utility-button.rotate-button(@click="toggleOrientation()") Rotate
      .utility-button.reset-button(@click="resetField()") Reset
      .utility-button.done-button(@click="donePlacing()") Done 
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
        this.sendAlertMessage('We\'ll need all the ships in this battle, mate! Deploy all of them.')
      } else {
        this.advanceGamePhase()
      }
    },

  }

}
</script>

<style lang="sass">
/* Ship Selection Menu */
#shipSelection
  position: absolute
  display: flex
  flex-direction: column
  width: 50vw
  height: 47vw
  top: 19vw
  right: -50vw
  padding: 3vw 4vw
  background-color: #fff
  border-radius: 4px 0 0 4px
  box-shadow: 0 0 1.5rem rgba(0,0,0,.15)

  transition: all 0.35s linear

.placeShipsOne #shipSelection,
.placeShipsTwo #shipSelection
  right: 0

/* Ship buttons */
.ship-buttons
  width: 42vw
  height: 36vw
  display: flex
  flex-wrap: wrap
  justify-content: space-between

.ship-button
  position: relative
  width: 19vw
  height: 15vw
  margin-bottom: 3vw
  border: 1px solid #bbb
  cursor: pointer
  background-repeat: no-repeat
  background-position: 50% 50%

.ship-button:nth-child(1)
  background-image: url('../assets/ship-vertical-4.png')
  background-size: 22px 88px

.ship-button:nth-child(2)
  background-image: url('../assets/ship-vertical-3.png')
  background-size: 22px 66px

.ship-button:nth-child(3)
  background-image: url('../assets/ship-vertical-2.png')
  background-size: 22px 44px

.ship-button:nth-child(4)
  background-image: url('../assets/ship-1.png')
  background-size: 22px 22px

.ship-button.horizontal:nth-child(1)
  background-image: url('../assets/ship-horizontal-4.png')
  background-size: 88px 22px

.ship-button.horizontal:nth-child(2)
  background-image: url('../assets/ship-horizontal-3.png')
  background-size: 66px 22px

.ship-button.horizontal:nth-child(3)
  background-image: url('../assets/ship-horizontal-2.png')
  background-size: 44px 22px

.ship-button:hover,
.ship-button.active
  background-color: rgba(0,255,0,0.2)

.ship-button.disabled
  border-color: transparent
  color: transparent

.ship-button-amount
  position: absolute
  width: 5vw
  height: 4vw
  top: -1vw
  right: -1vw
  background-color: #fff
  border: 1px solid #bbb
  line-height: 3.75vw
  font-weight: bold

/* Utility buttons */
.utility-buttons
  display: flex
  justify-content: center

.utility-button
  border: 1px solid #8f673b
  border-radius: 12px
  text-align: center
  padding: 1.5vw 2vw
  margin: 0 1vw
  cursor: pointer

.utility-button:hover
  background-color: #cc9f73


</style>
