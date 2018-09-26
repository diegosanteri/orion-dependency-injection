const processImports = require('./processImports');
const tree = require('./tree');
const resolver = require('./resolver');

let dependenciesInstances = {};
 
exports.init = (dependencyJsonRootPath)=> {
    return new Promise(resolve=>{
        return processImports(dependencyJsonRootPath)
            .then(dependencies => {
                tree(dependencies).then(dependencyTree => dependencyTree) 
                .then(dependencyTree => resolver(dependencyTree))
                .then(instances => dependenciesInstances = instances)
                .then(instances => resolve(instances))
            });
    });
}

exports.getDependency = (name) => {
    if(!dependenciesInstances[name]) {
        throw Error();
    }

    return dependenciesInstances[name];
}

