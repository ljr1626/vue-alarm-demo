<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


  export default {
    name: 'app'
    // beforeRouteEnter: (to, from, next) => {
    //   next(vm => {
    //   })
    // },
    // beforeRouteLeave: (to, from, next) => {
    //   localStorage.setItem
    // }
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
