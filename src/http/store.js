import Cookie from 'js-cookie'

export function getUserInfo(){
    if(!sessionStorage.getItem("user")){
        return null
    }
    return JSON.parse(sessionStorage.getItem("user"))
}
export function setUserInfo(info){
    return sessionStorage.setItem("user", JSON.stringify(info))
}

export function getToken(){
    return sessionStorage.getItem("token")
}
export function setToken(info){
    Cookie.set('token', info)
    return sessionStorage.setItem("token", info)
}

