
import ajax from '@/utils/request.js'

// 获取商品详情
export const GetNewInfo= (params) => ajax({
    method: 'get',
    url: '/Storge/GetNewInfo',
    params
})