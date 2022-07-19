// import axios from 'axios'


// // 新客户
// // var url = 'http://39.99.246.93:8881/Website'
// // var url = 'http://192.168.0.77:801/'
// // var url = 'https://api.paibaoex.com/Website'  //派宝  上传用这个
// var url = 'http://8.129.38.70:8008/' // 上传用这个

// const instance = axios.create({
//         baseURL: url, // api的base_url
//         timeout: 10000, // 请求超时时间
//         transformRequest: data => qs.stringify(data), //
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         withCredentials: false
//     })
// // request拦截器
// instance.interceptors.request.use(
//     e => {
//         const token = localStorage.getItem('token')
//         e.params = e.params || {}
//         e.headers = e.headers || {}
//         return e
//     },
//     error => ({ status: 0, msg: error.message })
// )
// instance.interceptors.response.use(function(res) {
//     if (res.data.Rem == 401) {
//         alert(res.data.MsgText);
//         router.push('./load')
//     }
//     return res;
// });

// // respone拦截器
// instance.interceptors.response.use(
//     response => {
//         const resp = response.data
//         if (response.status === 200) {
//             return resp
//         }
//         return resp
//     },
//     error => {
//         console.log('err' + error) // for debug
//         return Promise.reject(error)
//     }
// )
// export default instance

import axios from 'axios'
import store from '../store'
import router from '../router'


const ajax = axios
import {
	Toast
} from "vant";

ajax.create({
	// headers: {
	// 	accept: 'application/json',
	// 	// ContentType:'application/json',
	// },
	// withCredentials: true,
	timeout: 10000, // 请求超时时间
	transformRequest: data => qs.stringify(data), //
	headers: {
		// "Content-Type": "application/x-www-form-urlencoded",
		"Content-Type": "application/json;charset=UTF-8",

	},
	dataType: 'json',
	withCredentials: false
})
ajax.defaults.baseURL = "http://8.129.38.70:8008"
// ajax.defaults.baseURL = process.env.VUE_APP_BASE_API

// ajax.defaults.baseURL = "http://106.52.170.127:8888/api"

//响应拦截。非200错误的弹出提示。
axios.interceptors.response.use(
	(response) => {
		if (response.code == 401 || response.data.code == 401) {
			if (localStorage.getItem("tk")) {
				Toast.fail("登录已过期，请重新登录")
				localStorage.clear("info")
				store.commit("user/setData", null)
				router.push("/login")
			} else {
				Toast.fail("请先登录")
			}
		} else if (response.code == 500) {
			Toast.fail(response.data)
		}

		// 判断请求成功后的参数
		return response.data
	},
	(err) => {
		return err.response
	}
)

// 设置请求拦截器
axios.interceptors.request.use(
	config => {
		let tk = localStorage.getItem('tk')
		if (tk) {
			config.headers["Authorization"] = `Bearer ${tk}`;
		}
		return config
	},
	(err) => {
		return err
	}
)

export default ajax