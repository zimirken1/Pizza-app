import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
export const registration = async (username, password, address, phone) => {
    const {data} = await $host.post('api/user/registration', {username, password, address, phone});
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const login = async (username, password) => {
    const {data} = await $host.post('api/user/login', {username, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchUser = async (id) => {
    const {data} = await $authHost.get('api/user/profile/' + id)
    return data
}

export const changePassword = async (password, id) => {
    //console.log(password)
    const {data} = await $authHost.post('api/user/changePassword', {password: password, id: id})
    return data
}
export const changeAddress = async (address, id) => {
    const {data} = await $authHost.post('api/user/changeAddress', {address: address, id: id})
    return data
}
export const changePhoneNum = async (phone, id) => {
    const {data} = await $authHost.post('api/user/changePhone', {phone: phone, id: id})
    return data
}

export const fetchUsers = async () => {
    const {data} = await $authHost.get('api/user/users')
    return data
}