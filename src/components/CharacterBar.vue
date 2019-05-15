<template lang="pug">
  
  #character-bar
    #avatar(@click="this.toggleSettings" :class="this.$store.state.currentPlayer" :style="this.getCurrentAvatar")
    .name-and-shots
      input.player-name(:value="this.getCurrentPlayerName" @input="this.updatePlayerName")
      .player-stats
        .moves-left ⛵x{{ this.getMovesLeft }}
        .shots-left 💣x{{ this.getShotsLeft }}
    #adversary(:class="this.$store.state.currentPlayer")


</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CharacterBar',

  computed: {
    ...mapGetters([
      'getCurrentPlayerName',
      'getCurrentAvatar',
      'getMovesLeft',
      'getShotsLeft',
    ]),
  },

  methods: {
    ...mapMutations([
      'setShipType',
      'updateCurrentPlayerName',
      'toggleSettings',
    ]),
    updatePlayerName (e) {
      this.updateCurrentPlayerName(e)
    },
  }

}
</script>

<style lang="sass">
/* Character Bar */
$size-vertical: 100vh
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
  top: $vw-unit * 3.5
  color: #422b18
  font-size: $vw-unit * 4
  border-radius: 0 $vw-unit * 4 $vw-unit * 4 0

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
  top: $vw-unit * -1.75
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
  top: $vw-unit * 0.75
  font-size: $vw-unit * 4
  font-weight: bold

.player-name
  position: relative
  width: $vw-unit * 41
  z-index: 5
  border: none
  background-color: rgba(169,137,102,0.75)
  padding: $vw-unit * 1 $vw-unit * 1 $vw-unit * 1 $vw-unit * 4
  margin-left: $vw-unit * -2
  color: #422b18
  font-size: $vw-unit * 4
  border-radius: 0 $vw-unit * 2 $vw-unit * 2 0
  font-family: 'Guerilla', 'Helvetica Neue', Helvetica, Arial, sans-serif

.player-stats
  width: 100%
  text-align: left

.moves-left,
.shots-left
  display: inline-block
  font-size: 60%
  line-height: 90%
  font-weight: bold
  margin-left: $vw-unit * 1.5

</style>
