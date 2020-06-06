var express = require("express");
var router = express.Router();
var fs = require("fs")


router.post("/", (req, res) => {                    // Metodo POST
    let account = req.body;
    fs.readFile(global.fileName, "utf8", (err, data) => {
        if (!err) {
            try {
                let json = JSON.parse(data);
                account = {id: json.nextId++, ...account};
                json.accounts.push(account);

                fs.writeFile(global.fileName, JSON.stringify(json), err => {
                    if (err){
                        res.status(400).send({error: err.message});
                    } else {
                        res.end();
                    }
                });
            } catch (err) {
                res.status(400).send({error: err.message});
            }
        } else {
            res.status(400).send({error: err.message});
        }
    });
});

router.get("/", (_, res) => {                       // Metodo GET
    fs.readFile(global.fileName, "utf8", (err, data) => {
        if(!err) {
            let json = JSON.parse(data)
            delete json.nextId
            res.send(json);
        } else {
            res.status(400).send({error: err.message});
        }
    })
} )

router.get("/:id", (req, res) => {

    res.end();
});

module.exports = router;