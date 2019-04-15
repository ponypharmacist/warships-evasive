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
              @click="cell.forbid ? printForbidden() : placeShipHead({row: indexRow, col: indexCell})"
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
    ])
  },

  methods: {
    placeShip() {
      // Place head
      // Calculate and apply forbidden
    },

    ...mapMutations([
      'placeShipHead',
    ]),

    printForbidden() {
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
