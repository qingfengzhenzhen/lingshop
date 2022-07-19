import ajax from '@/utils/request.js'
// 注册
export const Register = (params) => ajax({
    method: 'post',
    url: '/Member/Register',
    data:params
})

// 登录
export const login = (params) => ajax({
    method: 'post',
    url: '/Member/login',
    data:params
})