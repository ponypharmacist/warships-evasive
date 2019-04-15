import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPhase: 'placeShipsOne',
    currentPlayer: 'playerOne',
    gamePhases: ['placeShipsOne', 'readyPlayerTwo', 'placeShipsTwo', 'readyPlayerOne', 'goPlayerOne', 'goPlayerTwo'],

    shipPlaceType: 'big',
    shipPlaceOrientation: 'height',

    playerOne: {
      availableShips: {
        big: 1,
        medium: 2,
        small: 3,
        tiny: 4
      },

      fieldMy: [
        [{forbid: true}, {forbid: true}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
        [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
        [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
        [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
        [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
        [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
        [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
        [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
        [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
        [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}]
      ],
      ships: [],
    },

    fieldTheir: [
      [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
      [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
      [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
      [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
      [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
      [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
      [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
      [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
      [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}],
      [{forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}, {forbid: false}]
    ]
  },
  
  getters: {
    getFieldByParams: (state) => (player, field) => {
      return state[player][field]
    },

    getShipsByPlayer: (state) => (player) => {
      return state[player].ships
    },

    getTheirField: state => {
      let theirFieldCells = ''
      for (let i = 0; i < state.fieldTheir.length; i++) {
        for (let k = 0; k < state.fieldTheir[i].length; k++) {
          let allowed = state.fieldTheir[i][k].forbid ? 'allowed' : 'forbidden'
          theirFieldCells += '<div class="row' + i + ' col' + k + ' ' + allowed + '">&nbsp;</div> '
        }
      }
      return theirFieldCells
    },

    shipPlaceType: state => {
      return state.shipPlaceType
    },

    shipPlaceOrientation: state => {
      return state.shipPlaceOrientation
    },

    getShipsAvailableByType: (state) => (type) => {
      return state[state.currentPlayer].availableShips[type]
    },

  },

  mutations: {
    setShipType (state, type) {
      state.shipPlaceType = type;
    },

    toggleOrientation (state) {
      if (state.shipPlaceOrientation == 'height') {
        state.shipPlaceOrientation = 'width'
      } else {
        state.shipPlaceOrientation = 'height'
      }
    },

    placeShipHead (state, coordinates) {
      let type = state.shipPlaceType
      let size = 1
      
      if (state.shipPlaceType == 'big') {
        size = 4
      } else if (state.shipPlaceType == 'medium') {
        size = 3
      } else if (state.shipPlaceType == 'small') {
        size = 2
      } else {
        size = 1
      }

      if (state[state.currentPlayer].availableShips[type] >= 1) {
        let newShip = {
          class: '',
          style: 'left: ' + (coordinates.col * 4.4) + 'vw; top: ' + (coordinates.row * 4.4) + 'vw; ' + state.shipPlaceOrientation + ': ' + (size * 4.4) + 'vw;'
        }
        newShip.class = 'ship-' + state.shipPlaceType + '-' + state[state.currentPlayer].availableShips[type]
        state[state.currentPlayer].ships.push(newShip)
        state[state.currentPlayer].availableShips[type]--
      } else {
        return
      }

      // eslint-disable-next-line
      console.log(coordinates.row, coordinates.col)
    }
  },
  actions: {

  }
})
