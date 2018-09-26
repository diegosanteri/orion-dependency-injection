const DepGraph = require('dependency-graph').DepGraph;

const isDependency = (searchParam, dependencies) => {
    for (let i = 0; i< dependencies.length; i++) {
        if(dependencies[i].name === searchParam) {
            return true;
        }
    }
    return false;
}

const getDependencyFromJson = (dependencyOfName, json) => {

    for(let i = 0; i < json.length; i++){
        if(dependencyOfName === json[i].name) {
            return json[i];
        }
    }
    return null;
}

const createNodes = (graph, json) => {
    json.forEach(dependency => graph.addNode(dependency.name));
}

const addDepencies = (graph, json) => {
    json.forEach(dependency => {
        dependency.dependencies.forEach(dependencyItem => {  
            graph.addDependency(dependency.name, dependencyItem.name);
        });
    });
}

const resolveDependency = (json, parent, graph) => {

    const dependencyInstances = [];
    const dependenciesOf = graph.dependenciesOf(parent.name);    
    
    dependenciesOf
        .filter(dependencyName => isDependency(dependencyName, json))
        .forEach(dependencyOfName => {
            const dependencyOf = getDependencyFromJson(dependencyOfName, json);
            if(dependencyOf)
                dependencyInstances.push(resolveDependency(json, dependencyOf, graph));
    });

    let instance = {
        name: parent.name,
        path: parent.path,
        dependencies: dependencyInstances
    };

    return instance;
}

module.exports = (json) => {
    return new Promise((resolve)=>{
        const graph = new DepGraph();

        createNodes(graph, json);
        addDepencies(graph, json);
        const dependencyTree = json.map(dependency => resolveDependency(json, dependency, graph));
        return resolve(dependencyTree);
    })
}