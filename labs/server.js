class Server {
    start () {
        const http = require('http');
        const server = http.createServer((req, res) => {
        const ip = res.socket.remoteAddress;
        const port = res.socket.remotePort;
        res.end(`Your IP address is ${ip} and your source port is ${port}.`);
    }).listen(3000);
        console.log("Server is running at http://127.0.0.1:3000/");
    }
}

module.exports = Server;