<template lang="pug">
  
  .field-grid
    template(v-if="this.$store.state.currentPlayer == this.player && !(this.$store.state.currentPhase == 'goPlayerOne' || this.$store.state.currentPhase == 'goPlayerTwo')")
      template(v-for="(row, indexRow) in this.getFieldByParams(this.player)")
        div(v-for="(cell, indexCell) in row"
            @click="cell.forbid ? printForbidden() : placeShip(indexRow, indexCell)"
            :class="{ forbidden: cell.forbid, isShip: cell.ship, mine: cell.mine }")
    
    template(v-if="this.$store.state.currentPlayer == this.player && (this.$store.state.currentPhase == 'goPlayerOne' || this.$store.state.currentPhase == 'goPlayerTwo')")
      template(v-for="(row, indexRow) in this.getFieldByParams(this.player)")
        div(v-for="(cell, indexCell) in row"
            :class="{ isShip: cell.ship, mine: cell.mine }")

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'FieldGrid',
  props: {
    player: String,
  },

  computed: {
    ...mapGetters([
      'getFieldByParams',
      'getShipsAvailableByType',
      'getShipsAvailableAll',
      'isTileForbidden',
      'isTileShip',
      'opponentFieldCheck',
    ]),
  },

  methods: {
    ...mapMutations([
      'sendAlertMessage',
      'placeShipHead',
      'placeShipTiles',
      'placeForbiddenTiles',
      'placeMine',
      'setShipType',
      'markShipDamaged',
    ]),

    placeShip (row, col) {
      let type = this.$store.state.shipPlaceType
      // Check if there are available ships of selected type
      if ( this.getShipsAvailableAll <= 0 ) {
        this.sendAlertMessage('Все корабли запущены. Пора идти в атаку.')
        return
      } else if ( this.getShipsAvailableByType(type) <= 0 ) {
        this.sendAlertMessage('Таких кораблей больше нет. Пиратский бюджет, крюком его по япкам!')
        this.switchShipButtons(type)
        return
      }
      // Determine size
      let orientation = this.$store.state.shipPlaceOrientation
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
        this.placeShipHead ({row: row, col: col, type: type, size: size, orientation: orientation, tiles: shipTiles})
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
        } else if (type == 'tiny' && this.getShipsAvailableAll !== 0) {
          this.setShipType('big')
        } 
      }
    },

    // Generate a list of ship tiles
    getShipTiles (row, col, orientation, size) {
      var shipTiles = [{row: row, col: col}]
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
        this.sendAlertMessage('Корабль никак не может торчать за картой!')
        return false
      }
      // 2. Check if ship tiles will cross with forbidden
      // 2.1. Check each ship tile against forbidden cells and ship cells
      for (let tile of shipTiles) {
        if ( this.isTileForbidden(tile.row, tile.col) || this.isTileShip(tile.row, tile.col) ) {
          this.sendAlertMessage('Таранить будем чужие корабли, свои не надо.')
          return false
        }
      }
      return true 
    },

    printForbidden () {
      this.sendAlertMessage('Тут уже что-то есть!')
    },
  }

}
</script>

<style lang="sass">
/* Field Grid */
$size-vertical: 100vh
$vh-unit: $size-vertical / 100
$ship-unit: $vh-unit * 4.4 * 1.333

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

.goPlayerOne,
.goPlayerTwo
  #fieldMy .field-grid > div,
  #fieldMy .field-grid > div:hover
    background-color: rgba(255, 255, 255, 0.1)

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
  background: transparent url('../assets/cross.svg') no-repeat 50% 50% / 50% 50%

.readyPlayerOne,
.readyPlayerTwo
  #fieldMy .field-grid > div.forbidden
    background-color: rgba(255, 255, 255, 0.1)
    background-image: none

#fieldTheir .field-grid > div.dead
  background: transparent url('../assets/cross.svg') no-repeat 50% 50% / 20% 20%

.field-grid > div.mine,
#fieldMy .field-grid > div.mine.forbidden,
#fieldTheir .field-grid > div.mine.dead
  background: transparent url('../assets/mine.svg') no-repeat 50% 50% / 60% 60%

.field-grid > div.mine.isShip
  border: 2px solid #644932
  background: #a47d52 url('../assets/explosion.svg') no-repeat 50% 50% / 75% 75%

#fieldMy .field-grid > div.mine.isShip
  position: relative
  z-index: 1
  border: none
  background: transparent url('../assets/explosion.svg') no-repeat 50% 50% / 80% 80%


.field-grid > div.forbidden:after,
.field-grid > div.isShip:after,
.goPlayerOne .field-grid > div:after,
.goPlayerTwo .field-grid > div:after
  display: none

.place-big .field-grid > div:hover:after
  width: $ship-unit
  height: $ship-unit * 4
  background-image: url('../assets/place-vertical-4.svg')

.place-big.orient-width .field-grid > div:hover:after
  width: $ship-unit * 4
  height: $ship-unit
  background-image: url('../assets/place-horizontal-4.svg')

.place-medium .field-grid > div:hover:after
  width: $ship-unit
  height: $ship-unit * 3
  background-image: url('../assets/place-vertical-3.svg')

.place-medium.orient-width .field-grid > div:hover:after
  width: $ship-unit * 3
  height: $ship-unit
  background-image: url('../assets/place-horizontal-3.svg')

.place-small .field-grid > div:hover:after
  width: $ship-unit
  height: $ship-unit * 2
  background-image: url('../assets/place-vertical-2.svg')

.place-small.orient-width .field-grid > div:hover:after
  width: $ship-unit * 2
  height: $ship-unit
  background-image: url('../assets/place-horizontal-2.svg')

.place-tiny .field-grid > div:hover:after
  width: $ship-unit
  height: $ship-unit
  background-image: url('../assets/place-ship-1.svg')

</style>
