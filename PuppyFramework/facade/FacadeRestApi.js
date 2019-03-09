const Message = require('./Result');
const { Text } = require('../utils');
const moment = require('moment');
const Validate  = require('validate.js');
const Logger = require('./Logger');
let shared = {}

Validate.extend(Validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) {
      return +moment.utc(value)
    },
    // Input is a unix timestamp
    format: function(value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format)
    }
  })

  const validateArray = (values, validator) => {
    let results = [];

    values.forEach((a, i) => {
        let result = Validate(a, validator);
        if (result) {
            results.push({id: i, result:result});
        }
    })

    if(results.length ===0) {
        results = undefined;
    }

    return results;
  }


class FacadeRestApi {
    constructor (config) {
        shared.config = config;
    }

    static ExtractParameters (req) {
        const {application, objectname, objectmethod} = req.headers;
        
        if (!application || !objectname || !objectmethod) {
            throw Message(530);
        }

        const input = (req.method ==='GET'? req.query: req.body);
        let objClass = require('../biz')[objectname];
        let businessObject = {};
        businessObject.objectName = objectname;
        businessObject.object = new objClass(shared.config);
        businessObject.method = objectmethod;
        businessObject.input = input;
        return businessObject;
        
    }

    static IsValidInput (req) {
        let parameters = (req.method === 'GET'?req.query:req.body);
        let validator = require('../validator')[req.headers.validator]
        let result;

        if (Array.isArray(parameters)) {
            result = validateArray(parameters, validator);
        } else {
            result = Validate(parameters, validator );
        }

        if (result) {
            let msg = Message(530);
            msg.message = result;
            throw msg;
        }
        return result;
    }

    static async IsAuthorize (req, res, next) {

    }

    static async AddRequestLog (req, res, next) {

    }

    static async AddReposnseLog (req, res, next) {

    }

    static async Invoke (businessObject) {
          let result = await  businessObject.object[businessObject.method](businessObject.input);
          let msg = Message(200);
          msg.data = result;
          return msg;
    }

    async Execute (req, res, next) {
        let result = {};
        try {
            let bo = FacadeRestApi.ExtractParameters(req);
            let isValid = FacadeRestApi.IsValidInput(req);
            Logger.WriteReqLog(req, shared.config.logPath);
            result = await FacadeRestApi.Invoke(bo);
           
        }
        catch(err) {
            if (err.code) {
                result = err;
            } else {
                result = Message(500);
                result.message = JSON.stringify(err)
            }
        }
        Logger.WriteResLog(req, result,shared.config.logPath);
        res.send(result);
    }
}

module.exports = FacadeRestApi;