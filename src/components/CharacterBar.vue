<template lang="pug">
  
  #character-bar
    #avatar
    input.player-name(value="Flame Princess")
    .player-title as Player One
    #adversary

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CharacterBar',

  computed: {
    ...mapGetters([
    ]),
  },

  methods: {
    ...mapMutations([
      'setShipType',
    ]),
  }

}
</script>

<style lang="sass">
/* Character Bar */
#character-bar
  position: absolute
  background-color: rgba(64,41,22,0.2)
  display: flex
  align-items: center
  width: 60vw
  height: 13vw
  left: 10vw
  top: 4vw
  color: #333
  font-size: 4vw
  border-radius: 0 4vw 0 0

#avatar
  position: relative
  z-index: 10
  width: 15vw
  height: 15vw
  margin-left: -6vw
  background: transparent url('../assets/avatar-1.png') no-repeat 100% 100% / cover
  border-radius: 50%
  border: 5px solid rgba(64,41,22,0.75)

#adversary
  position: relative
  width: 7vw
  height: 7vw
  margin-left: auto
  right: -1.5vw
  bottom: -4.5vw
  background: transparent url('../assets/avatar-2.png') no-repeat 100% 100% / cover
  border-radius: 50%
  border: 3px solid rgba(64,41,22,0.75)

#adversary:before
  position: absolute
  content: 'vs'
  left: -4.5vw
  top: 1.5vw
  font-size: 3vw
  font-weight: bold
  font-family: Georgia, 'Times New Roman', Times, serif

.player-name
  position: relative
  width: 35vw
  z-index: 5
  border: none
  background-color: rgba(169,137,102,0.75)
  padding: 1vw 1vw 1vw 4vw
  margin-left: -2vw
  margin-bottom: 2vw
  color: #333
  font-size: 4vw
  font-family: Georgia, 'Times New Roman', Times, serif
  border-radius: 0 2vw 2vw 0

.player-title
  position: absolute
  z-index: 10
  content: 'as Player One'
  bottom: 1.5vw
  left: 11vw
  padding: 0 0 0 0.25vw
  font-family: Georgia, 'Times New Roman', Times, serif
  font-size: 2vw
  font-weight: bold
  color: rgba(64,41,22,0.8)

</style>
