<template lang="pug">
  
  .field-grid
    template(v-for="(row, indexRow) in this.getFieldByParams(this.player)")
      div(v-for="(cell, indexCell) in row"
          @click="cell.forbid ? printForbidden() : placeShip(indexRow, indexCell)"
          :class="{ forbidden: cell.forbid, isShip: cell.ship }")

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'FieldGrid',
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
    ...mapMutations([
      'sendAlertMessage',
      'placeShipHead',
      'placeShipTiles',
      'placeForbiddenTiles',
      'setShipType',
    ]),

    placeShip (row, col) {
      let type = this.shipPlaceType
      // Check if there are available ships of selected type
      if ( this.getShipsAvailableByType(type) <= 0 ) {
        this.sendAlertMessage('No more ships of this size left to place.')
        return
      }
      // Determine size
      let orientation = this.shipPlaceOrientation
      let size = 1
      if (type == 'big') {
        size = 4
      } else if (type == 'medium') {
        size = 3
      } else if (type == 'small') {
        size = 2
      } else {
        size = 1
      }
      // Check if placeable
      let shipTiles = this.getShipTiles(row, col, orientation, size)
      let isPlaceable = this.checkPlaceability (row, col, orientation, size, shipTiles)
      if ( isPlaceable ) {
        // Place head
        this.placeShipHead ({row: row, col: col, type: type, size: size, orientation: orientation}
        )
        // Place ship tiles
        this.placeShipTiles (shipTiles)
        // Place forbidden tiles
        let forbidTiles = this.getTilesToForbid(row, col, orientation, size)
        this.placeForbiddenTiles (forbidTiles)
      } else {
        return
      }
      // Cycle ship selection buttons
      this.switchShipButtons(type)
    },

    // Switch ship type button to the right if no more ships of this type left
    switchShipButtons (type) {
      if (this.getShipsAvailableByType(type) == 0) {
        if (type == 'big') {
          this.setShipType('medium')
        } else if (type == 'medium') {
          this.setShipType('small')
        } else if (type == 'small') {
          this.setShipType('tiny')
        }
      }
    },

    // Generate a list of ship tiles
    getShipTiles (row, col, orientation, size) {
      let shipTiles = [{row: row, col: col}]
      for (let i = 1; i < size; i++) {
        if (orientation == 'width') {
          shipTiles.push({row: row, col: col + i})
        } else {
          shipTiles.push({row: row + i, col: col})
        }
      }
      return shipTiles
    },

    getTilesToForbid (row, col, orientation, size) {
      let forbidTiles = []

      if (orientation == 'width') {
        let rowWidth = size + 2
        for (let i = 0; i < rowWidth; i++) {
          if ( 0 <= (row - 1) && 0 <= (col - 1 + i) && (col - 1 + i) <= 9 ) {
            forbidTiles.push({ row: row - 1, col: col - 1 + i })
          }
          if ( (row + 1) <= 9 && 0 <= (col - 1 + i) && (col - 1 + i) <= 9 ) {
            forbidTiles.push({ row: row + 1, col: col - 1 + i })
          }
        }
        if( 0 <= (col - 1) ) { forbidTiles.push({ row: row, col: col - 1 }) }
        if( (col + size) <= 9 ) { forbidTiles.push({ row: row, col: col + size }) }
      } else {
        let rowHeight = size + 2
        for (let j = 0; j < rowHeight; j++) {
          if ( 0 <= (col - 1) && 0 <= (row - 1 + j) && (row - 1 + j) <= 9 ) {
            forbidTiles.push({ col: col - 1, row: row - 1 + j })
          }
          if ( (col + 1) <= 9 && 0 <= (row - 1 + j) && (row - 1 + j) <= 9 ) {
            forbidTiles.push({ col: col + 1, row: row - 1 + j })
          }
        }
        if( 0 <= (row - 1) ) { forbidTiles.push({ row: row - 1, col: col }) }
        if( (row + size) <= 9 ) { forbidTiles.push({ row: row + size, col: col }) }
      }

      return forbidTiles
    },

    checkPlaceability (row, col, orientation, size, shipTiles) {
      let shipEnd = {row: row, col: col}

      if (orientation == 'width') {
        shipEnd.col = col - 1 + size
      } else {
        shipEnd.row = row - 1 + size
      }
      // 1. Check if ship sticks outside the board
      if (shipEnd.col > 9 || shipEnd.row > 9) {
        this.sendAlertMessage('Ship cant stick outside the board!')
        return false
      }
      // 2. Check if ship tiles will cross with forbidden
      // 2.1. Check each ship tile against forbidden cells and ship cells
      for (let tile of shipTiles) {
        if ( this.isTileForbidden(tile.row, tile.col) || this.isTileShip(tile.row, tile.col) ) {
          this.sendAlertMessage('Ship cant place on occupied tiles!')
          return false
        }
      }
      return true 
    },

    printForbidden () {
      this.sendAlertMessage('This place is not empty!')
    },
  }

}
</script>

<style lang="sass">
/* Field Grid */
.field-grid
  display: grid
  width: 100%
  height: 100%
  grid-template-columns: repeat(10, 1fr)
  grid-template-rows: repeat(10, 1fr)
  grid-gap: 2px
  padding: 2px

.field-grid > div
  position: relative
  background-color: rgba(255, 255, 255, 0.1)
  user-select: none

/* Grid interactions */
.field-grid > div:hover
  background-color: rgba(255, 255, 255, 0.2)

.field-grid > div:hover:after
  position: absolute
  display: block
  content: ''
  width: 100%
  height: 100%
  top: 0
  left: 0
  background-repeat: no-repeat
  background-size: cover

.field-grid > div.forbidden
  background: transparent url('../assets/cross.svg') no-repeat 50% 50% / 60% 60%

.field-grid > div.forbidden:after,
.field-grid > div.isShip:after
  display: none

.place-big .field-grid > div:hover:after
  width: 4.4vw
  height: 17.6vw
  background-image: url('../assets/ship-vertical-4.png')

.place-big.orient-width .field-grid > div:hover:after
  width: 17.6vw
  height: 4.4vw
  background-image: url('../assets/ship-horizontal-4.png')

.place-medium .field-grid > div:hover:after
  width: 4.4vw
  height: 13.2vw
  background-image: url('../assets/ship-vertical-3.png')

.place-medium.orient-width .field-grid > div:hover:after
  width: 13.2vw
  height: 4.4vw
  background-image: url('../assets/ship-horizontal-3.png')

.place-small .field-grid > div:hover:after
  width: 4.4vw
  height: 8.8vw
  background-image: url('../assets/ship-vertical-2.png')

.place-small.orient-width .field-grid > div:hover:after
  width: 8.8vw
  height: 4.4vw
  background-image: url('../assets/ship-horizontal-2.png')

.place-tiny .field-grid > div:hover:after
  width: 4.4vw
  height: 4.4vw
  background-image: url('../assets/ship-1.png')

</style>
