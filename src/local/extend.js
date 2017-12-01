;
(function() {
    /**
     * 类似于定时器
     */
    let lastTime = 0
    let vendors = ['webkit', 'moz']
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame']
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            let currTime = new Date().getTime()
            let timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
            let id = window.setTimeout(function() {
                callback(currTime + timeToCall)
            }, timeToCall)
            lastTime = currTime + timeToCall
            return id
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id)
        }
    }
    /**
     * 数组是否包含某个字符
     */
    if (!Array.indexOf) {
        Array.prototype.indexOf = function(obj) {
            for (let i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    return i;
                }
            }
            return -1;
        }
    }
}())