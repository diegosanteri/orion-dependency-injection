const processImports = require('./processImports');
const tree = require('./tree');
const resolver = require('./resolver');

exports.init = (dependencyJsonRootPath) => {
    return new Promise(resolve=>{
        return processImports(dependencyJsonRootPath)
            .then(dependencies => {
                tree(dependencies).then(dependencyTree => dependencyTree) 
                .then(dependencyTree => resolver(dependencyTree))
                .then(instances => global.dependenciesInstances = instances)
                .then(instances => resolve(instances))
            });
    });
}

exports.getDependency = (name) => {
    if(!global.dependenciesInstances[name]) {
        throw Error();
    }

    return global.dependenciesInstances[name];
}