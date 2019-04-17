<template lang="pug">

  #app(:class="this.getCurrentPhase")
    SplashScreen

    #title Десять кораблей!
    #settings ⚙️
    #alerts {{ this.getAlertMessage }}

    #fieldMy(:class = "this.placeShipTypeClass")
      FieldGrid(:player="this.getCurrentPlayer")
      .ship(v-for="ship in this.getShipsByPlayer(this.getCurrentPlayer)"
            :class="ship.class" 
            :style="ship.style")
        ShipControls(v-if="getCurrentPhase == 'placeShipsOne'" :ship="ship")
    .fieldExtraLeft Evade!

    #fieldTheir
      FieldGrid(:player="this.getOtherPlayer")
      .ship(v-for="ship in this.getShipsByPlayer(this.getOtherPlayer)"
            :class="ship.class" 
            :style="ship.style")
    .fieldExtraRight Attack!
    
    shipSelection

    // img(alt="Vue logo" src="./assets/logo.png")

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SplashScreen from './components/SplashScreen.vue'
import ShipSelection from './components/ShipSelection.vue'
import FieldGrid from './components/FieldGrid.vue'
import ShipControls from './components/ShipControls.vue'

export default {
  name: 'app',
  components: {
    SplashScreen,
    ShipSelection,
    FieldGrid,
    ShipControls
  },

  computed: {
    ...mapGetters([
      'getAlertMessage',
      'getCurrentPhase',
      'getCurrentPlayer',
      'getOtherPlayer',
      'getShipsByPlayer',
      'shipPlaceType',
      'shipPlaceOrientation',
    ]),

    placeShipTypeClass: function() {
      return 'place-' + this.shipPlaceType + ' orient-' + this.shipPlaceOrientation
    }
  },

  methods: {
    ...mapActions([
      'advanceGamePhase',
    ]),

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
