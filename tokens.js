const fetch = require("node-fetch");

const API_URL = 'https://api.coingecko.com/api/v3';

async function request(resource, method, body) {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (body) {
        options.body = body
    }
    let res = await fetch(`${API_URL}/${resource}`, options)
    return res.json()
}

module.exports.getTokens = async () => {
    return await request('coins')
}

module.exports.getPrices = async () => {
    let tokens = await this.getTokens()
    return tokens.map(t => {
        return {
            code: t.id,
            price: t.market_data.current_price.usd
        }
    })
}

module.exports.getToken = async (code) => {
    return await request(`/coins/${code}`)
}

module.exports.getPrice = async (code) => {
    let t = await this.getToken(code)
    return {
        code: t.id,
        price: t.market_data.current_price.usd
    }
}