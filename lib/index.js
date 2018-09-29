const processImports = require('./processImports');
const tree = require('./tree');
const resolver = require('./resolver');

const init = (dependencyJsonRootPath) => {
    return (req, res, next) => {
        if (!global.dependenciesInstances) {
            return loadDependencies(dependencyJsonRootPath)
                        .then(() => next());
        }
        return next();
    }    
}

const loadDependencies = (dependencyJsonRootPath) => {
    return new Promise(resolve=>{
        return processImports(dependencyJsonRootPath)
            .then(dependencies => {
                tree(dependencies).then(dependencyTree => dependencyTree) 
                .then(dependencyTree => resolver(dependencyTree))
                .then(instances => global.dependenciesInstances = instances)
                .then(instances => resolve(instances));
            });
    });
}

const getDependency = (name) => {
    if(!global.dependenciesInstances[name]) {
        throw Error('Dependency not found');
    }

    return global.dependenciesInstances[name];
}

module.exports = {
    init,
    loadDependencies,
    getDependency
}