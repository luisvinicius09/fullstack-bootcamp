var express = require('express');
var fs = require('fs'); //filesystem
var accountRouter = require("./routes/account.js");
var app = express();

global.fileName = "accounts.json";

app.use(express.json());
app.use("/account", accountRouter);

app.listen(3000, function() {
    try {
        fs.readFile(global.fileName, "utf8", (err, data) => {
            if (err) {
                const initialJson = {
                    nextId: 1,
                    accounts: []
                };
                fs.writeFile(global.fileName, JSON.stringify(initialJson), err => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
    console.log('API started!');
});