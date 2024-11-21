class Cost {
    static #staticDesc = 'コスト'

    #name = 'a'
    #price = 0

    constructor(name, price) {
        this.#name = name
        this.#price = price
    }

    set price(price) {
        this.#price = price
    }

    get price() {
        return this.#price
    }

    get name() {
        return this.#name
    }

    static desc() {
        return this.#staticDesc
    }
}

module.exports = {Cost}
