import ajax from '@/utils/request.js'

export const Register = (params) => ajax({
    method: 'post',
    url: '/Member/Register',
    data:params
})


export const login = (params) => ajax({
    method: 'post',
    url: '/Member/login',
    data:params
})