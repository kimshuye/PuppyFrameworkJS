/**
 * @class DataAdapter
 * @classdesc This class is managing difference data provider.
 */
class DataAdapter {

    constructor (config) {
        let Db;
        switch (config.type) {
            case 'mongodb':
                Db = require('./MongoDb');
            break;
            case 'mongodbcallback':
                Db = require('./MongoDbCallback');
            break;
        }
        this.dbo = new Db (config);
           
    }
}

module.exports = DataAdapter;