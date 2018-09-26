const fs = require('fs');
var appRoot = require('app-root-path');

const readFile = (path, opts = 'utf8') =>
    new Promise((res, rej) => {
        fs.readFile(path, opts, (err, data) => {
            if (err) rej(err)
            else res(data)
        })
})

const readImports = async (dependencyDir, file) => {   
    const data = await readFile(dependencyDir + '/' + file + '_dependency.json'); 
    const json = JSON.parse(data);

    return readDependencies(json.dependencies);
}

const readDependencies = (dependencies) => {  
    const dependenciesParsed = [];  
    for (let i = 0; i < dependencies.length; i++) {
        dependenciesParsed.push(dependencies[i]);
    }
    return dependenciesParsed;
}

module.exports = async (dependencyFile) => {

    const dependencyDir = appRoot + dependencyFile.split('/').slice(0, -1).join('/');
    const data = await readFile(appRoot + '/' + dependencyFile);
    const json = JSON.parse(data);
    const dependencies = [];
    for (let i = 0; i < json.imports.length; i++) {
        const dependenciesRead = await readImports(dependencyDir, json.imports[i])
        dependenciesRead.forEach(dependency => {
            dependencies.push(dependency);
        });
    }

    
    for (let i = 0; i < json.dependencies.length; i++) {
        const dependenciesRead = await readDependencies(json.dependencies)
        dependenciesRead.forEach(dependency => {
            dependencies.push(dependency);
        });
    }

    return dependencies;
}
