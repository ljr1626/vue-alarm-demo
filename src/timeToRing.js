import store from './store'

var moment = require('moment')
function timeToRing () {
  var currentTime = moment().format('ahh:mm:ss')
  var alarmList = store.state.alarms
  var newPeriod
  var timeStr
  var i
  for (i in alarmList) {
    if (alarmList[i].period === '上午') {
      newPeriod = 'am'
    }
    if (alarmList[i].period === '下午') {
      newPeriod = 'pm'
    }
    timeStr = newPeriod + alarmList[i].time + ':00'
    if (currentTime === timeStr && alarmList[i].isOn == true) {
      // alert('time to ring')
      store.state.showModel = !store.state.showModel
    }
  }
}
setInterval(timeToRing, 1000)
clearInterval(timeToRing)

// export default showModel
