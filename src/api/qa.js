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
// 添加
export function add(data) {
    return request({
        url: "question/add",
        method: "post",
        data
    })
}

// 编辑
export function edit(data) {
    return request({
        url: "question/edit",
        method: "post",
        data
    })
}


// 详情
export function info(id) {
    return request({
        url: "question/info",
        method: "get",
        params: { id, id }
    })
}

// 详情
export function train() {
    return request({
        url: "question/train",
        method: "get"
    })
}

// match
export function match(question){
    return request({
        url: "question/match",
        method: "get",
        params: { question, question }
    })
}

// questionTotal
export function questionTotal(){
    return request({
        url: "question/total",
        method: "get"
    })
}

