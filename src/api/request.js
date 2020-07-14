let host = process.env.VUE_APP_HOST
import axios from "axios";
import $api from "./api";
import Vue from 'vue'
import Router from '../router'

const NO_ERR = 100
axios.defaults.withCredentials = true
axios.defaults.timeout = 3000;

axios.interceptors.response.use(
    // 接口统一拦截器
    response => {
        const data = response.data
        return data
    },
    error => {

    }
)
const get = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.get($api[url], { params }).then((res) => {
            if (res) {
                const { code, data, message } = res.data
                if (code == NO_ERR) {
                    resolve(data)
                } else {
                    reject({ url, code, message })
                }
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

const post = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.post($api[url], params).then((res) => {
            if (res) {
                const { code, data, message } = res.data
                if (code == NO_ERR) {
                    resolve(data)
                } else {
                    reject({ url, code, message })
                }
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

//h5请求客户端共用接口需要传formdata数据
const form = function (url, params) {
    return new Promise((resolve, reject) => {
        axios({
            url: $api[url],
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: params,
            transformRequest: [function (data) {
                let ret = ''
                for (let item in data) {
                    ret += `${encodeURIComponent(item)}=${encodeURIComponent(data[item])}&`
                }
                return ret
            }]
        }).then(res => {
            if (res) {
                const { code, data, message } = res.data
                if (code == NO_ERR) {
                    resolve(data)
                } else {
                    reject({ url, code, message })
                }
            }
        }).catch(err => {
            reject(err)
        })
    })
}

window.onerror = function (message, source, line, column, error) {
    let params = { message, source, line, column, error }
    params.errorType = 'window error'
}

window.addEventListener('unhandledrejection', function (err) {
    let params = {
        errorType: 'unhandledrejection',
        error: err
    }
})

export default {
    get,
    post,
    form
}