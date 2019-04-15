<template lang="pug">
  
  #shipSelection
    .ship-buttons
      .ship-button(:class="{ active: shipPlaceType == 'big', horizontal: this.shipPlaceOrientation == 'height' ? false : true }"
                    @click="setShipType('big')") Place Big x {{ this.getShipsAvailableByType('big') }}
      .ship-button(:class="{ active: shipPlaceType == 'medium'}"
                    @click="setShipType('medium')") Place Medium x {{ this.getShipsAvailableByType('medium') }}
      .ship-button(:class="{ active: shipPlaceType == 'small'}"
                    @click="setShipType('small')") Place Small x {{ this.getShipsAvailableByType('small') }}
      .ship-button(:class="{ active: shipPlaceType == 'tiny'}"
                    @click="setShipType('tiny')") Place Tiny x {{ this.getShipsAvailableByType('tiny') }}

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

.ship-button:nth-child(1)
  background: transparent url('../assets/ship-big-vertical.svg') no-repeat 50% 30% / auto 60%

.ship-button.horizontal:nth-child(1)
  background: transparent url('../assets/ship-big-horizontal.svg') no-repeat 50% 45% / 60% auto

.ship-button:hover,
.ship-button.active
  background-color: #cc9f73

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
