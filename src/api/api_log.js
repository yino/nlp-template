import request from '@/utils/request'


export function qpsList(params) {
    return request({
        url: 'stat/qps',
        method: 'get',
        params
    })
}

export function requestNum(params) {
    return request({
        url: 'stat/getReqNum',
        method: 'get',
        params
    })
}

export function qpsPeak(params) {
    return request({
        url: 'stat/getQPSPeak',
        method: 'get',
        params
    })
}


export function getSevenDaysRequestNumList(params) {
    return request({
        url: 'stat/getSevenDaysRequestNumList',
        method: 'get',
        params
    })
}