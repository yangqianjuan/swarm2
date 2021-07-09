export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function parseIntervals(data) {
  if (data === '' || data === undefined) {
    return
  }
  const day = parseInt(data / 86400)
  const hour = (Array(2).join('0') + parseInt((data % 86400) / 3600)).slice(-2)
  const minute = (Array(2).join('0') + parseInt((data % 3600) / 60)).slice(-2)
  const second = (Array(2).join('0') + parseInt(data % 60)).slice(-2)
  return day + '天' + hour + ':' + minute + ':' + second
}
// 获取 N 天 前的日期
export function getPreNday(n) {
  var currentDate = new Date()
  // 一天的毫秒数
  var millisecond = 1000 * 60 * 60 * 24
  var day = formatDate(new Date(currentDate - n * millisecond), 'yyyy-MM-dd')
  return day
}
// 获取昨日的日期
export function getYestoday() {
  var currentDate = new Date()
  var yestoday = new Date(currentDate - 24 * 3600 * 1000)
  var year1 = yestoday.getFullYear()
  var month1 =
    yestoday.getMonth() + 1 >= 10
      ? yestoday.getMonth() + 1
      : '0' + (yestoday.getMonth() + 1)
  var day1 =
    yestoday.getDate() + 1 >= 10 ? yestoday.getDate() : '0' + yestoday.getDate()
  var t1 = year1 + '-' + month1 + '-' + day1
  return t1
}

// 获取前七日的日期
export function getSevenDays() {
  var currentDate = new Date()
  var oneweekdate = new Date(currentDate - 7 * 24 * 3600 * 1000)
  var year1 = oneweekdate.getFullYear()
  var month1 =
    oneweekdate.getMonth() + 1 >= 10
      ? oneweekdate.getMonth() + 1
      : '0' + (oneweekdate.getMonth() + 1)
  var day1 =
    oneweekdate.getDate() + 1 >= 10
      ? oneweekdate.getDate()
      : '0' + oneweekdate.getDate()
  var t1 = year1 + '-' + month1 + '-' + day1
  return t1
}

/**
 * 获得前N周的起止日期
 * **/
export function getPreviousWeek(weekNum) {
  // 起止日期数组
  // eslint-disable-next-line no-array-constructor
  var startStop = new Array()
  // 获取当前时间
  var currentDate = new Date()
  // 获取当前时间是一周的第几天，也是要减去的天数
  var minusDay = currentDate.getDay() % 7
  // 一天的毫秒数
  var millisecond = 1000 * 60 * 60 * 24
  // 获得当前周的第一天
  var currentWeekDayOne = new Date(
    currentDate.getTime() - millisecond * (minusDay - 1)
  )
  // 前N周的第一天即前N周最后一天的前六天
  var priorWeekFirstDay = new Date(
    currentWeekDayOne.getTime() - millisecond * 7 * weekNum
  )
  // 前N周最后一天即前N-1周开始的前一天
  var priorWeekLastDay = new Date(priorWeekFirstDay.getTime() + millisecond * 6)

  var year1 = priorWeekLastDay.getFullYear()
  var month1 = priorWeekLastDay.getMonth()
  month1 = month1 + 1 >= 10 ? month1 + 1 : '0' + (month1 + 1)
  var day1 = priorWeekLastDay.getDate()
  day1 = day1 >= 10 ? day1 : '0' + day1
  var last = year1 + '-' + month1 + '-' + day1

  var year2 = priorWeekFirstDay.getFullYear()
  var month2 = priorWeekFirstDay.getMonth()
  month2 = month2 + 1 >= 10 ? month2 + 1 : '0' + (month2 + 1)
  var day2 = priorWeekFirstDay.getDate()
  day2 = day2 >= 10 ? day2 : '0' + day2
  var first = year2 + '-' + month2 + '-' + day2
  // 添加至数组
  startStop.push(first)
  startStop.push(last)

  return startStop
}

/**
 * 获得前N月的起止日期
 * **/
export function getPreviousMonth(monthNum) {
  // 起止日期数组
  // eslint-disable-next-line no-array-constructor
  var startStop = new Array()
  // 获取当前时间
  var currentDate = new Date()
  var year = currentDate.getFullYear() // 获取当前日期的年份
  var month = currentDate.getMonth() // 获取当前日期的月份
  var year2 = year
  var month2 = parseInt(month) - monthNum + 1
  if (month2 <= 0) {
    year2 = parseInt(year2) - 1
    month2 = 12 - (Math.abs(month2) % 12)
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  // 一天的毫秒数
  var millisecond = 1000 * 60 * 60 * 24
  // 获得前N月的第一天
  var MonthDayOne = year2 + '-' + month2 + '-' + '01'
  // 获得前N-1月的第一天的前一天，即前N月的最后一天
  var day2 = new Date(new Date(year2, month2, '01').getTime() - millisecond)
  day2 = day2.getDate()
  day2 = day2 < 10 ? '0' + day2 : day2
  var MonthLastDay = year2 + '-' + month2 + '-' + day2
  // 添加至数组
  startStop.push(MonthDayOne)
  startStop.push(MonthLastDay)
  return startStop
}
// 获取当前日期前N个月的日期
export function getPreMonthDay(date, monthNum) {
  var dateArr = date.split('-')
  var year = dateArr[0] // 获取当前日期的年份
  var month = dateArr[1] // 获取当前日期的月份
  var day = dateArr[2] // 获取当前日期的日
  var year2 = year
  var month2 = parseInt(month) - monthNum
  if (month2 <= 0) {
    year2 = parseInt(year2) - 1
    month2 = 12 - (Math.abs(month2) % 12)
  }
  var day2 = day
  var days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  var t2 = year2 + '-' + month2 + '-' + day2
  return t2
}
