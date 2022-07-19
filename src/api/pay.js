import ajax from '@/utils/request.js'

// 获取商品详情
export const getAttr= (params) => ajax({
    method: 'get',
    url: '/product/GetProductAttr',
    params
})

// 获取商品数据
export const getInfo = (params) => ajax({
    method: 'get',
    url: '/product/GetInfo',
    params
})



// 获取分类
export const GetCategory = (params) => ajax({
    method: 'get',
    url: 'Product/GetCategory',
    params
})

// 获取分类
export const GetCategoryAll = (params) => ajax({
    method: 'get',
    url: 'Product/GetCategoryAll',
    params
})
// 根据分类来获取商品
export const GetProductByCategory = (params) => ajax({
    method: 'get',
    url: '/Product/GetProductByCategory',
    params
})