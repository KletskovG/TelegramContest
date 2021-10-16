const { Telegraf } = require('telegraf');
const checkBtc = require("./server/checkBtc");
const PORT = process.env.PORT || 3000;

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.launch();

const express = require('express');
const app = express();

app.set('render')

app.get('/', (_, res) => {
    // res.send('./index.html')
    res.send("Infra server is up")
});

app.get('/cd', (_, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    bot.telegram.sendMessage(503054040, "Deploy command is done");
    res.end();
});

app.get('/done', (_, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    bot.telegram.sendMessage(503054040, "Command is done")
    res.end()
})

app.get('/done/:text', (req, res) => {
    const data = `${req.params.text}`;
    bot.telegram.sendMessage(503054040, data)
    res.send(data);
});

app.get('/fail', (_, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    bot.telegram.sendMessage(503054040, "Command is done || Error")
    res.end()
});

app.get('/ping', (_, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    bot.telegram.sendMessage(503054040, "Bot is up")
    res.end()
});

app.listen(PORT, () => console.log(`Server listening to  ${PORT}`));

// checkBtc(bot);
