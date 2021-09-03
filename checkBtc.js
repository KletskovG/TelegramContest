const fetch = require("node-fetch");

// TODO: make this func async and add await to return fetch
const checkBtc = () => {
    return fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => res.json())
    .then(json => {
        const price = json.market_data.current_price.usd;
        console.log(price)
        return price;
    })
    .catch(err => {
        console.log("BTC ERROR")
        console.log(err)
    })
}

module.exports = checkBtc;