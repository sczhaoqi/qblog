import {requestService} from './request.js'

// 登录方法
export function updatePage(data) {
    return requestService({
        url: '/api/blog/page',
        method: 'post',
        data: data
    })
}

