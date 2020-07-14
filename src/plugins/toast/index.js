import toast from './toast'
// 初始化vue插件对象
let Toast = {}
// vue插件必须有一个公开的install方法。
// 这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
Toast.install = function (Vue, options) {
    // Vue会在Vue.use()时传递进来，options是全局options
    // 默认选项
    let opts = {
        duration: 3000
    }
    for (let props in options) {
        if (options.hasOwnProperty(props)) {
            opts[props] = options[props]
        }
    }

    // 添加实例方法,在项目中可以使用this.$toast()来调用
    Vue.prototype.$toast = function (message, option) {
        // 上面那个options是全局的，也可以通过局部option来替换全局的
        if (typeof option == 'object') {
            for (let props in option) {
                if (option.hasOwnProperty(props)) {
                    opts[props] = option[props]
                }
            }
        }

        // 创建构造器，Vue.extend就是继承一个vue组件，toastController跟Vue({})返回的对象一样
        const toastController = Vue.extend(toast)

        // 创建完组件实例后，进行挂载到el上
        // 也可以通过new vueModalController({el: document.createElement('div')})进行挂载。
        // 这种写法跟let vueApp = new Vue({...})完全一样
        let instance = new toastController().$mount(document.createElement('div'))

        // 通过instance实例可以修改data里面的数据，message就是从外部调用传进来的
        let $toastMsg = document.getElementsByClassName('vue-toast-msg')

        instance.message = message

        // 创建完实例之后，要把el添加到body中
        if (!$toastMsg.length) {
            document.body.appendChild(instance.$el)

            Vue.nextTick(function () {
                // 默认调用设置显示为show
                instance.visible = true
            })
    
            // 在几s后让弹框隐藏
            setTimeout(function () {
                instance.visible = false
                document.body.removeChild(instance.$el)
            }, opts.duration)
        } else {
            $toastMsg[0].innerHTML = 
            instance.message = message
        }

    }

    // 如果$toast有多个方法，就给$toastl添加子方法。
    // 这样可以调用this.$toast.show()
    Vue.prototype.$toast['show'] = function (message, option) {
        Vue.prototype.$toast(message, option)
    }
}

// 最后将插件到处，在main.js中可以使用Vue.use(Toast)就可以使用啦。
export default Toast
