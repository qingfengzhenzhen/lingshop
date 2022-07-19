import ajax from '@/utils/request.js'
// 
export const GetCompanyInfo = () => ajax({
    method: 'get',
    url: '/Storge/GetCompanyInfo',
})
export const SetUserInfo = (data) => ajax({
    method: 'post',
    url: '/Member/UpMember',
    data
})