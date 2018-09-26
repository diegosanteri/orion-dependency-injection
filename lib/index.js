const processImports = require('./processImports');
const tree = require('./tree');
const resolver = require('./resolver');

module.exports = class {

    constructor() {
        this.dependenciesInstances = {};
    }

    static init(dependencyJsonRootPath) {
        return new Promise(resolve=>{
            return processImports(dependencyJsonRootPath)
                .then(dependencies => {
                    tree(dependencies).then(dependencyTree => dependencyTree) 
                    .then(dependencyTree => resolver(dependencyTree))
                    .then(instances => this.dependenciesInstances = instances)
                    .then(instances => resolve(instances))
                });
        });
    }

    static getDependency(name) {
        if(!this.dependenciesInstances[name]) {
            throw Error();
        }
    
        return this.dependenciesInstances[name];
    }
}