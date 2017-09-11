<template>
  <div class="body">
    <div class="title-bar">
      <flexbox style="justify-content: space-between;">
        <div class="edit" @click="trigger" v-model="isEditing">{{ isEditing ? '编辑' : '完成' }}</div>
        <div class="title">闹钟</div>
        <div class="add" @click="add">+</div>
      </flexbox>
    </div>
    <div class="content">
      <div class="wrap">
        <transition name="show-fade">
          <div class="show-model" v-model="showModel" v-if="showModel">
            <div class="model-content">
              <flexbox orient="vertical" style="justify-content: space-between;">
                <div class="show-title">闹钟时间到</div>
                <x-button type="primary">稍后提醒</x-button>
                <x-button type="primary" action-type="button" @click.native="close">关闭闹钟</x-button>
              </flexbox>
            </div>
          </div>
        </transition>
        
        <add-new-item @on-result-change="onResultChange" :newShow="newShow" v-if="newShow"></add-new-item>
        <scroller lock-x height="600px" scrollbar-y ref="scroller">
          <div>
            <transition-group tag="div" name="list">
              <div class="alarm-item" :key="index" v-for="(alarm,index) in this.$store.state.alarms">
                <transition name="show-fade">
                  <x-icon v-if="!show" @click="deleteItem(index, alarm.id)" type="ios-minus" size="30"></x-icon>
                </transition>
                <flexbox style="justify-content: space-between;">
                  <transition-group name="flip-list" tag="div">
                    <div class="time-show" :key="index">
                      <flexbox orient="vertical">
                        <flexbox>
                          <div class="alarm-period">{{ alarm.period }}</div>
                          <div class="alarm-time">{{ alarm.time }}</div>
                        </flexbox>
                        <flexbox>
                          <div class="alarm-label">{{ alarm.label }}</div>
                          <div class="later" v-model="alarm.isDelay">{{ alarm.isDelay ? '，稍后提醒' : '' }}</div>
                        </flexbox>
                      </flexbox>
                    </div>
                  </transition-group>
                  <group>
                    <transition name="show-fade">
                      <x-switch v-if="show" @click.native="itemSwitch(alarm.id)" v-model="alarm.isOn" title="" style="padding-top: 0;"></x-switch>
                    </transition>
                  </group>
                </flexbox>
                <transition name="show-fade">
                  <x-icon v-if="!show" type="ios-arrow-forward" size="30"></x-icon>
                </transition>
                <div class="edit-show" v-if="!show">
                  <router-link :to="'/edit/'+ alarm.id">
                    <div style="height: 100%"></div>
                  </router-link>
                </div>
              </div>
            </transition-group>
            
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import { XButton, Flexbox, FlexboxItem, Divider, XSwitch, Group, Scroller } from 'vux'
  import store from '@/store'
  import timeToRing from '../timeToRing'
  import AddNewItem from '../components/AddNewItem.vue'

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Divider,
      XSwitch,
      Group,
      Scroller,
      XButton,
      AddNewItem
    },
    created:function() {
      var alarm = []
      var str = localStorage.getItem('myAlarms')
      var localAlarm = JSON.parse(str)
      if(localAlarm != null) {
        this.$store.commit('INIT_ALARMS', localAlarm)
      } else {
        this.$store.commit('INIT_ALARMS', alarm)
      }
    },
    data () {
      return {
        value1: true,
        value2: false,
        show: true,
        newShow: false,
        showModel: this.$store.state.showModel,
        isEditing: true,
        // alarms: this.$store.state.alarms
      }
    },
    methods: {
      trigger () {
        this.show = !this.show
        this.isEditing = !this.isEditing
      },
      deleteItem (index) {
        // localStorage.removeItem(id)
        // this.$store.state.alarms.splice(index, 1)
        this.$store.commit('DELETE_ALARMS', index)
      },
      itemSwitch (id) {
        this.$store.commit('SWITCH_CHANGE', id)
      },
      close () {
        this.showModel = !this.showModel
      },
      add () {
        this.newShow = !this.newShow
      },
      onResultChange (val) {
        this.newShow = val
      }
    }
  }

</script>
<style lang="less">
  /* @import '~vux/src/styles/1px.less'; */

  @import '../styles/common.css';

  .alarm-item {
    position: relative;
    border-bottom: 1px solid rgba(102, 102, 102, 0.5);
  }

  .show-model {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(102, 102, 102, 0.5)
  }

  .edit-show {
    position: absolute;
    top: 0;
    left: 50px;
    width: 300px;
    height: 97px;
    z-index: 1;
  }

  .vux-x-icon-ios-minus {
    position: absolute;
    top: 35px;
    fill: #F70968;
  }

  .vux-x-icon-ios-arrow-forward {
    position: absolute;
    top: 35px;
    right: 10px;
    fill: #F70968;
  }

  .show-fade-enter-active,
  .show-fade-leave-active {
    transition: opacity 0.5s;
  }

  .flip-list-move {
    transform: translateX(50px);
    transition: transform 1s;
  }

  .show-fade-enter,
  .show-fade-leave-to {
    opacity: 0;
  }
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.5s;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(50px);
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
  /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
