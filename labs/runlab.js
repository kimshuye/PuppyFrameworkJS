const {Es6labs, Server} = require('./index');

const labs = new Es6labs();
const app = new Server();

class RunLab {
    run (lab) {
 
        console.log(`------ ${lab} ------`);

        if (lab === "lab1" ) {
            app.start();
        } else if (lab === "lab2") {
            const {number, text, object} = labs.lab2();
            console.log(number, text, object);
        } else if (lab === "lab12") {
            const {op, lhs} = labs.lab12();
            console.log(op, lhs);
        } else {
            labs[lab]();
        }
         
    }
}

module.exports = RunLab;



