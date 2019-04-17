<template lang="pug">

  #app
    #title Десять кораблей!
    #settings ⚙️
    #alerts {{ this.getAlertMessage }}

    #fieldMy(:class = "this.placeShipTypeClass")
      .ship(v-for="ship in this.getShipsByPlayer('playerOne')"
            :class="ship.class" 
            :style="ship.style")
      FieldGrid(:field="'fieldMy'")
    .fieldExtraLeft Evade!

    #fieldTheir
      FieldGrid(:field="'fieldMy'")
    .fieldExtraRight Attack!
    
    // shipSelection

    // img(alt="Vue logo" src="./assets/logo.png")

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ShipSelection from './components/ShipSelection.vue'
import FieldGrid from './components/FieldGrid.vue'

export default {
  name: 'app',
  components: {
    ShipSelection,
    FieldGrid
  },

  data() {
    return {
      alertMessage: 'Yarr!',
    }
  },

  mounted() {
  },

  computed: {
    ...mapGetters([
      'getAlertMessage',
      'getTheirField',
      'getFieldByParams',
      'getShipsByPlayer',
      'shipPlaceType',
      'shipPlaceOrientation',
    ]),

    placeShipTypeClass: function() {
      return 'place-' + this.shipPlaceType + ' orient-' + this.shipPlaceOrientation
    }
  },

  methods: {

    ...mapMutations([
      'setShipType',
    ]),

    printForbidden () {
      this.alertMessage = 'This place is not empty!';
    },
  }

}
</script>

<style lang="sass">
@import 'sass/reset.sass';
@import 'sass/main.sass';
</style>
