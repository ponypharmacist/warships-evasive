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
      'isShotsLeft',
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
      'reduceShotsAvailable',
      'setLastShot',
    ]),

    fireCannon (row, col) {
      let alertResult = 'Мимо.'
      // 0. Check if any shots left for this turn
      if (!this.isShotsLeft) {
        alertResult = 'Пиратский бюджет позволяет тратить лишь одну бомбу в ход, капитан.'
        this.sendAlertMessage(alertResult)
        return
      }
      // 0. Place a mine mark
      if ( this.opponentFieldCheck(row, col, 'mine') || this.opponentFieldCheck(row, col, 'dead') ) {
        alertResult = 'Сюда мы уже стреляли, капитан.'
      } else {
        this.placeMine({row: row, col: col})
        this.reduceShotsAvailable()
        this.setLastShot({row: row + 1, col: col + 1})
      }
      // 1. Is this a hit?
      if ( this.opponentFieldCheck(row, col, 'ship') ) {
        // 2. Mark ship as isDamaged
        this.markShipDamaged({row: row, col: col})
        alertResult = 'Вражеский корабль поражен!'
        // 3. Is this ship completely dead?
        let damagedShip = this.getDamagedShip(row, col)
        if ( this.isShipDead(damagedShip) ) {
          this.markShipDead(damagedShip)
          this.placeDeadTiles(damagedShip)
          alertResult = 'Вражеский корабль потоплен! Насилуйте сундуки и вскрывайте девок!'
          if ( this.checkWinCondition ) {
            alertResult = 'Все враги повержены. Ты - самый крутой пират этих морей, капитан!'
          }
        }
      }
      // 4. Display alert
      this.sendAlertMessage(alertResult)
    },

  }

}
</script>

<style lang="sass">
</style>
