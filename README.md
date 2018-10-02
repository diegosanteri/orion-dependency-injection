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

Think about a giant project with alot of dependencies. In this case your @dependencies.json file will be with many dependencies and hard to read. To split it and solve this problem, orion-dependency-injection has this section. There you can import another config files and keep these files small, doing that your project will be more easy to maintain.
This another files will look like as your main file @dependencies.json.
how it works?

```sh
"imports": ["/test/src/bootstrap/model", "/test/src/bootstrap/repository", 
        "/test/src/bootstrap/service", "/test/src/bootstrap/controller"],
```

So, you will put the relative path for your dependencies, int this case inside folder bootstrap you will have files called
model_dependency.json, repository_dependency.json, service_dependency.json and controller_dependency.json. 
Notice: You put for example '/test/src/bootstrap/model' as an import, automatically orion-dependency-injection will be put  _dependency.json in the end of file name, don't put your file as "imports": ["/test/src/bootstrap/model_dependency.json"]


### dependencies section

This section you will put yours dependencies, it's so easy.

```sh
"dependencies": [
        {
            "name": "otherService",
            "path": "/test/src/service/otherService",
            "dependencies": ["userModel"]
        },
        {
            "name": "userModel",
            "isModule": true,
            "path": "/test/src/model/userModel",
            "dependencies": []
        }
    ]
```

First off all, when you have a service you will need to inform three params: 
name: This param define the dependency name, it's the reference for your dependency
path: Path is the relative path for your dependency file, notice: don't put .js, it will be put automatically
dependencies: It's an array of string, here you will put the dependency's names, what it mean? The dependencies of dependency you are defining at moment. For exemple,  otherService depends of userModel to be instantiate.

As a good practice we recommend you put in the import files just the section dependency, if this specific file grows more than you expect you can break it in another imports files.

### orion-dependency-injection as express middleware

To add this lib in your express server you will need just do it:

```sh
app.use(orionDI.init({routes}));
```

Doing this our lib will load all of dependencies then it will apply your routes logic, this routes file will looks like:

```sh
const orionDI = require('orion-dependency-injection');

module.exports = (app) => {
const controller = orionDI.getDependency('userController');
app.get('/users', controller.getUsers.bind(controller))

```

Inside this file you will setup all of express routes, it will be your entry point for all of your dependencies,
when you use orionDI variable it will be contains all of your dependencies instantiated and ready for use.

### Using orion-dependency-injection stand alone

```sh
var dijs = require('orion-dependency-injection');
orionDI.init().then(() => {
    const userService = dijs.getDependency('UserService');
    userService.getName();
})
```

### Extras

You can see a complete integration here: 
https://github.com/diegosanteri/orion-dependency-example

You can see how to create an lib using orion-dependency-lib here:
https://github.com/diegosanteri/orion-di-lib-example

Join us and help to improve this project =D
