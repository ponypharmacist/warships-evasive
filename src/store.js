import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertMessage: 'Hello, beautiful!',
    turnCount: 0,
    // gameMenu, readyPlayerOne, placeShipsOne, readyPlayerTwo, placeShipsTwo, readyPlayerOne, goPlayerOne, readyPlayerTwo, goPlayerTwo
    currentPhase: 'gameMenu',
    currentPlayer: 'playerOne',
    opponent: 'playerTwo',

    shipPlaceType: 'big',
    shipPlaceOrientation: 'height',

    showSettings: false,

    playerOne: {
      name: 'Лихая Русалка',
      imageUrl: '',
      movesAvailable: 1,
      shotsAvailable: 1,
      lastShot: '',
      availableShips: {
        big: 1,
        medium: 2,
        small: 3,
        tiny: 4
      },
      field: [],
      ships: [],
    },

    playerTwo: {
      name: 'Волчья Голова',
      imageUrl: '',
      movesAvailable: 1,
      shotsAvailable: 1,
      lastShot: '',
      availableShips: {
        big: 1,
        medium: 2,
        small: 3,
        tiny: 4
      },
      field: [],
      ships: [],
    },
  },
  
  getters: {
    // General Interfrace
    getCurrentPlayerName: (state) => {
      return state[state.currentPlayer].name
    },
    
    getCurrentAvatar: (state) => {
      return state[state.currentPlayer].imageUrl ? 'background-image: url(' + state[state.currentPlayer].imageUrl + ');' : ''
    },

    // Utility and mechanics
    isMovesLeft: (state) => {
      return state[state.currentPlayer].movesAvailable > 0
    },

    isShotsLeft: (state) => {
      return state[state.currentPlayer].shotsAvailable > 0
    },

    getMovesLeft: (state) => {
      return state[state.currentPlayer].movesAvailable
    },

    getShotsLeft: (state) => {
      return state[state.currentPlayer].shotsAvailable
    },

    getFieldByParams: (state) => (player) => {
      return state[player].field
    },

    getShipsByPlayer: (state) => (player) => {
      return state[player].ships
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
      let grid = state[state.currentPlayer].field
      // Check for mines and ships in set directions
      if (direction == 'up' && row - 1 >= 0) {
        if ( grid[row - 1][col].mine ) { return true }
        if ( row - 2 >= 0 && grid[row - 2][col].ship ) { return true }
        if ( row - 2 >= 0 && col - 1 >= 0 && grid[row - 2][col - 1].ship ) { return true }
        if ( row - 2 >= 0 && col + 1 <= 9 && grid[row - 2][col + 1].ship ) { return true }
      } else if (direction == 'down' && row + size <= 9) {
        if ( grid[row + size][col].mine ) { return true }
        if ( row + size + 1 <= 9 && grid[row + size + 1][col].ship ) { return true }
        if ( row + size + 1 <= 9 && col - 1 >= 0 && grid[row + size + 1][col - 1].ship ) { return true }
        if ( row + size + 1 <= 9 && col + 1 <= 9 && grid[row + size + 1][col + 1].ship ) { return true }
      } else if (direction == 'left' && col - 1 >= 0) {
        if ( grid[row][col - 1].mine ) { return true }
        if ( col - 2 >= 0 && grid[row][col - 2].ship ) { return true }
        if ( col - 2 >= 0 && row - 1 >= 0 && grid[row - 1][col - 2].ship ) { return true }
        if ( col - 2 >= 0 && row + 1 <= 9 && grid[row + 1][col - 2].ship ) { return true }
      } else if (direction == 'right' && col + size <= 9) {
        if ( grid[row][col + size].mine ) { return true }
        if ( col + size + 1 <= 9 && grid[row][col + size + 1].ship ) { return true }
        if ( col + size + 1 <= 9 && row - 1 >= 0 && grid[row - 1][col + size + 1].ship ) { return true }
        if ( col + size + 1 <= 9 && row + 1 <= 9 && grid[row + 1][col + size + 1].ship ) { return true }
        return grid[row][col + size].mine ? true : (col + size + 1 <= 9 && grid[row][col + size + 1].ship)
      } else {
        return false
      }
    },

    getDamagedShip: (state) => (row, col) => {
      let theirShips = state[state.opponent].ships
      let targetShip = {}
      // Get damaged ship specs
      for (let ship of theirShips) {
        for (let section of ship.tiles) {
          if ( row == section.row && col == section.col ) {
            targetShip = {
              size: ship.size,
              row: ship.row,
              col: ship.col,
              orientation: ship.orientation,
            }
          }
        }
      }
      return targetShip
    },

    isShipDead: (state) => (damagedShip) => {
      let deadTilesCount = 0
      let theirShips = state[state.opponent].ships
      for (let ship of theirShips) {
        if ( damagedShip.row == ship.tiles[0].row && damagedShip.col == ship.tiles[0].col ) {
          if ( damagedShip.orientation == 'height') {
            for (let i = 0; i < damagedShip.size; i++) {
              if ( state[state.opponent].field[damagedShip.row + i][damagedShip.col].ship && state[state.opponent].field[damagedShip.row + i][damagedShip.col].mine ) {
                deadTilesCount++
              }
            }
          } else {
            for (let i = 0; i < damagedShip.size; i++) {
              if ( state[state.opponent].field[damagedShip.row][damagedShip.col + i].ship && state[state.opponent].field[damagedShip.row][damagedShip.col + i].mine ) {
                deadTilesCount++
              }
            }
          }
        }
      }
      return deadTilesCount == damagedShip.size
    },

    checkWinCondition: (state) => {
      let deadShipsNumber = 0
      for (let ship of state[state.opponent].ships) {
        if (ship.isDead) { deadShipsNumber++ }
      }
      return deadShipsNumber == 10
    }

  },

  mutations: {
    // General Interface
    sendAlertMessage (state, message) {
      state.alertMessage = message
    },

    setCurrentPhase (state, phase) {
      state.currentPhase = phase
    },

    updateCurrentPlayerName (state, e) {
      state[state.currentPlayer].name = e.target.value
      localStorage.setItem('TenShipsPlayerOneName', JSON.stringify(state.playerOne.name))
      localStorage.setItem('TenShipsPlayerTwoName', JSON.stringify(state.playerTwo.name))
    },

    updateImageUrlOne (state, e) {
      state.playerOne.imageUrl = e.target.value
      localStorage.setItem('TenShipsPlayerOneImage', JSON.stringify(state.playerOne.imageUrl))
    },
    updateImageUrlTwo (state, e) {
      state.playerTwo.imageUrl = e.target.value
      localStorage.setItem('TenShipsPlayerTwoImage', JSON.stringify(state.playerTwo.imageUrl))
    },
    removeAvatars (state) {
      state.playerOne.name = 'Лихая Русалка'
      state.playerTwo.name = 'Волчья Голова'
      state.playerOne.imageUrl = ''
      state.playerTwo.imageUrl = ''
    },

    populateFieldByPlayer (state, player) {
      let targetPlayer = player ? player : state.currentPlayer
      let tiles = [] 
      for (let i = 0; i < 10; i++) {
        let row = []
        for (let k = 0; k < 10; k++) {
          row.push({forbid: false, mine: false, dead: false})
        }
        tiles.push(row)
      }
      state[targetPlayer].field = tiles
    },

    toggleSettings (state) {
      state.showSettings = !state.showSettings
    },

    // Utility and Mechanics
    setLastShot (state, coordinates) {
      let coordinateLetter = 'A'
      switch (coordinates.col) {
        case 1: coordinateLetter = 'A'; break
        case 2: coordinateLetter = 'B'; break
        case 3: coordinateLetter = 'C'; break
        case 4: coordinateLetter = 'D'; break
        case 5: coordinateLetter = 'E'; break
        case 6: coordinateLetter = 'F'; break
        case 7: coordinateLetter = 'G'; break
        case 8: coordinateLetter = 'H'; break
        case 9: coordinateLetter = 'I'; break
        case 10: coordinateLetter = 'J'; break
      }
      state[state.currentPlayer].lastShot = coordinateLetter + coordinates.row
    },

    reduceMovesAvailable (state) {
      state[state.currentPlayer].movesAvailable--
    },

    reduceShotsAvailable (state) {
      state[state.currentPlayer].shotsAvailable--
    },

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
            return
          }
        }
      }
    },

    markShipDead (state, deadShip) {
      let theirShips = state[state.opponent].ships
      for (let ship of theirShips) {
        if ( deadShip.row == ship.tiles[0].row && deadShip.col == ship.tiles[0].col ) {
          ship.isDead = true
          return
        }
      }
    },

    placeDeadTiles (state, deadShip) {
      let deadTiles = []

      if (deadShip.orientation == 'width') {
        let rowWidth = deadShip.size + 2
        for (let i = 0; i < rowWidth; i++) {
          if ( 0 <= (deadShip.row - 1) && 0 <= (deadShip.col - 1 + i) && (deadShip.col - 1 + i) <= 9 ) {
            deadTiles.push({ row: deadShip.row - 1, col: deadShip.col - 1 + i })
          }
          if ( (deadShip.row + 1) <= 9 && 0 <= (deadShip.col - 1 + i) && (deadShip.col - 1 + i) <= 9 ) {
            deadTiles.push({ row: deadShip.row + 1, col: deadShip.col - 1 + i })
          }
        }
        if( 0 <= (deadShip.col - 1) ) { deadTiles.push({ row: deadShip.row, col: deadShip.col - 1 }) }
        if( (deadShip.col + deadShip.size) <= 9 ) { deadTiles.push({ row: deadShip.row, col: deadShip.col + deadShip.size }) }
      } else {
        let rowHeight = deadShip.size + 2
        for (let j = 0; j < rowHeight; j++) {
          if ( 0 <= (deadShip.col - 1) && 0 <= (deadShip.row - 1 + j) && (deadShip.row - 1 + j) <= 9 ) {
            deadTiles.push({ col: deadShip.col - 1, row: deadShip.row - 1 + j })
          }
          if ( (deadShip.col + 1) <= 9 && 0 <= (deadShip.row - 1 + j) && (deadShip.row - 1 + j) <= 9 ) {
            deadTiles.push({ col: deadShip.col + 1, row: deadShip.row - 1 + j })
          }
        }
        if( 0 <= (deadShip.row - 1) ) { deadTiles.push({ row: deadShip.row - 1, col: deadShip.col }) }
        if( (deadShip.row + deadShip.size) <= 9 ) { deadTiles.push({ row: deadShip.row + deadShip.size, col: deadShip.col }) }
      }

      for (let tile of deadTiles) {
        state[state.opponent].field[tile.row][tile.col].dead = true
      }
    },

    placeShipHead (state, specs) {
      if (state[state.currentPlayer].availableShips[specs.type] >= 1) {
        let newShip = {
          classification: '',
          col: specs.col,
          row: specs.row,
          size: specs.size,
          orientation: specs.orientation,
          tiles: specs.tiles,
          isDamaged: false,
          isDead: false,
          style: 'left: ' + (specs.col * 10) + '%; top: ' + (specs.row * 10) + '%; ' + specs.orientation + ': ' + (specs.size * 10) + '%;'
        }
        newShip.classification = 'ship-' + state.shipPlaceType + ' ' + specs.orientation
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

    moveShipTiles (state, movingShip) {
      let myShips = state[state.currentPlayer].ships
      // Get damaged ship specs
      for (let ship of myShips) {
        if ( movingShip.row == ship.row && movingShip.col == ship.col ) {
          if ( movingShip.direction == 'up' ) {
            // mark new ship cell and unmark old ship cell
            state[state.currentPlayer].field[ship.row - 1][ship.col].ship = true
            state[state.currentPlayer].field[ship.row - 1 + ship.size][ship.col].ship = false
            // change ship coordinates
            ship.row--
            // pop'n'shift or push'n'unshift ship tiles array
            ship.tiles.pop()
            ship.tiles.unshift({row: ship.row, col: ship.col })
          } else if ( movingShip.direction == 'down' ) {
            state[state.currentPlayer].field[ship.row + ship.size][ship.col].ship = true
            state[state.currentPlayer].field[ship.row][ship.col].ship = false
            ship.tiles.shift()
            ship.tiles.push({row: ship.row + ship.size, col: ship.col })
            ship.row++
          } else if ( movingShip.direction == 'left' ) {
            state[state.currentPlayer].field[ship.row][ship.col - 1].ship = true
            state[state.currentPlayer].field[ship.row][ship.col - 1 + ship.size].ship = false
            ship.col--
            ship.tiles.pop()
            ship.tiles.unshift({row: ship.row, col: ship.col })
          } else if ( movingShip.direction == 'right' ) {
            state[state.currentPlayer].field[ship.row][ship.col + ship.size].ship = true
            state[state.currentPlayer].field[ship.row][ship.col].ship = false
            ship.tiles.shift()
            ship.tiles.push({row: ship.row, col: ship.col + ship.size })
            ship.col++
          }
          ship.style = 'left: ' + (ship.col * 10) + '%; top: ' + (ship.row * 10) + '%; ' + ship.orientation + ': ' + (ship.size * 10) + '%;'
          return
        }
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
    },
  },


  actions: {
    loadLocalData (context) {
      // Player One
      if ( JSON.parse( localStorage.getItem('TenShipsPlayerOneName') ) ) {
        context.state.playerOne.name = JSON.parse(localStorage.getItem('TenShipsPlayerOneName'))
      }
      if ( JSON.parse( localStorage.getItem('TenShipsPlayerOneImage') ) ) {
        context.state.playerOne.imageUrl = JSON.parse(localStorage.getItem('TenShipsPlayerOneImage'))
      }
      // Player Two
      if ( JSON.parse( localStorage.getItem('TenShipsPlayerTwoName') ) ) {
        context.state.playerTwo.name = JSON.parse(localStorage.getItem('TenShipsPlayerTwoName'))
      }
      if ( JSON.parse( localStorage.getItem('TenShipsPlayerTwoImage') ) ) {
        context.state.playerTwo.imageUrl = JSON.parse(localStorage.getItem('TenShipsPlayerTwoImage'))
      }
    },

    advanceGamePhase (context) {
      // Advance game phases logic
      switch (context.state.currentPhase) {
        case 'readyPlayerOne':
          context.state.currentPlayer = 'playerOne'
          context.state.opponent = 'playerTwo'
          context.state.currentPhase = 'goPlayerOne'
          context.state.turnCount++
          context.state.alertMessage = 'Шел ' + context.state.turnCount + '-й день сражений. '
          if (context.state[context.state.opponent].lastShot) {
            context.state.alertMessage += context.state[context.state.opponent].name + ' шлет привет в сектор ' + context.state[context.state.opponent].lastShot + '.'
          }
          context.state[context.state.currentPlayer].movesAvailable = 1
          context.state[context.state.currentPlayer].shotsAvailable = 1
          break
        case 'readyPlayerTwo':
          context.state.currentPlayer = 'playerTwo'
          context.state.opponent = 'playerOne'
          context.state.alertMessage = 'Yarr!'
          if (context.getters.getShipsAvailableAll == 0) {
            context.state.currentPhase = 'goPlayerTwo'
            context.state[context.state.currentPlayer].movesAvailable = 1
            context.state[context.state.currentPlayer].shotsAvailable = 1
            context.state.alertMessage = 'Шел ' + context.state.turnCount + '-й день сражений. '
            if (context.state[context.state.opponent].lastShot) {
              context.state.alertMessage += context.state[context.state.opponent].name + ' шлет привет в сектор ' + context.state[context.state.opponent].lastShot + '.'
            }
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
    },
  }
})
