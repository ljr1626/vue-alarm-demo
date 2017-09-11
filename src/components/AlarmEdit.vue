<template>
  <div class="new-body">
    <div class="title-bar">
      <flexbox style="justify-content: space-between;">
        <div class="cancel" @click="cancel">
          <router-link to="/home">取消</router-link>
        </div>
        <div class="title">编辑闹钟</div>
        <div class="add" @click="updateAlarm()">
          <router-link to="/home">存储</router-link>
        </div>
      </flexbox>
    </div>
    <div class="content">
      <div class="wrap">
        <group>
          <picker :data='times' v-model='time' ref="picker"></picker>
        </group>
        <flexbox orient="vertical">
          <div class="select-item">
            <group>
              <popup-picker :title="title" :data="list1" v-model="value1"></popup-picker>
            </group>
          </div>
          <div class="select-item later">
            <group style="width: 100%;">
              <x-switch title="稍后提醒" v-model='later' style="background-color: #000; padding: 0;"></x-switch>
            </group>
          </div>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Divider, XSwitch, Group, Scroller, Datetime, Picker, PopupPicker } from 'vux'
  import store from '../store'

  let minute = []
  for (var i = 0; i < 60; i++) {
    var c
    if (i < 10) {
      c = '0' + i
    } else {
      c = i.toString()
    }
    minute.push(c)
  }
  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Divider,
      XSwitch,
      Group,
      Scroller,
      Datetime,
      Picker,
      PopupPicker
    },
    props: ['id'],
    data () {
      return {
        times: [['上午', '下午'], ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'], minute],
        time: ['上午', '6', '30'],
        later: false,
        title: '标签',
        list1: [['闹钟', '工作日上午', '工作日下午', '节假日', '日程']],
        value1: ['闹钟'],
        alarms: store.alarms,
        myNewShow: this.newShow
      }
    },
    watch: {
      newShow (val) {
        this.myNewShow = val
      },
      myNewShow (val) {
        this.$emit('on-result-change', val)
      }
    },
    methods: {
      cancel () {
        this.myNewShow = !this.myNewShow
      },
      updateAlarm () {
        var key = localStorage.key(this.id)
        localStorage.removeItem(key)
        let alarm = {}
        alarm.id = this.time[0] + this.time[1] + ':' + this.time[2]
        alarm.alarmPeriod = this.time[0]
        alarm.alarmTime = this.time[1] + ':' + this.time[2]
        alarm.alarmLabel = this.value1[0]
        alarm.switch = true
        if (this.later === false) {
          alarm.alarmLater = ''
        } else {
          alarm.alarmLater = '，稍后提醒'
        }
        var str = JSON.stringify(alarm)
        localStorage.setItem(alarm.id, str)
      }
    }
  }

</script>

<style lang="less">
  /* @import '~vux/src/styles/1px.less'; */

  @import '../styles/common.css';
  @import '../styles/add.css';
  

</style>
