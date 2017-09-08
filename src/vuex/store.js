import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 需要维护的状态
const state = {
  // notes: [],
  // activeNote: {},
  // show: ''
  alarms: [],
  alarmID: [],
  index: 0
};

const mutations = {
  // 初始化 state
  INIT_STORE(state, data) {
    state.alarms = data.alarms,
  },
  // 新增
  NEW_ITEM(state) {
    var newItem = {
      id: +new Date(),
      period: '',
      time: '',
      label: '',
      switch: true,
      later: false
    };
    state.alarms.push(newItem);
  },
  // 修改
  EDIT_ITEM(state, alarm) {
    // 修改原始数据
    for (var i = 0; i < state.alarms.length; i++) {
      if (state.alarms[i].id === alarm.id) {
        state.alarms[i] = alarm;
        break;
      }
    };
  },
  // 删除
  DELETE_ITEM(state) {
    state.alarm.$remove(state.activeNote);
  },
};

export default new Vuex.Store({
  state,
  mutations
});