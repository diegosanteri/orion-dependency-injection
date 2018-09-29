const processImports = require('./processImports');
const tree = require('./tree');
const resolver = require('./resolver');

const init = ({routes = null}) => {
    return (req, res, next) => {
        if (!global.dependenciesInstances) {
            return loadDependencies()
                        .then(() => {
                            if (routes) {
                                routes(req.app);
                            }
                            next()
                        });
        }
        return next();
    }    
}

const loadDependencies = () => {
    return new Promise(resolve=>{
        return processImports()
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