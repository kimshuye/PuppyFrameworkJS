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

/*const PuppyFramework = require('puppyframework');
const Server = PuppyFramework.Middlewares.Server;
const MemberRouter = PuppyFramework.Routers.MemberRouter;
const Member = PuppyFramework.BusinessObjects.Member;
const { DbServer, MemberUrl } = require('./config')

const member = new Member(DbServer.dev);
let serverConfig = {
    routeUrl : MemberUrl,
    bizObject : member 
};
let app = new Server();
let router = new MemberRouter(serverConfig);
app.Use(router.Router);
*/


const { Server } = require('PuppyFramework/middleware')
const { MemberRouter } = require('PuppyFramework/router');
const { Member } = require('PuppyFramework/biz')
//const { TransformPathToObject, Execute } = require('./PuppyFramework/facade')
const server = new Server ();
const { DbServer, MemberUrl } = require('./config')
const { FacadeRestApi } = require('PuppyFramework/facade');

/*let Invoke = async(req, res, next) => {
    let paths = req.path.split('/')
   try {
        //transform ojbect
        let { object, method } = await TransformPathToObject(paths);
        console.log(object, method);
        let obj = new object(DbServer.dev);
        //execute
       let result = await Execute({
            object: obj,
            input: req.body,
            method: method
        });
        res.send(result);
    }
    catch(err) {
        res.send(err)
    }
    //transform result
    next()
}*/

const facade = new FacadeRestApi(DbServer.dev);
server.All('/api/:module/:object/:method',facade.Execute);

