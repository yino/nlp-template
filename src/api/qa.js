import request from '@/utils/request'

export function getList(params) {
    return request({
        url: 'question/index',
        method: 'get',
        params
    })
}