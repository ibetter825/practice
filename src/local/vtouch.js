// v-tab事件自定义指令
function isPc () {
  let uaInfo = navigator.userAgent
  let agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (let i = 0; i < agents.length; i++) {
    if (uaInfo.indexOf(agents[i]) > 0) {
      flag = false
      break
    }
  }
  return flag
}
// 判断是否是制定的手势操作类型
function isType (self, type) {
  if (self.disabled) return false
  let evObj = self.evObj
  let res = false
  switch (type) {
    case 'tap':
      res = self.time < 150 && Math.abs(evObj.distanceX) < 2 && Math.abs(evObj.distanceY) < 2
      break
    case 'long':
      res = self.time > 500 && Math.abs(evObj.distanceX) < 2 && Math.abs(evObj.distanceY) < 2
      break
    case 'up':
      res = Math.abs(evObj.distanceX) < 50 && evObj.distanceY > 0
      break
    case 'down':
      res = Math.abs(evObj.distanceX) < 50 && evObj.distanceY < 0
      break
    case 'left':
      res = evObj.distanceX > 0 && Math.abs(evObj.distanceY) < 50
      break
    case 'right':
      res = evObj.distanceX < 0 && Math.abs(evObj.distanceY) < 50
      break
    case 'move':
      res = Math.abs(evObj.distanceX) > 10 || Math.abs(evObj.distanceY) > 10
      break
  }
  return res
}

function touchstart (e, self) {
  let touches = e.touches[0]
  let evObj = self.evObj
  evObj.pageX = touches.pageX
  evObj.pageY = touches.pageY
  evObj.clientX = touches.clientX
  evObj.clientY = touches.clientY
  self.time = +new Date()
}

function touchmove (e, self, type) {
  let touches
  if (e.changedTouches) touches = e.changedTouches[0]
  else touches = e.originalEvent.touches[0]
  let evObj = self.evObj
  evObj.moving = true // true参数只是用来做一个标记，只有在move事件中使用，用于判断是否moving
  evObj.distanceX = evObj.pageX - touches.pageX
  evObj.distanceY = evObj.pageY - touches.pageY
  self.handler[type](e)
}

function touchend (e, self, type) {
  let touches
  if (e.changedTouches) touches = e.changedTouches[0]
  else touches = e.originalEvent.touches[0]
  let evObj = self.evObj
  evObj.moving = false
  self.time = +new Date() - self.time
  evObj.distanceX = evObj.pageX - touches.pageX
  evObj.distanceY = evObj.pageY - touches.pageY
  // 事件类型 tap 点击, long 长点击, up 上滑, down 下滑, left 左滑, right 右滑, move 移动
  if (!isType(self, type)) return
  self.handler[type](e)
}
/**
 * 阻止冒泡
 */
function stopPropagation (e) {
  if (e && e.stopPropagation)
    e.stopPropagation()
  else
    window.event.cancelBubble = true
}
/**
 * 阻止默认事件
 */
function preventDefault (e) {
  if (e && e.preventDefault)
    e.preventDefault()
  else
    window.event.returnValue = false
}

function eventModifier (binding, e) {
  if (binding.modifiers.stop) stopPropagation(e)
  if (binding.modifiers.prevent) preventDefault(e)
}
let bind = {
  bind: function (el, binding, vnode) {
    if (!el.handler) el.handler = {}
    let type = binding.name
    let value = binding.value
    el.evObj = {}
    el.handler[type] = function (e) { // This directive.handler
      if (!value && el.href && !binding.modifiers.prevent) return window.location = el.href
      value.event = e
      value.evObj = el.evObj
      value.methods.call(this, value)
    }
    if (isPc() && type === 'tap') {
      el.addEventListener('click', function (e) {
        if (!value && el.href && !binding.modifiers.prevent) return window.location = el.href
        value.event = e
        value.methods.call(this, value)
      }, true)
    } else {
      el.addEventListener('touchstart', function (e) {
        if (e.cancelable) eventModifier(binding, e)
        touchstart(e, el)
      }, true)
      if (type === 'move') {
        el.addEventListener('touchmove', function (e) {
          if (e.cancelable) eventModifier(binding, e)
          touchmove(e, el, type)
        }, true)
      }
      el.addEventListener('touchend', function (e) {
        Object.defineProperties(e, { // 重写currentTarget对象 与jq相同
          'currentTarget': {
            value: el,
            writable: true,
            enumerable: true,
            configurable: true
          }
        })
        if (e.cancelable) eventModifier(binding, e)
        return touchend(e, el, type)
      }, true)
    }
  }
}

export default {
  tap: bind,
  long: bind,
  left: bind,
  right: bind,
  up: bind,
  down: bind,
  move: bind
}
