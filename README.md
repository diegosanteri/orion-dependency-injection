# orion-dependency-injection

## What's orion-dependency-injection?

It's a lib to work with dependency injection in nodejs, it's very powerfull and flexible. We can create backend applications and lib using this lib.
You can use this lib as express middleware to manage your dependencies.

## Install

To install our lib you can use npm install, easy and simple.

```sh
npm install --save orion-dependency-injection
```

## Setup

orion-dependency-injection needs a root file called @dependency.json responsible for define dependencies tree and relative path to import this files, with this lib you will able to instanciate new ecmascripts classes and common libs, forget about manage your dependencies by yourself.

## Usage

### Initial configuration
How was called before, orion-dependency-injection expect a file called @dependency.json in application root, you can see a base config bellow

```sh
{
    "externals": ["orion-di-lib-test"],
    "imports": ["/test/src/bootstrap/model", "/test/src/bootstrap/repository", 
        "/test/src/bootstrap/service", "/test/src/bootstrap/controller"],
    "dependencies": [
        {
            "name": "otherService",
            "path": "/test/src/service/otherService",
            "dependencies": ["userModel", "permissionRepository", "orionDiLibExample"]
        }
    ]
}
```

#### externals section
Here you will define external libs or projects and import all of these dependencies without problems, automatically
our lib will take all of dependencies, probably you realized: "How it works?". So it works because  orion-di-lib-test is the name of our external project dependency, then orion-dependency-injection will look for @dependency.json inside this project and will read all of these dependencies inside our external dependency and will merge it with current project, and all of these dependencies could be used as part of the same project.
But how you know the name of your external dependency. So this name will be the name defined on package.json for example go to the dependencies section inside package.json.

```sh
"dependencies": {
    "orion-di-lib-test": "*"
},
```
We highly recommend you to import your externals dependencies inside this root file called @dependency.json because it will be simpler than spread it in another config files.

### imports section



Add orion-dependency-injection in project

//server.js
```sh
var dijs = require('orion-dependency-injection');
dijs.init();
```

//service.js
```sh
var dijs = require('orion-dependency-injection');
const userService = dijs.getDependency('UserService');
```
### Importing externals libs with orion-di

//@dependency.json
```sh{
    "externals": ["orion-di-lib-test"],
    "imports": [...],
    "dependencies": [...]
}
```

### Express integration
We can use this lib with Express just following this:
```sh
app.use(orionDI.init({routes}));
```

You can see a complete integration here: https://github.com/diegosanteri/orion-dependency-example

Join us and help to improve this project =D
