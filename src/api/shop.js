import ajax from '@/utils/request.js'
// 获取商品列表
export const getPay = (data) => ajax({
    method: 'post',
    url: '/Project/GetProject',
    data
})

// 首页轮播图
export const getbanner = (params) => ajax({
    method: 'get',
    url: '/Storge/GetBanner',
    params
})

// 获取功能列表图标
export const geticon = (params) => ajax({
    method: 'get',
    url: '/Storge/GetCategory',
    params
})



// 下单
export const CreateOrder = (data) => ajax({
    method: 'post',
    url: '/Order/CreateOrder',
    data
})
