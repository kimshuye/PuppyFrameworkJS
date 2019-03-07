class AsyncLabs {

    set DataAdapter (dataAdapter) {
        this._dataAdapter = dataAdapter;
    }

    get DataAdapter () {
        return this._dataAdapter;
    }

    constructor (dbtype) {
        const { DbServer } = require('../config');
        const { DataAdapter } = require('../dal');
        const { connectionString } = DbServer.dev;
        const collectionName = 'members';
        let config = { connectionString, collectionName };
        config.type = dbtype;
        config.dbName ='membership';
        this.DataAdapter = new DataAdapter (config);
        this.Faker = require('faker');
    }

    RandomInsertData (total) {
        let data = [];
       
        for(let i =0; i < total; i++){
           let user = this.Faker.Helpers.userCard();
            data.push(user);
        }

        return data;
    }

    RandomUpdateData (email) {
        let dataWithCondition = {
            data: {
                firstName: '',
                lastName: '',
                email: ''
            },
            condition: {
                email: email
            },
            option: {
                multi: true
            }
        }

        dataWithCondition.data.firstName = this.Faker.Name.firstName();
        dataWithCondition.data.lastName = this.Faker.Name.lastName();
        dataWithCondition.data.email = this.Faker.Internet.email();

        return dataWithCondition;
    }

    PrepareData () {
        const data = this.RandomInsertData(10);
        const updateData = this.RandomUpdateData(data[5].email);
        const deleteData = {
            condition: data[7]
        }
        return {
            data,
            updateData,
            deleteData
        }
    }

    RunAsyncCallback () {
        const dbo = this.DataAdapter.dbo;
        const {data, updateData, deleteData } = this.PrepareData();

        dbo.Open((connected) => { console.log(`connected: ${connected}`) ;
            dbo.Insert(data, (inserted) => {
                console.log(`inserted: ${JSON.stringify(inserted)}`);
                dbo.Update(updateData,(updated)=> {
                    console.log(`updated: ${updated}`);
                    dbo.Remove(deleteData,(deleted) => {
                        console.log(`deleted: ${deleted}`);
                        dbo.Count({}, (total) => {
                            console.log(`count: ${total}`);
                            dbo.Find({}, (result) => {
                                console.log(`find: ${JSON.stringify(result)}`); 
                                dbo.Close((connected) => console.log(`isConnected: ${connected}`));
                            });
                        });
                    });
                });
            });
        });
    }

    RunAsyncPromise () {
        const dbo = this.DataAdapter.dbo;
        const {data, updateData, deleteData } = this.PrepareData();
        dbo.Open()
        .then((connected) => {
            console.log(`connected: ${connected}`) ;
            return dbo.Insert(data);
        })
        .then((inserted) => {
            console.log(`inserted: ${JSON.stringify(inserted)}`) ;
            return dbo.Update(updateData);
        })
        .then((updated) => {
            console.log(`updated: ${updated}`) ;
            return dbo.Remove(deleteData);
        })
        .then((deleted) => {
            console.log(`deleted: ${deleted}`) ;
            return dbo.Find({});           
        })
        .then((result) => {
            console.log(`Find: ${JSON.stringify(result)}`) ;
            return dbo.Count({});           
        })
        .then((total) => {
            console.log(`Total: ${total}`) ;
            return dbo.Close();           
        })
        .then((closed) => {
            console.log(`closed: ${!closed}`) ;            
        })
    }

    async RunAsyncAwait () {     
        const dbo = this.DataAdapter.dbo;
        const {data, updateData, deleteData } = this.PrepareData();
        let connected = await dbo.Open();
        let inserted = await dbo.Insert(data);
        let updated = await dbo.Update(updateData);
        let deleted = await dbo.Remove(deleteData);
        let result = await dbo.Find({});
        let total = await dbo.Count({});
        let closed = await !dbo.Close();
        console.log(`connected: ${connected}
            inserted: ${JSON.stringify(inserted)}
            updated: ${updated}
            deleted: ${deleted}
            search: ${JSON.stringify(result)}
            total: ${total}
            closed: ${closed}
        `) ;
        return true;
    }
    
}

module.exports = AsyncLabs;