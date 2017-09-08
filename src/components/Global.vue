<script>
  const state = {
    alarms: [],
    alarmID: []
  }

  var length = localStorage.length
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i)
    state.alarmID.push(key)
    console.log(key)
  }
  for (var j = 0; j < length; j++) {
    var str = localStorage.getItem(state.alarmID[j])
    var alarm = JSON.parse(str)
    state.alarms.push(alarm)
  }
  export default {
    state
    // watch: {
    //   alarmID: {
    //     handler: function () {
    //       for (var i = 0; i < length; i++) {
    //         var key = localStorage.key(i)
    //         state.alarmID.push(key)
    //         console.log(key)
    //       }
    //     }
    //   },
    //   alarms: {
    //     handler: function () {
    //       for (var j = 0; j < length; j++) {
    //         var str = localStorage.getItem(state.alarmID[j])
    //         var alarm = JSON.parse(str)
    //         state.alarms.push(alarm)
    //       }
    //     }
    //   }
    // }
  }
</script>
