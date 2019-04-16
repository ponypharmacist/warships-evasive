<template lang="pug">

  #app
    #title Warships. Evasive
    #settings ⚙️
    #alerts You miss. Yarr!

    #fieldMy
      .ship(v-for="ship in this.getShipsByPlayer('playerOne')"
            :class="ship.class" 
            :style="ship.style")
      .field-grid
        template(v-for="(row, indexRow) in this.getFieldByParams('playerOne','fieldMy')")
          div(v-for="(cell, indexCell) in row"
              @click="cell.forbid ? printForbidden() : placeShip(indexRow, indexCell)"
              :class="{ forbidden: cell.forbid }")
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
      'isTileForbidden',
      'isTileShip',
    ])
  },

  methods: {
    placeShip (row, col) {
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
      let isPlaceable = this.checkPlaceability (row, col, orientation, size)
      if ( isPlaceable ) {
        // Place head
        this.placeShipHead ({row: row, col: col, type: type, size: size, orientation: orientation})
      } else {
        return
      }


      

      // Place ship tiles
      // this.placeShipTiles ()

      // Calculate and place forbidden tiles
    },

    checkPlaceability (row, col, orientation, size) {
      let placeabilityStatus = 'Not evaluated'
      let shipEnd = {row: row, col: col}

      if (orientation == 'width') {
        shipEnd.col = col - 1 + size
      } else {
        shipEnd.row = row - 1 + size
      }

      // 1. Check if ship sticks outside the board
      if (shipEnd.col > 9 || shipEnd.row > 9) {
        placeabilityStatus = 'Ship cant stick outside the board!'
        // eslint-disable-next-line
        console.log(placeabilityStatus)
        return false
      }

      // 2. Check if ship tiles will cross with forbidden
      // 2.1. Generate a list of ship tiles
      let shipTiles = []
      for (let i = 1; i < size; i++) {
        if (orientation == 'width') {
          shipTiles.push({row: row, col: col + i})
        } else {
          shipTiles.push({row: row + i, col: col})
        }
      }

      // 2.2. Check each ship tile against forbidden cells and ship cells
      for (let tile of shipTiles) {
        if ( this.isTileForbidden(tile.row, tile.col) || this.isTileShip(tile.row, tile.col) ) {
          placeabilityStatus = 'Ship cant cross forbidden tiles!'
          // eslint-disable-next-line
          console.log(placeabilityStatus)
          return false
        }
      }

      return true
 
    },

    ...mapMutations([
      'placeShipHead',
    ]),

    printForbidden () {
      // eslint-disable-next-line
      console.log('This place is not empty!');
    }
  }

}
</script>

<style lang="sass">
@import 'sass/reset.sass';
@import 'sass/main.sass';
</style>
