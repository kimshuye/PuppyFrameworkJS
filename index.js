/*
const RunLab = require('./labs/runlab');
const lab = new RunLab();

for (let i = 1; i< 14; i++){
    lab.run("lab"+i);
}
*/

/*
const { Server } = require('./server/index');
const server = new Server ();
*/


// var { AsyncLabs } = require('./labs');
// let asyncLabs = new AsyncLabs('mongodbcallback');
// asyncLabs.RunAsyncCallback();

// let asyncLabs = new AsyncLabs('mongodb');
// asyncLabs.RunAsyncPromise();
/*asyncLabs.RunAsyncAwait()
.then(finish => console.log(finish));*/

const { Server } = require('./PuppyFramework/middleware')
let app = new Server();
const { RouterBase } = require('./PuppyFramework/router');
//console.log(RouterBase);

/*const express = require('express');
bodyParser = require('body-parser');

let app = new express();
app.use(bodyParser.json());*/

const { Member } = require('./PuppyFramework/biz')

const config = {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    connectionString: 'mongodb://localhost:27017/membership'
}

const member = new Member(config);

const serverConfig = {
    routeUrl: {
        ADD_URL: '/membership/member/add',
        EDIT_URL: '/membership/member/edit',
        DELETE_URL: '/membership/member/delete',
        GET_URL: '/membership/member/get'
    },
    bizObject: member
}

let router = new RouterBase(serverConfig);
app.Use(router.Router);

//let { router } = require('./PuppyFramework/router/RouterBase')
//console.log(router.Router)
/*app.use(router.Router);
app.listen(3000);
console.log('running at port: 3000');*/
