<template lang="pug">

  #app
    #title Десять кораблей!
    #settings ⚙️
    #alerts {{ alertMessage }}

    #fieldMy(:class = "this.placeShipTypeClass")
      .ship(v-for="ship in this.getShipsByPlayer('playerOne')"
            :class="ship.class" 
            :style="ship.style")
      .field-grid
        template(v-for="(row, indexRow) in this.getFieldByParams('playerOne','fieldMy')")
          div(v-for="(cell, indexCell) in row"
              @click="cell.forbid ? printForbidden() : placeShip(indexRow, indexCell)"
              :class="{ forbidden: cell.forbid, isShip: cell.ship }")
    .fieldExtraLeft Evade!

    #fieldTheir
      .field-grid(v-html="this.getTheirField")
    .fieldExtraRight Attack!
    
    shipSelection

    // img(alt="Vue logo" src="./assets/logo.png")

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ShipSelection from './components/ShipSelection.vue'

export default {
  name: 'app',
  components: {
    ShipSelection
  },

  data() {
    return {
      alertMessage: 'Yarr!',
    }
  },

  mounted() {
  },

  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'getTheirField',
      'getFieldByParams',
      'getShipsByPlayer',
      'shipPlaceType',
      'shipPlaceOrientation',
      'getShipsAvailableByType',
      'getShipsAvailableAll',
      'isTileForbidden',
      'isTileShip',
    ]),

    placeShipTypeClass: function() {
      return 'place-' + this.shipPlaceType + ' orient-' + this.shipPlaceOrientation
    }
  },

  methods: {
    placeShip (row, col) {
      if ( this.getShipsAvailableAll <= 0 ) {
        this.alertMessage = 'No more ships left to place.'
        return
      }
      // Determine type and size
      let type = this.shipPlaceType
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
        // Get forbidden tiles
        let forbidTiles = this.getTilesToForbid(row, col, orientation, size)
        this.placeForbiddenTiles (forbidTiles)
      } else {
        return
      }



      // Cycle ship selection buttons
      this.switchShipButtons(type)
    },

    // Switch ship type button to the right if no more ships of this type left
    switchShipButtons(type) {
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
    getShipTiles(row, col, orientation, size) {
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

    getTilesToForbid(row, col, orientation, size) {
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
        this.alertMessage = 'Ship cant stick outside the board!'
        return false
      }

      // 2. Check if ship tiles will cross with forbidden
      // 2.1. Check each ship tile against forbidden cells and ship cells
      for (let tile of shipTiles) {
        if ( this.isTileForbidden(tile.row, tile.col) || this.isTileShip(tile.row, tile.col) ) {
          this.alertMessage = 'Ship cant place on occupied tiles!'
          return false
        }
      }

      return true
 
    },

    ...mapMutations([
      'placeShipHead',
      'placeShipTiles',
      'placeForbiddenTiles',
      'setShipType',
    ]),

    printForbidden () {
      this.alertMessage = 'This place is not empty!';
    }
  }

}
</script>

<style lang="sass">
@import 'sass/reset.sass';
@import 'sass/main.sass';
</style>
