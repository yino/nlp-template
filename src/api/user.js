import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

export function akPage(params) {
    return request({
        url: '/user/ak/page',
        method: 'get',
        params
    })
}

export function akCreate(data) {
    return request({
        url: '/user/ak/add',
        method: 'POST',
        data
    })
}


export function akDelete(id) {
    return request({
        url: '/user/ak/delete',
        method: 'get',
        params: { id: id },
    })
}
export function register(data) {
    return request({
        url: '/register',
        method: 'post',
        data
    })
}