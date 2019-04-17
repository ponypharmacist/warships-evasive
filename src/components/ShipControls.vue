<template lang="pug">
  
  .ship-controls
    .ship-controls-up(:class="{ disabled: this.isControlDisabled(ship.row, ship.col, ship.size, 'up') }")
    .ship-controls-right(:class="{ disabled: this.isControlDisabled(ship.row, ship.col, ship.size, 'right') }")
    .ship-controls-down(:class="{ disabled: this.isControlDisabled(ship.row, ship.col, ship.size, 'down') }")
    .ship-controls-left(:class="{ disabled: this.isControlDisabled(ship.row, ship.col, ship.size, 'left') }")

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ShipControls',

  props: {
    ship: Object,
  },

  computed: {
    ...mapGetters([
      'isControlDisabled',
    ]),
  },

  methods: {
    ...mapMutations([
      'setShipType',
    ]),

  }

}
</script>

<style lang="sass">
/* ShipControls */
$ship-control-offset: -3.7vw

.ship-controls
  position: relative
  width: 100%
  height: 100%

.isHit .ship-controls
  display: none

.ship-controls > div
  position: absolute
  width: 3.2vw
  height: 3.2vw
  border-radius: 50%
  background-color: rgba(0,255,0,0.5)

.ship-controls > div:hover
  background-color: rgba(0,255,0,0.75)

.ship-controls > div.disabled
  display: none!important

.ship-controls-up,
.ship-controls-down
  left: 0.65vw

.ship-controls-up
  margin-top: $ship-control-offset

.ship-controls-down
  bottom: 0
  margin-bottom: $ship-control-offset

.ship-controls-left,
.ship-controls-right
  top: 0.65vw

.ship-controls-left
  margin-left: $ship-control-offset

.ship-controls-right
  right: 0
  margin-right: $ship-control-offset

.width .ship-controls-up,
.width .ship-controls-down,
.height .ship-controls-left,
.height .ship-controls-right
  display: none

.ship-tiny
  &.width .ship-controls-up,
  &.width .ship-controls-down,
  &.height .ship-controls-left,
  &.height .ship-controls-right
    display: block

</style>
