import {$authHost, $host} from "./index";
export const createPizza = async (pizza) => {
    const {data} = await $authHost.post('api/pizza/', pizza)
    return data
}

export const deletePizza = async (name) => {
    console.log(name)
    const {data} = await $authHost.post('api/pizza/delete', {name: name})
    return data
}

export const fetchPizzas = async () => {
    const {data} = await $host.get('api/pizza')
    return data
}

export const fetchOnePizza = async (id) => {
    const {data} = await $host.get('api/pizza/' + id)
    return data
}


