<template lang="pug">

  #app
    #title Warships. Evasive
    #settings ⚙️
    #alerts You miss. Yarr!

    #fieldMy.field-grid(v-html="this.getMyField")
    .fieldExtraLeft Evade!

    #fieldTheir.field-grid(v-html="this.getTheirField")
    .fieldExtraRight Attack!
    
    // img(alt="Vue logo" src="./assets/logo.png")
    // HelloWorld(msg="Welcome to Your Vue.js App")

</template>

<script>
import { mapGetters } from 'vuex'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },

  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'getMyField',
      'getTheirField',
    ])
  }
}
</script>

<style lang="sass">
@import 'sass/reset.sass';
@import 'sass/main.sass';
</style>
