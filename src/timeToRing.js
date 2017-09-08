import store from './store'

var showModel = true

var moment = require('moment')
function timeToRing () {
  var currentTime = moment().format('ahh:mm:ss')
  var alarmList = store.alarms
  var newPeriod
  var timeStr
  var i
  for (i in alarmList) {
    if (alarmList[i].alarmPeriod === '上午') {
      newPeriod = 'am'
    }
    if (alarmList[i].alarmPeriod === '下午') {
      newPeriod = 'pm'
    }
    timeStr = newPeriod + alarmList[i].alarmTime + ':00'
    if (currentTime === timeStr) {
      alert('time to ring')
      showModel = !showModel
    }
  }
}
setInterval(timeToRing, 1000)
clearInterval(timeToRing)

export default showModel
