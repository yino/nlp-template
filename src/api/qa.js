import request from '@/utils/request'

export function getList(params) {
    return request({
        url: 'question/index',
        method: 'get',
        params
    })
}

export function deleteQa(id) {
    return request({
        url: 'question/delete',
        method: 'get',
        params: { id: id },
    })
}