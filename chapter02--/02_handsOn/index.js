// import express from "express";
import {promises} from "fs";
// import methodsRouter from "./router/methods.js";
let states = [];
let states2 = [];

const {readFile, writeFile} = promises;

readFile("Estados.json").then(res => {
    const data = JSON.parse(res);

    states = data.map(info => {
        const {ID, Sigla} = info
        return {
            ID,
            Sigla
        }
    })
    states.forEach(state => {

    })
}).catch(err => {
    console.log(err)
})