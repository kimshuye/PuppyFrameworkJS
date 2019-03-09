function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const TransformPathToObject = async (paths) => {
    let puppyFramework = require('puppyframework');
    let method = paths[4];
    let name = paths[3];
    let object = puppyFramework.BusinessObjects[toTitleCase(name)];
    return {
        object: object,
        method: method
    }
}

const Execute = async (params) => {
    const { object, method, input } = params;
    let result = await object[method](input);
    return result;
}

module.exports = {
    TransformPathToObject,
    Execute
}