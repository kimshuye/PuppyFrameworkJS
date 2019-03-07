const { MongoClient } = require('mongodb');

/**
 * @class MongoDb
 * @classdesc This class is managing MongoDB.
 */
class MongoDbCallback {

 /**
   * Collection Name Property
   */
  set Collection (collectionName) {
    this._collection = collectionName;
  }
  get Collection () {
    return this._collection;
  }

  /**
   * Database url property for get/set connection string of MongoDB.
   */
  set ConnectionString (connectionString) {
    this._connectionString = connectionString;
  }

  get ConnectionString () {
    return this._connectionString;
  }

  set DbName (dbName) {
    this._dbName = dbName;
  }

  get DbName () {
    return this._dbName;
  }

  set IsConnected (connected) {
    this._isConnected = connected
  }

  get IsConnected () {
    return this._isConnected
  }

  set Db (dbObject) {
    this._db = dbObject
  }

  get Db () {
    return this._db
  }

  set Client (client) {
    this._client = client
  }

  get Client () {
    return this._client
  }

  /** @constructs This construtor function must assign collection name.*/
  constructor (config) {
    this.Collection = config.collectionName;
    this.ConnectionString = config.connectionString;
    this.DbName = config.dbName;
  }


  /** Methods */

  /**
   * Open database.
   */
  Open (callback) {
    this.IsConnected = false;
      MongoClient.connect(this.ConnectionString,{useNewUrlParser: true }, (err, db) => {
        if (err) callback(err);
        this.IsConnected = true;
        this.Db = db;
        this.Client = db.db(this.DbName);
        callback(this.IsConnected);
      })
  }

  /**
   * Close database.
   */
  Close (callback) {
      this.Db.close(() => {
        this.IsConnected = false
        callback(this.IsConnected)
      })
  
  }
  /**
   * Insert data to database.
   * @param {json} data  - format as a json.
   * @returns {json} result - ops
   */
  Insert (data, callback) {
   
    this.Client.collection(this.Collection)
      .insertMany(data, (err, result) => {
        if (err) callback(err)
        callback(result)
      })
  }

  /**
   * Update data
   * @param {*} dataWithCondition 
   */
  Update (dataWithCondition, callback) {
    let { data, condition, option } = dataWithCondition
    if (!option) {
      option = {}
    }
    data = {'$set': data }
    this.Client.collection(this.Collection)
      .updateMany(condition, data, option, (err, result) => {
        if (err) callback(err)
        callback(result)
      })
   
  }

  /**
   * Upsert
   */
  Upsert (dataWithCondition, callback) {
    let { data, condition } = dataWithCondition
    let option = { upsert: true }
    data = {'$set': data }
    this.Client.collection(this.Collection)
      .updateMany(condition, data, option, (err, result) => {
        if (err) callback(err)
        callback(result)
      })
  
  }

  /**
   * Remove data
   * @param {*} conditionWithOption 
   */
  Remove (conditionWithOption, callback) {
    let { condition, option } = conditionWithOption
    if(!condition) throw 'Invalid condition!'
    if (!option) {
      option = {justOne: true}
    }
    this.Client.collection(this.Collection)
      .deleteMany(condition, option, (err, result) => {
        if (err) callback(err)
        callback(result)
      })
  
  }

  Find (condition, callback) {
    this.Client.collection(this.Collection)
      .find(condition).toArray((err, result) => {
        if (err) callback(err)
        callback(result)
      })
   
  }

  FindOne (condition, callback) {
      this.Client.collection(this.Collection)
      .findOne(condition, (err, result) => {
        if (err) callback(err)
        callback(result)
      })
    
  }

  Count (condition, callback) {

       this.Client.collection(this.Collection)
      .countDocuments(condition, (err, result) => {
        if (err) callback(err)
        callback(result)
      })
  }

}

module.exports = MongoDbCallback;