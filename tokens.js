const API_URL = 'https://api.coingecko.com/api/v3';

module.exports.getTokens = async () => {
    let response = await fetch(`${API_URL}/coins`)
    await console.log(response.json())
    return response.json()
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
    let response = await fetch(`${API_URL}/coins/${code}`)
    return response.json()
}

module.exports.getPrice = async (code) => {
    let t = await this.getToken(code)
    return {
        code: t.id,
        price: t.market_data.current_price.usd
    }
}