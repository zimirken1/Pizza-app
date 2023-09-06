import {makeAutoObservable} from 'mobx'

export default class BasketStore {
    items = []

    constructor() {
        makeAutoObservable(this)
        const basket = JSON.parse(localStorage.getItem('basket'));
        this.items = basket?.items || [];
    }

    addItem(item) {
        this.items.push(item)
        this.saveBasket();
    }

    // removeItem(item) {
    //     this.items = this.items.filter(i => i !== item)
    // }
    removeItem(item) {
        this.items.splice(item, 1);
        // Сохранение корзины в LocalStorage после каждого обновления
        this.saveBasket();
    }


    // get total() {
    //     return this.items.reduce((acc, item) => acc + +item.price, 0)
    // }

    get total() {
        return this.items.reduce((total, item) => total + Number(item.price), 0);
    }

    saveBasket() {
        localStorage.setItem('basket', JSON.stringify({ items: this.items }));
        console.log(localStorage)
    }

    clearBasket() {
        this.items = [];
        localStorage.removeItem('basket')
    }

    isNull() {
        if (this.items.length === 0) {
            return true
        } else {
            return false
        }
    }

}


