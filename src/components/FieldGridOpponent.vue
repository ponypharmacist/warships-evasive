<template lang="pug">
  
  .field-grid
    template
      template(v-for="(row, indexRow) in this.getFieldByParams(this.player)")
        div(v-for="(cell, indexCell) in row"
            @click="fireCannon(indexRow, indexCell)"
            :class="{ isShip: cell.ship, mine: cell.mine, dead: cell.dead }")

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'FieldGridOpponent',
  props: {
    player: String,
  },

  computed: {
    ...mapGetters([
      'getFieldByParams',
      'opponentFieldCheck',
      'getDamagedShip',
      'isShipDead',
      'checkWinCondition',
    ]),
  },

  methods: {
    ...mapMutations([
      'sendAlertMessage',
      'placeMine',
      'markShipDamaged',
      'markShipDead',
      'placeDeadTiles',
    ]),

    fireCannon (row, col) {
      let alertResult = 'You miss.'
      // 0. Place a mine mark
      if ( this.opponentFieldCheck(row, col, 'mine') ) {
        alertResult = 'This tile is already hit, try another one.'
      } else {
        this.placeMine({row: row, col: col})
      }
      // 1. Is this a hit?
      if ( this.opponentFieldCheck(row, col, 'ship') ) {
        // 2. Mark ship as isDamaged
        this.markShipDamaged({row: row, col: col})
        alertResult = 'Let them burn!'
        // 3. Is this ship completely dead?
        let damagedShip = this.getDamagedShip(row, col)
        if ( this.isShipDead(damagedShip) ) {
          this.markShipDead(damagedShip)
          this.placeDeadTiles(damagedShip)
          alertResult = 'Ship is down! Rape and pillage!'
          if ( this.checkWinCondition ) {
            alertResult = '>>> YOU WIN <<<'
          }
        }
      }
      // 4. Display alert
      this.sendAlertMessage('Fire the cannon: (' + (row + 1) + ', ' + (col + 1) + ')! ' + alertResult)
    },

  }

}
</script>

<style lang="sass">
</style>
