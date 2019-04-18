import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertMessage: 'Yarr!',
    // gameMenu, readyPlayerOne, placeShipsOne, readyPlayerTwo, placeShipsTwo, readyPlayerOne, goPlayerOne, readyPlayerTwo, goPlayerTwo
    currentPhase: 'gameMenu',
    currentPlayer: 'playerOne',
    opponent: 'playerTwo',

    shipPlaceType: 'big',
    shipPlaceOrientation: 'height',

    playerOne: {
      name: 'Flame Princess',
      availableShips: {
        big: 1,
        medium: 2,
        small: 3,
        tiny: 4
      },
      field: [
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}]
      ],
      ships: [],
    },

    playerTwo: {
      name: 'Wolf Girl',
      availableShips: {
        big: 1,
        medium: 2,
        small: 3,
        tiny: 4
      },
      field: [
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],
        [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}]
      ],
      ships: [],
    },
  },
  
  getters: {
    // General Interfrace
    getAlertMessage: (state) => {
      return state.alertMessage
    },

    getCurrentPhase: (state) => {
      return state.currentPhase
    },

    getCurrentPlayer: (state) => {
      return state.currentPlayer
    },

    getCurrentPlayerName: (state) => {
      return state[state.currentPlayer].name
    },

    getOpponent: (state) => {
      return state.opponent
    },

    // Utility and mechanics
    getFieldByParams: (state) => (player) => {
      return state[player].field
    },

    getShipsByPlayer: (state) => (player) => {
      return state[player].ships
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

    getShipsAvailableAll: (state) => {
      let shipsAvailable = state[state.currentPlayer].availableShips
      return (shipsAvailable['big'] + shipsAvailable['medium'] + shipsAvailable['small'] + shipsAvailable['tiny'])
    },

    isTileForbidden: (state) => (row, col) => {
      return state[state.currentPlayer].field[row][col].forbid
    },

    isTileShip: (state) => (row, col) => {
      return state[state.currentPlayer].field[row][col].ship
    },

    opponentFieldCheck: (state) => (row, col, item) => {
      return state[state.opponent].field[row][col][item]
    },

    isControlDisabled: (state) => (row, col, size, direction) => {
      let aField = state[state.currentPlayer].field
      if (direction == 'up' && row - 1 >= 0) {
        if ( aField[row - 1][col].mine ) { return true }
        if ( row - 2 >= 0 && aField[row - 2][col].ship ) { return true }
        if ( row - 2 >= 0 && col - 1 >= 0 && aField[row - 2][col - 1].ship ) { return true }
        if ( row - 2 >= 0 && col + 1 <= 9 && aField[row - 2][col + 1].ship ) { return true }
      } else if (direction == 'down' && row + size <= 9) {
        if ( aField[row + size][col].mine ) { return true }
        if ( row + size + 1 <= 9 && aField[row + size + 1][col].ship ) { return true }
        if ( row + size + 1 <= 9 && col - 1 >= 0 && aField[row + size + 1][col - 1].ship ) { return true }
        if ( row + size + 1 <= 9 && col + 1 <= 9 && aField[row + size + 1][col + 1].ship ) { return true }
      } else if (direction == 'left' && col - 1 >= 0) {
        if ( aField[row][col - 1].mine ) { return true }
        if ( col - 2 >= 0 && aField[row][col - 2].ship ) { return true }
        if ( col - 2 >= 0 && row - 1 >= 0 && aField[row - 1][col - 2].ship ) { return true }
        if ( col - 2 >= 0 && row + 1 <= 9 && aField[row + 1][col - 2].ship ) { return true }
      } else if (direction == 'right' && col + size <= 9) {
        if ( aField[row][col + size].mine ) { return true }
        if ( col + size + 1 <= 9 && aField[row][col + size + 1].ship ) { return true }
        if ( col + size + 1 <= 9 && row - 1 >= 0 && aField[row - 1][col + size + 1].ship ) { return true }
        if ( col + size + 1 <= 9 && row + 1 <= 9 && aField[row + 1][col + size + 1].ship ) { return true }
        return aField[row][col + size].mine ? true : (col + size + 1 <= 9 && aField[row][col + size + 1].ship)
      } else {
        return false
      }
    },

  },

  mutations: {
    // General Interface
    sendAlertMessage: (state, message) => {
      state.alertMessage = message
    },

    setCurrentPhase: (state, phase) => {
      state.currentPhase = phase
    },

    updateCurrentPlayerName: (state, e) => {
      state[state.currentPlayer].name = e.target.value
    },

    // Utility and Mechanics
    setShipType (state, type) {
      state.shipPlaceType = type
    },

    toggleOrientation (state) {
      if (state.shipPlaceOrientation == 'height') {
        state.shipPlaceOrientation = 'width'
      } else {
        state.shipPlaceOrientation = 'height'
      }
    },

    placeMine (state, specs) {
      state[state.opponent].field[specs.row][specs.col].mine = true
    },

    markShipDamaged (state, specs) {
      let theirShips = state[state.opponent].ships
      for (let ship of theirShips) {
        for (let section of ship.tiles) {
          if ( specs.row == section.row && specs.col == section.col ) {
            ship.isDamaged = true
          }
        }
      }
    },

    placeShipHead (state, specs) {
      if (state[state.currentPlayer].availableShips[specs.type] >= 1) {
        let newShip = {
          class: '',
          col: specs.col,
          row: specs.row,
          size: specs.size,
          tiles: specs.tiles,
          style: 'left: ' + (specs.col * 4.4) + 'vw; top: ' + (specs.row * 4.4) + 'vw; ' + specs.orientation + ': ' + (specs.size * 4.4) + 'vw;'
        }
        newShip.class = 'ship-' + state.shipPlaceType + ' ' + specs.orientation
        state[state.currentPlayer].ships.push(newShip)
        state[state.currentPlayer].availableShips[specs.type]--
      } else {
        return
      }
    },

    placeShipTiles (state, shipTiles) {
      for (let tile of shipTiles) {
        state[state.currentPlayer].field[tile.row][tile.col].ship = true
      }
    },

    placeForbiddenTiles (state, forbidTiles) {
      for (let tile of forbidTiles) {
        state[state.currentPlayer].field[tile.row][tile.col].forbid = true
      }
    },

    resetField (state) {
      state[state.currentPlayer].ships = []
      state[state.currentPlayer].availableShips = { big: 1, medium: 2, small: 3, tiny: 4 }
      state[state.currentPlayer].field = [[{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}], [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}], [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}], [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}], [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}], [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}], [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}], [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}],[{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}], [{forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}, {forbid: false, mine: false}]]
    },
  },
  actions: {
    advanceGamePhase (context) {
      switch (context.state.currentPhase) {
        case 'readyPlayerOne':
          context.state.currentPlayer = 'playerOne'
          context.state.opponent = 'playerTwo'
          context.state.currentPhase = 'goPlayerOne'
          break
        case 'readyPlayerTwo':
          context.state.currentPlayer = 'playerTwo'
          context.state.opponent = 'playerOne'
          if (context.getters.getShipsAvailableAll == 0) {
            context.state.currentPhase = 'goPlayerTwo'
          } else {
          context.state.currentPhase = 'placeShipsTwo'
          }
          break
        case 'placeShipsOne':
        case 'goPlayerOne':
          context.state.currentPhase = 'readyPlayerTwo'
          break
        case 'placeShipsTwo':
        case 'goPlayerTwo':
          context.state.currentPhase = 'readyPlayerOne'
          break
        default:
          context.state.currentPhase = 'placeShipsOne'
      }
    }
  }
})
