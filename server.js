const express = require("express");

const projectRouter = require("./routers/project-router");
const actionRouter = require("./routers/actions-router")

const server = express()

server.use(express.json());

server.use(projectRouter)
server.use(actionRouter)

server.get("/", (req, res) => {
    res.send(200).json({
        message: "Success!"
    })
})

module.exports = server