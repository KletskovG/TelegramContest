const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const { Telegraf } = require('telegraf')
const checkBtc = require("./checkBtc");
const PORT = process.env.PORT || 3000

const bot = new Telegraf(process.env.BOT_TOKEN) 
bot.start((ctx) => {
    ctx.reply(ctx.chat.id)
})
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
}


setInterval(() => {
    let result = checkBtc();
    const tz = {
        value: '+3.50',
        str: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg'
    }
    const currentTime = ((new Date().getUTCHours() + parseFloat(tz.value))).toFixed(2)
    if (result > 50000) {
        bot.telegram.sendMessage(503054040, `Bitcoin is near ${result}`);
    } else if (result > 60000) {
        bot.telegram.sendMessage(503054040, `Current Bitcoin price is ${result}`);
    } 
    
    if (currentTime > 10.00) {
        bot.telegram.sendMessage(503054040, `Day is Ending. Bot is fine. Current BTC - ${result}`);
    }
}, 1800000)

http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`)

    // parse URL
    const parsedUrl = url.parse(req.url)

    // extract URL path
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '') 
    let pathname = path.join(__dirname, sanitizePath)


        fs.exists(pathname, function (exist) {
            if(!exist) {
                // if the file is not found, return 404
                res.statusCode = 404
                res.end(`File ${pathname} not found!`)
                return
            }

            // if is a directory, then look for index.html
            if (fs.statSync(pathname).isDirectory()) {
                pathname += '/index.html' 
            }

            // read file from file system
            fs.readFile(pathname, function(err, data){
                if(err){
                    res.statusCode = 500 
                    res.end(`Error getting the file: ${err}.`) 
                } else {
                    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                    const ext = path.parse(pathname).ext 
                    // if the file is found, set Content-type and send data
                    res.setHeader('Content-type', mimeType[ext] || 'text/plain' ) 
                    res.end(data) 
                }
            }) 
        }) 

        if(req.url === '/getData'){
            res.writeHead(200, {'Content-Type': 'text/plain'})
            bot.telegram.sendMessage(503054040, "Command is done")
            res.end()
        }

        if (req.url === '/done') {
            res.writeHead(200, {'Content-Type': 'text/plain'})
            bot.telegram.sendMessage(503054040, "Command is done")
            res.end()
        }

        if (req.url === '/fail') {
            res.writeHead(200, {'Content-Type': 'text/plain'})
            bot.telegram.sendMessage(503054040, "Command is done || Error")
            res.end()
        }


}).listen(PORT) 

console.log('Server listening on port test port here')

