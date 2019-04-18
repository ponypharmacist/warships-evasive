<template lang="pug">

  #app(:class="this.getCurrentPhase")
    SplashScreen

    CharacterBar
    #go-button(@click="advanceGamePhase()") Go!
    #settings ⚙️
    #alerts {{ this.getAlertMessage }}

    #fieldMy(:class = "this.placeShipTypeClass")
      FieldGrid(:player="this.getCurrentPlayer")
      .ship(v-for="ship in this.getShipsByPlayer(this.getCurrentPlayer)"
            :class="[ship.classification, ship.isDamaged ? 'isDamaged' : '', ship.isDead ? 'isDead' : '']" 
            :style="ship.style")
        ShipControls(:ship="ship")

    #fieldTheir
      FieldGridOpponent(:player="this.getOpponent")
    
    ShipSelection

    // img(alt="Vue logo" src="./assets/logo.png")

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SplashScreen from './components/SplashScreen.vue'
import CharacterBar from './components/CharacterBar.vue'
import ShipSelection from './components/ShipSelection.vue'
import FieldGrid from './components/FieldGrid.vue'
import FieldGridOpponent from './components/FieldGridOpponent.vue'
import ShipControls from './components/ShipControls.vue'

export default {
  name: 'app',
  components: {
    SplashScreen,
    CharacterBar,
    ShipSelection,
    FieldGrid,
    FieldGridOpponent,
    ShipControls
  },

  computed: {
    ...mapGetters([
      'getAlertMessage',
      'getCurrentPhase',
      'getCurrentPlayer',
      'getOpponent',
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
