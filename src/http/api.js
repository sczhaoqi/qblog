import {requestService} from './request.js'

export function updatePage(data) {
    return requestService({
        url: '/api/blog/page',
        method: 'post',
        data: data
    })
}
export function findPage(data) {
    return requestService({
        url: '/api/blog/page',
        method: 'get',
        params: data
    })
}
export function pages(data){
    return requestService({
        url: '/api/blog/pages',
        method: 'get',
        params: data
    })
}

export function updatePost(data) {
    return requestService({
        url: '/api/blog/post',
        method: 'post',
        data: data
    })
}
export function findPost(data) {
    return requestService({
        url: '/api/blog/post',
        method: 'get',
        params: data
    })
}
export function posts(data){
    return requestService({
        url: '/api/blog/posts',
        method: 'get',
        params: data
    })
}
export function login(params){
    return requestService({
        url: '/api/auth/login',
        method: 'get',
        params: params
    })
}

export function userInfo(){
    return requestService({
        url: '/api/auth/info',
        method: 'get'
    })
}

export function news(page){
    return requestService({
        url: '/api/xwlb',
        method: 'get',
        params: {
            page: page,
            size: 20
        }
    })
}

