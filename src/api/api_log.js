import request from '@/utils/request'


export function qpsList(params) {
    return request({
        url: 'stat/qps',
        method: 'get',
        params
    })
}
