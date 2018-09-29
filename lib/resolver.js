var appRoot = require('app-root-path');

function invoke(constructor, argArray) {
    var args = [null].concat(argArray);
    var factoryFunction = constructor.bind.apply(constructor, args);
    return new factoryFunction();
}


const createObject = (instances, dependency) => {

    if(instances[dependency.name]) {
        return instances[dependency.name];
    }

    const path = appRoot + dependency.path + '.js';
    const dependencyFile = require(path);

    const dependenciesInstances = [];
    dependency.dependencies.forEach(dependency => {
        dependenciesInstances.push(createObject(instances, dependency));
    });
    
    if(dependency.isModule) {
        return dependencyFile;
    }
    
    const instance = invoke(dependencyFile, dependenciesInstances);
    instances[dependency.name] = instance;
    return instance;
}

const instanceObjects = (dependencyTree) => {
    const instances = {};

    dependencyTree.forEach(dependency => createObject(instances, dependency));

    return instances;
}

module.exports = (dependencyTree) => {
    return instanceObjects(dependencyTree);
}