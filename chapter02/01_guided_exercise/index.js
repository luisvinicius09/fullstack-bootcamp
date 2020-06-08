const express = require('express');
const fs = require('fs').promises; //filesystem
const accountRouter = require("./routes/account.js");
const app = express();
const winston = require("winston");

global.fileName = "accounts.json";

const {combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: "my-bank-api-lol"})
    ],
    format: combine (
        label({label: "my-bank-api"}),
        timestamp(),
        myFormat
    )
});

app.use(express.json());
app.use("/account", accountRouter);

app.listen(3000, async () => {
    try {
        await fs.readFile(global.fileName, "utf8");
        logger.info("API Started!");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        fs.writeFile(global.fileName, JSON.stringify(initialJson)).catch(err => {
            logger.error(err);
        });
    }
    console.log('API started!');
});