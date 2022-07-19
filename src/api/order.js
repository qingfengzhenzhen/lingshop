import ajax from '@/utils/request.js'


// 获取订单列表
export const GetOrderList = (params) => ajax({
    method: 'get',
    url: '/Order/GetOrderList',
    params
})
// 取消订单
export const CancelOrder = (params) => ajax({
    method: 'post',
    url: '/Order/CancelOrder',
    params
})