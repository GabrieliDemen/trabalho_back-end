const express = require("express");
const routerUser = require("./router/user");
const routerRec = require("./router/receita");
const server = new express();

server.use(express.json());
server.use(routerUser);
server.use(routerRec);

module.exports = server;