const fs = require('fs');
var appRoot = require('app-root-path');

const concatDependencies = (dependencies, dependenciesToConcat) => {
    dependenciesToConcat.forEach(dependency => {
        dependencies.push(dependency);
    });
}

const readFile = (path, opts = 'utf8') =>
    new Promise((res, rej) => {
        fs.readFile(path, opts, (err, data) => {
            if (err) rej(err)
            else res(data)
        })
})

const readImports = async (importJson) => {
    const dependencies = [];    

    if(importJson) {
        for (let i = 0; i < importJson.length; i++) {
            const data = await readFile(appRoot + importJson[i] + '_dependency.json'); 
            const json = JSON.parse(data);
            
            concatDependencies(dependencies, await readImports(json.imports));
            concatDependencies(dependencies, await readDependencies(json.dependencies));            
        }
    }

    return dependencies;
}

const readDependencies = async (dependencies) => {  
    const dependenciesParsed = [];
    concatDependencies(dependenciesParsed, dependencies);
    return dependenciesParsed;
}

module.exports = async () => {
    
    const response = [];
    const path = appRoot + '/@dependency.json';
    const data = await readFile(path);
    const json = JSON.parse(data);

    concatDependencies(response, await readImports(json.imports));
    concatDependencies(response, await readDependencies(json.dependencies));

    return response;
}
