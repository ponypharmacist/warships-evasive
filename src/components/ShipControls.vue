<template lang="pug">
  
  .ship-controls
    .ship-controls-up(:class="{ disabled: this.isControlDisabled(ship.row, ship.col, ship.size, 'up') }"
                      @click="moveShip(ship.row, ship.col, ship.size, 'up')")
    .ship-controls-right(:class="{ disabled: this.isControlDisabled(ship.row, ship.col, ship.size, 'right') }"
                      @click="moveShip(ship.row, ship.col, ship.size, 'right')")
    .ship-controls-down(:class="{ disabled: this.isControlDisabled(ship.row, ship.col, ship.size, 'down') }"
                      @click="moveShip(ship.row, ship.col, ship.size, 'down')")
    .ship-controls-left(:class="{ disabled: this.isControlDisabled(ship.row, ship.col, ship.size, 'left') }"
                      @click="moveShip(ship.row, ship.col, ship.size, 'left')")

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
      'moveShipTiles',
      'removeForbiddenTiles',
      'placeForbiddenTiles',
    ]),

    moveShip: function (row, col, size, direction) {
      // move ship tiles
      this.moveShipTiles({row: row, col: col, size: size, direction: direction})

      if (direction == 'down') {
        let allowTiles = [{ row: row, col: col }]
        this.removeForbiddenTiles (allowTiles)
        let forbidTiles = [{ row: row, col: col }]
        this.placeForbiddenTiles (forbidTiles)
      }
      // -3 forbids from the 'back'
      // +1 forbid in place of last tile
      // -1 forbid in front
      // +3 forbids two tiles ahead of 'front'
      // new 'row' and 'col'
      // pop old ship tile
      // push new ship tile
    },
  }

}
</script>

<style lang="sass">
/* ShipControls */
$size-vertical: 95vh
$vh-unit: $size-vertical / 100
$vw-unit: $size-vertical / 100 * 1.333
$ship-control-offset: $vw-unit * -4.4
$base-control-bg-color: rgba(255,255,255,0.1)

.ship-controls
  position: relative
  width: 100%
  height: 100%

.isDamaged,
.placeShipsOne,
.placeShipsTwo
  .ship-controls
    display: none

.ship-controls > div
  position: absolute
  width: 4.4vw
  height: 4.4vw
  border-radius: 1vw
  cursor: pointer

.ship-controls > div:hover
  background-color: rgba(255,255,255,0.4)

.ship-controls > div.disabled
  display: none!important

.ship-controls-up,
.ship-controls-down
  left: 0

.ship-controls-up
  margin-top: $ship-control-offset
  background: $base-control-bg-color url('../assets/up.svg') no-repeat 50% 50% / 75% 75%

.ship-controls-down
  bottom: 0
  margin-bottom: $ship-control-offset
  background: $base-control-bg-color url('../assets/down.svg') no-repeat 50% 50% / 75% 75%

.ship-controls-left,
.ship-controls-right
  top: 0

.ship-controls-left
  margin-left: $ship-control-offset
  background: $base-control-bg-color url('../assets/left.svg') no-repeat 50% 50% / 75% 75%

.ship-controls-right
  right: 0
  margin-right: $ship-control-offset
  background: $base-control-bg-color url('../assets/right.svg') no-repeat 50% 50% / 75% 75%

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
