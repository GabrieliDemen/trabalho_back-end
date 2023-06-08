const server = require("./server");

const porta = "8080";

server.listen(porta, () => {
        console.log("server running on port 8080");
})