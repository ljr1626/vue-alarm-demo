<template>
  <div class="new-body">
    <div class="title-bar">
      <flexbox style="justify-content: space-between;">
        <div class="cancel" @click="cancel"><router-link to="/home"></router-link>取消</router-link></div>
        <div class="title">添加闹钟</div>
        <div class="add" @click="save()"><router-link to="/home">存储</router-link></div>
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
              <x-switch title="稍后提醒" v-model='isDelay' style="background-color: #000; padding: 0;"></x-switch>
            </group>
          </div>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Divider, XSwitch, Group, Scroller, Datetime, Picker, PopupPicker } from 'vux'

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
    props: ['newShow'],
    data () {
      return {
        minute: [minute],
        times: [['上午', '下午'], ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'], minute],
        time: ['上午', '06', '30'],
        isDelay: false,
        title: '标签',
        list1: [['闹钟', '工作日上午', '工作日下午', '节假日', '日程']],
        value1: ['闹钟'],
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
      save () {
        let alarm = {}
        alarm.id = new Date().getTime()
        alarm.period = this.time[0]
        alarm.time = this.time[1] + ':' + this.time[2]
        alarm.label = this.value1[0]
        alarm.isOn = true
        alarm.isDelay = this.isDelay
        // if (this.later === false) {
        //   alarm.isDelay = ''
        // } else {
        //   alarm.isDelay = '，稍后提醒'
        // }
        // var str = JSON.stringify(alarm)
        // localStorage.setItem(localKey, str)
        this.$store.commit('ADD_ALARMS', alarm)
        this.myNewShow = !this.myNewShow
      }
    }
  }

</script>

<style lang="less">
  /* @import '~vux/src/styles/1px.less'; */
  @import '../styles/common.css';
  @import '../styles/add.css';

  .new-body {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
    background-color: #000;
  }
</style>
