<template lang="pug">
  
  #shipSelection
    .ship-buttons
      .ship-button(:class="this.shipButtonClass('big')"
                    @click="setShipType('big')") x {{ this.getShipsAvailableByType('big') }}
      .ship-button(:class="this.shipButtonClass('medium')"
                    @click="setShipType('medium')") x {{ this.getShipsAvailableByType('medium') }}
      .ship-button(:class="this.shipButtonClass('small')"
                    @click="setShipType('small')") x {{ this.getShipsAvailableByType('small') }}
      .ship-button(:class="this.shipButtonClass('tiny')"
                    @click="setShipType('tiny')") x {{ this.getShipsAvailableByType('tiny') }}

    .utility-buttons
      .utility-button.rotate-button(@click="toggleOrientation()") Rotate
      .utility-button.reset-button Reset
      .utility-button.done-button Done

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ShipSelection',
  data() {
    return {
      positionX: 0,
      positionY: 0,
    }
  },

  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'shipPlaceType',
      'shipPlaceOrientation',
      'getShipsAvailableByType',
    ]),
  },

  methods: {
    ...mapMutations([
      'setShipType',
      'toggleOrientation',
    ]),

    shipButtonClass (shipClass) {
      return {
        active: this.shipPlaceType == shipClass,
        horizontal: this.shipPlaceOrientation == 'height' ? false : true,
        disabled: this.getShipsAvailableByType(shipClass) == 0
      }
    },
  }

}
</script>

<style lang="sass" scoped>
  
#shipSelection
  position: absolute
  display: flex
  flex-direction: column
  width: 50vw
  height: 60vw
  top: calc(50% - 30vw)
  right: 0
  padding: 4vw
  background-color: #d5aa80
  border: 4px solid #503722
  border-radius: 24px 0 0 24px

/* Ship buttons */
.ship-buttons
  width: 42vw
  height: 46vw
  display: flex
  flex-wrap: wrap
  justify-content: space-between

.ship-button
  width: 19vw
  height: 19vw
  margin-bottom: 4vw
  padding-top: 15vw
  border: 1px solid #8f673b
  border-radius: 12px
  cursor: pointer
  background-repeat: no-repeat

.ship-button:nth-child(1)
  background-image: url('../assets/ship-vertical-4.png')
  background-position: 50% 30%
  background-size: 22px 88px

.ship-button:nth-child(2)
  background-image: url('../assets/ship-vertical-3.png')
  background-position: 50% 40%
  background-size: 22px 66px

.ship-button:nth-child(3)
  background-image: url('../assets/ship-vertical-2.png')
  background-position: 50% 40%
  background-size: 22px 44px

.ship-button:nth-child(4)
  background-image: url('../assets/ship-1.png')
  background-position: 50% 44%
  background-size: 22px 22px

.ship-button.horizontal:nth-child(1)
  background-image: url('../assets/ship-horizontal-4.png')
  background-position: 50% 45%
  background-size: 88px 22px

.ship-button.horizontal:nth-child(2)
  background-image: url('../assets/ship-horizontal-3.png')
  background-position: 50% 45%
  background-size: 66px 22px

.ship-button.horizontal:nth-child(3)
  background-image: url('../assets/ship-horizontal-2.png')
  background-position: 50% 45%
  background-size: 44px 22px

.ship-button:hover,
.ship-button.active
  background-color: #cc9f73

.ship-button.disabled
  border-color: transparent
  color: transparent

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
