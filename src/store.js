import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fieldMy: [
      // aTP = allowedToPlace
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: false}, {aTP: false}, {aTP: false}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: false}, {aTP: false}, {aTP: false}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: false}, {aTP: false}, {aTP: false}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}]
    ],
    fieldTheir: [
      // aTP = allowedToPlace
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}],
      [{aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}, {aTP: true}]
    ]
  },
  getters: {
    // getField(player, [one / two]): state => {}
    getMyField: state => {
      let myFieldCells = '';
      for (let i = 0; i < state.fieldMy.length; i++) {
        for (let k = 0; k < state.fieldMy[i].length; k++) {
          let allowed = state.fieldMy[i][k].aTP ? 'allowed' : 'forbidden'
          myFieldCells += '<div class="row' + i + ' col' + k + ' ' + allowed + '">&nbsp;</div> ';
        }
      }
      return myFieldCells;
    },
    getTheirField: state => {
      let theirFieldCells = '';
      for (let i = 0; i < state.fieldTheir.length; i++) {
        for (let k = 0; k < state.fieldTheir[i].length; k++) {
          let allowed = state.fieldTheir[i][k].aTP ? 'allowed' : 'forbidden'
          theirFieldCells += '<div class="row' + i + ' col' + k + ' ' + allowed + '">&nbsp;</div> ';
        }
      }
      return theirFieldCells;
    }
  },
  mutations: {

  },
  actions: {

  }
})
