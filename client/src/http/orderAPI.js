import {$authHost} from "./index";
export const createOrder = async (order) => {
    console.log(order)
    const {data} = await $authHost.post('api/order', order)
    return data
}
export const fetchUserOrders = async () => {
    const {data} = await $authHost.get('/api/order/')
    return data
}

export const fetchOrders = async () => {
    const {data} = await $authHost.get('/api/order/getAll')
    return data
}

export const finishOrder = async (id) => {
    const {data} = await $authHost.post('/api/order/finish', {id: id})
    return data
}

