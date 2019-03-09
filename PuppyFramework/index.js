const { Server } = require('./middleware')
const { MemberRouter } = require('./router');
const { Member } = require('./biz')

module.exports = {
    Middlewares: {
        Server
    },
    Routers: {
        MemberRouter
    },
    BusinessObjects: {
        Member
    }
}