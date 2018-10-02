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
    const path = resolvePath(dependency.namespace, dependency.path);
    const dependencyFile = require(path);

    if(dependency.isModule) {
        return dependencyFile;
    }

    const dependenciesInstances = {};
    if(dependency && dependency.dependencies) {
        dependency.dependencies.forEach(dependency => {
            dependenciesInstances[dependency.name] = createObject(instances, dependency);
        });
    }
    
    return invoke(dependencyFile, dependenciesInstances);
}

const resolvePath = (namespace, dependencyPath) => {
    let path = '';
    if(dependencyPath.startsWith('/')) {
        if((!namespace) || (namespace === 'default')) {
            path = appRoot + dependencyPath + '.js';
        } else {
            path = appRoot + '/node_modules/' + namespace + dependencyPath + '.js';
        }        
    } else {
        path = dependencyPath;
    }
    return path;
}

const invoke = (constructor, args) => {
    var factory = constructor.bind.apply(constructor);
    return new factory(args);
}