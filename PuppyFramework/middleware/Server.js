const cors = require('cors');
const customCors = require('./Cors');
const { Session } = require('./Session');

class Server {

    constructor (port = 3001) {
        this.PORT = port;
        const express = require('express');
        this.bodyParser = require('body-parser');

        this.app = new express();
        this.app.use(this.bodyParser.json());
        this.app.use(this.bodyParser.urlencoded({ extended: false }));
        this.app.use(cors(customCors));
        this.app.use(Session);
        this.app.listen(this.PORT);
        console.log(`Service is running on port ${this.PORT}.`)
    }

    Use (object) {
        this.app.use(object);
    }

    All (url, method) {
        this.app.all(url, method);
    }
}

module.exports = Server;