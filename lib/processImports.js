const fs = require('fs');
var appRoot = require('app-root-path');

module.exports = async () => {   
    const path = appRoot + '/@dependency.json';
    return readMainDependencyFile(path, 'default');   
}

const readMainDependencyFile = async (mainDependencyFile, namespace) => {    
    const data = await readFile(mainDependencyFile);
    const json = JSON.parse(data);
    return readSections(json);    
}

const readSections = async (json, namespace) => {
    const response = [];
    concatDependencies(response, await readExternals(json.externals));
    concatDependencies(response, await readImports(json.imports, namespace));
    concatDependencies(response, await readDependencies(json.dependencies, namespace));
    return response;
}

const readExternals = async (externals) => {
    const dependencies = [];
    if(externals) {
        externals.forEach(external => {
            const path = external + '/@dependency.json';
            concatDependencies(dependencies, readMainDependencyFile(path, external));
        })
    }

    return dependencies;
}

const readImports = async (importJson, namespace) => {
    const dependencies = [];    

    if(importJson) {
        for (let i = 0; i < importJson.length; i++) {
            const data = await readFile(appRoot + importJson[i] + '_dependency.json'); 
            const json = JSON.parse(data);
            concatDependencies(dependencies, await readSections(json, namespace));          
        }
    }

    return dependencies;
}

const readDependencies = async (dependencies, namespace) => {  
    const dependenciesParsed = [];
    if(dependencies && namespace) {
        dependencies.forEach(dependency => dependency.namespace = namespace)
    }

    concatDependencies(dependenciesParsed, dependencies);
    return dependenciesParsed;
}

const concatDependencies = (dependencies, dependenciesToConcat) =>
    dependenciesToConcat.forEach(dependency => dependencies.push(dependency));

const readFile = (path, opts = 'utf8') =>
    new Promise((res, rej) => {
        fs.readFile(path, opts, (err, data) => {
            if (err) rej(err)
            else res(data)
        })
    })