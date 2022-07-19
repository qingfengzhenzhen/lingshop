import ajax from '@/utils/request.js'


// 获取国家
export const getCountry = (params) => ajax({
    method: 'get',
    url: '/Home/GetCountry',
    params
})

// 获取省/州，城市，区
export const getArea = (params) => ajax({
    method: 'get',
    url: '/Home/GetArea',
    params
})
// 获取省/州，城市，区
export const Address = (data) => ajax({
    method: 'post',
    url: '/Member/Address',
    data
})
// 获取地址
export const getAddress = (params) => ajax({
    method: 'get',
    url: '/Member/GetAddress',
    params
})

// 删除地址
export const delAddress = (params) => ajax({
    method: 'post',
    url: '/Member/DeleteAddress',
    params
})

// 获取默认地址
export const GetDefaultAddress = (params) => ajax({
    method: 'get',
    url: '/Member/GetDefaultAddress',
    params
})
// 设置默认地址
export const SetDefaultAddress = (params) => ajax({
    method: 'post',
    url: '/Member/SetDefaultAddress',
    params
})