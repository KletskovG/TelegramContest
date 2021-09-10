const fetch = require("node-fetch");

const checkBtc = (bot) => {
    setInterval(() => {
        fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
        .then(res => res.json())
        .then(json => {
            const price = json.market_data.current_price.usd;
            console.log(price)
            

            const tz = {
                value: '+3.00',
                str: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg'
            }
            const currentTime = ((new Date().getUTCHours() + parseFloat(tz.value)))
            const currentMinute = new Date().getUTCMinutes() + parseFloat(tz.value);
            const timeResult = parseFloat(`${currentTime}.${currentMinute}`).toFixed(2);
            console.log("UPDATE TIME");
            console.log(timeResult);
            if (price > 50000 && timeResult < 23.00 && timeResult > 6.00) {
                bot.telegram.sendMessage(503054040, `Bitcoin is near ${price}`);
            } else if (price > 60000) {
                bot.telegram.sendMessage(503054040, `Current Bitcoin price is ${price}`);
            } 
            
            if (timeResult > 23.00 && timeResult < 24.00) {
                bot.telegram.sendMessage(503054040, `Day is Ending (${timeResult}). \n Bot is fine. Current BTC - ${price}`);
            }
        })
        .catch(err => {
            console.log("BTC ERROR")
            console.log(err)
        })
    }, 60000 * 30) // 1 minute * 30
}

module.exports = checkBtc;