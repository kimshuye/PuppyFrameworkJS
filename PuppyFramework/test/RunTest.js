class RunTest {

    static GenTestFile () {   
        const GenerateTest = require('./PuppyFramework/test/GenerateTest');
        const {TestList} = require('./config/TestList');
        const genTest = new GenerateTest(TestList);
        genTest.Generate();
    }
}

module.exports = RunTest;