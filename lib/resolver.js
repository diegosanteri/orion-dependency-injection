var appRoot = require('app-root-path');

module.exports = (dependencyTree) => {
    return instanceObjects(dependencyTree);
}

const instanceObjects = (dependencyTree) => {
    const instances = {};
    dependencyTree.forEach(dependency => createObject(instances, dependency));
    return instances;
}

const createObject = (instances, dependency) => {
    if(instances[dependency.name]) {
        return instances[dependency.name];
    }
    
    instances[dependency.name] = resolveObject(instances, dependency);
    return instances[dependency.name];
}

const resolveObject = (instances, dependency) => {
    const path = resolvePath(dependency.path);
    const dependencyFile = require(path);

    if(dependency.isModule) {
        return dependencyFile;
    }

    const dependenciesInstances = [];
    dependency.dependencies.forEach(dependency => {
        dependenciesInstances.push(createObject(instances, dependency));
    });
    
    return invoke(dependencyFile, dependenciesInstances);
}

const resolvePath = (dependencyPath) => {
    let path = '';
    if(dependencyPath.startsWith('/')) {
        path = appRoot + dependencyPath + '.js';
    } else {
        path = dependencyPath;
    }
    return path;
}

const invoke = (constructor, argArray) => {
    var args = [null].concat(argArray);
    var factoryFunction = constructor.bind.apply(constructor, args);
    return new factoryFunction();
}