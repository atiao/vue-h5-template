/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 * @explain 
 *  立即执行版：触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
 *  非立即执行版：触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
 */
const debounce = function (func, wait, immediate) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版（时间戳和定时器版做合并）
 * @explain 时间戳版的函数触发是在时间段内开始的时候，定时器版的函数触发是在时间段内结束的时候。
 */
const throttle = function (func, wait, type) {
    if (type === 1) {
        let previous = 0;
    } else if (type === 2) {
        let timeout;
    }
    return function () {
        let context = this;
        let args = arguments;
        if (type === 1) {
            let now = Date.now();
            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        } else if (type === 2) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}

/**
 * @desc 对象数组去重（根据key值）
 * @param  {arr}： 需要去重的数组，
* *@param  {key}： 按照key值对比
 * @return {返回值类型} Array
 * @explain 数组去重 （ps: 针对复杂数据结构组成的array）。根据需要匹配的key值进行去重。时间复杂度较低。
 */
const uniqueArray = function (arr, key) {
    const map = new Map();
    return arr.filter(
        item => !map.has(item[key] + "") && map.set(item[key] + "", 1)
    );
}
export default {
    debounce,
    throttle,
    uniqueArray
}