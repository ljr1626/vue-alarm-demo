/* const state = {
  alarms: [],
  alarmID: [],
  show: true
}

var length = localStorage.length
for (var i = 0; i < length; i++) {
  var key = localStorage.key(i)
  state.alarmID.push(key)
}
for (var j = 0; j < length; j++) {
  var str = localStorage.getItem(state.alarmID[j])
  var alarm = JSON.parse(str)
  state.alarms.push(alarm)
}

export default state */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    alarms: [],
    // alarmID: [],
    // show: true
    showModel: false
  },
  getters: {
    
  },
  mutations: {
    ADD_ALARMS(state, alarm) {
      state.alarms.push(alarm)
      var str = JSON.stringify(state.alarms)
      localStorage.setItem('myAlarms', str)
    },
    EDIT_ALARMS(state, newAlarm) {
      // state.alarms.forEach(v => {
      //   if (v.id == newAlarm.id){
      //     v = newAlarm
      //   }
      // })
      for(var i = 0; i < state.alarms.length; i++) {
        if (state.alarms[i].id == newAlarm.id) {
          state.alarms[i] = newAlarm
        }
      }
      var str = JSON.stringify(state.alarms)
      localStorage.setItem('myAlarms', str)
    },
    DELETE_ALARMS(state, index) {
      state.alarms.splice(index, 1)
      var str = JSON.stringify(state.alarms)
      localStorage.setItem('myAlarms', str)
    },
    SWITCH_CHANGE(state, newID){
      for (var i = 0; i < state.alarms.length; i++) {
        if (state.alarms[i].id == newID) {
          state.alarms[i].isOn = !state.alarms[i].isOn
        }
      }
      var str = JSON.stringify(state.alarms)
      localStorage.setItem('myAlarms', str)
    },
    INIT_ALARMS(state, data) {
      state.alarms = data
    }
  }
})

export default store

