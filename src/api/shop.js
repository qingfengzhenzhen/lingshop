import ajax from '@/utils/request.js'
// 获取商品列表
export const getPay = (data) => ajax({
    method: 'post',
    url: '/Product/GetProduct',
    dataType: 'jsonp',
    data
})

// 首页轮播图
export const getbanner = (params) => ajax({
    method: 'get',
    dataType: 'jsonp',
    url: '/Storge/GetBanner',
    params
})

//获取品牌商
export const GetBusinessList = (params) => ajax({
    method: 'get',
    url: '/Product/GetBusinessList',
    params
})

// 获取功能列表图标
// export const geticon = (params) => ajax({
//     method: 'get',
//     dataType: 'jsonp',
//     url: '/Storge/GetCategory',
//     params
// })


// 获取第三方
export const GetPlugins = (params) => ajax({
    method: 'get',
    url: '/Storge/GetPlugins',
    params
})

// 获取功能列表
export const GetCategory = (params) => ajax({
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

// 编辑购物车
export const CartChange = (data) => ajax({
    method: 'post',
    url: '/Member/CartChange',
    data
})
// 添加购物车
export const GetMyCartProject = (data) => ajax({
    method: 'post',
    url: '/Member/GetMyCartProduct',
    data
})


// 获取新闻
export const GetNewList = (params) => ajax({
    method: 'get',
    url: "/Storge/GetNewList",
    params
})
