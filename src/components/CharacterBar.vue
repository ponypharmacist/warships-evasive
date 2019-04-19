<template lang="pug">
  
  #character-bar
    #avatar(:class="this.getCurrentPlayer")
    input.player-name(:value="this.getCurrentPlayerName" @input="this.updatePlayerName")
    .player-title  as {{ this.getCurrentPlayer == 'playerOne' ? 'Player One' : 'Player Two' }}
    #adversary(:class="this.getCurrentPlayer")

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CharacterBar',

  computed: {
    ...mapGetters([
      'getCurrentPlayer',
      'getCurrentPlayerName',
    ]),
  },

  methods: {
    ...mapMutations([
      'setShipType',
      'updateCurrentPlayerName',
    ]),
    updatePlayerName (e) {
      this.updateCurrentPlayerName(e)
    }
  }

}
</script>

<style lang="sass">
/* Character Bar */
$size-vertical: 95vh
$vh-unit: $size-vertical / 100
$vw-unit: $size-vertical / 100 * 1.333

#character-bar
  position: absolute
  background-color: rgba(64,41,22,0.2)
  display: flex
  align-items: center
  width: $vw-unit * 60
  height: $vw-unit * 13
  left: $vw-unit * 10
  top: $vw-unit * 4
  color: #333
  font-size: $vw-unit * 4
  border-radius: 0 $vw-unit * 4 0 0

#avatar
  position: relative
  z-index: 10
  width: $vw-unit * 15
  height: $vw-unit * 15
  margin-left: $vw-unit * -6
  background: transparent url('../assets/avatar-1.png') no-repeat 100% 100% / cover
  border-radius: 50%
  border: 5px solid rgba(64,41,22,0.75)

#adversary
  position: relative
  width: $vw-unit * 7
  height: $vw-unit * 7
  margin-left: auto
  right: $vw-unit * -1.5
  bottom: $vw-unit * -4.5
  background: transparent url('../assets/avatar-2.png') no-repeat 100% 100% / cover
  border-radius: 50%
  border: 3px solid rgba(64,41,22,0.75)

#avatar.playerTwo
  background: transparent url('../assets/avatar-2.png') no-repeat 100% 100% / cover

#adversary.playerTwo
  background: transparent url('../assets/avatar-1.png') no-repeat 100% 100% / cover

#adversary:before
  position: absolute
  content: 'vs'
  left: $vw-unit * -4.5
  top: $vw-unit * 1.5
  font-size: $vw-unit * 3
  font-weight: bold
  font-family: Georgia, 'Times New Roman', Times, serif

.player-name
  position: relative
  width: $vw-unit * 35
  z-index: 5
  border: none
  background-color: rgba(169,137,102,0.75)
  padding: $vw-unit * 1 $vw-unit * 1 $vw-unit * 1 $vw-unit * 4
  margin-left: $vw-unit * -2
  margin-bottom: $vw-unit * 2
  color: #333
  font-size: $vw-unit * 4
  font-family: Georgia, 'Times New Roman', Times, serif
  border-radius: 0 $vw-unit * 2 $vw-unit * 2 0

.player-title
  position: absolute
  z-index: 10
  content: 'as Player One'
  bottom: $vw-unit * 1.5
  left: $vw-unit * 11
  padding: 0 0 0 $vw-unit * 0.25
  font-family: Georgia, 'Times New Roman', Times, serif
  font-size: $vw-unit * 2
  font-weight: bold
  color: rgba(64,41,22,0.8)

</style>
