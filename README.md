# orion-dependency-injection

## What's orion-dependency-injection?

We can create backend applications and lib using this tool. You can use it as express middleware to manage your dependencies.

## Install

To install our lib you can use npm install, easy and simple.

```sh
npm install --save orion-dependency-injection
```

## Setup

orion-dependency-injection needs a root file called @dependency.json responsible for defining the dependencies tree and the relative path to import these files. With this lib you will able to instantiate new ecmascripts classes and common libs. Never worry about managing your dependencies by yourself again.

## Usage

### Initial configuration
As it was said before, orion-dependency-injection expects a file called @dependency.json in the application root. An example of a base config is shown bellow:

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
Here you will define external libs or projects and import all of these dependencies without problems. Automatically, our lib will take all of the dependencies. With this, you're probably wondering: "How does it work?". It works because orion-di-lib-test is the name of our external project dependency, then orion-dependency-injection will look for @dependency.json inside this project and will read all of this info inside our external dependency and will merge it with the current project, and all of these dependencies could be used as part of the same project. But how do you know the name of your external dependency? This name will be the one defined on package.json. For example, go to the dependencies section inside package.json.

```sh
"dependencies": {
    "orion-di-lib-test": "*"
},
```

We highly recommend you to import your externals dependencies inside this root file called @dependency.json because it will be simpler than spliting it among other config files.

### imports section

Think about a giant project with alot of dependencies. In this case your @dependencies.json file will contain many dependencies and be hard to read. To split it and solve this problem, orion-dependency-injection has imports section. Here you can import other config files and keep them small, making your project easier to maintain. This other files will look like your main file @dependencies.json. But how does it work?, you may ask.

```sh
"imports": ["/test/src/bootstrap/model", "/test/src/bootstrap/repository", 
        "/test/src/bootstrap/service", "/test/src/bootstrap/controller"],
```

So, we will put the relative path for your dependencies into this case inside the folder bootstrap. There will be files called model_dependency.json, repository_dependency.json, service_dependency.json and controller_dependency.json. Notice: Insert, for example '/test/src/bootstrap/model' as an import, automatically orion-dependency-injection will add _dependency.json in the end of file name. Don't name your file as "imports": ["/test/src/bootstrap/model_dependency.json"]


### dependencies section

This section will be used to add dependencies, it's very simple.

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

First of all, when there is an ecmascript class, three params will have to be informed: 
name: This param defines the dependency name, it's the reference of your dependency;

path: Path is the relative path for your dependency file, notice: don't use .js, it will be automatically added; 

dependencies: It's an array of string, here you will write the dependency's names; it means the dependencies of the dependency being defined at the moment. For example, otherService depends on userModel to be instantiated.

isModule: It's an optional parameters false by default. You must use this parameter when you want to instantiate for example the fs module from nodejs or mongoose models.


### orion-dependency-injection as express middleware

To add this lib to the express server, just do this:

```sh
app.use(orionDI.init({routes}));
```

After this, our lib will load all of dependencies and then it will apply the routes logic. The routes file will look like:

```sh
const orionDI = require('orion-dependency-injection');

module.exports = (app) => {
const controller = orionDI.getDependency('userController');
app.get('/users', controller.getUsers.bind(controller))

```

Inside this file, all of the express routes will be setup, this will be the entry point for all of the dependencies. When  orionDI variable is used, it will contain all of the dependencies instantiated and it'll be ready to use.

### Using orion-dependency-injection stand alone

```sh
var dijs = require('orion-dependency-injection');
orionDI.init().then(() => {
    const userService = dijs.getDependency('UserService');
    userService.getName();
})
```

### Extras

Check out a complete integration here: 
https://github.com/diegosanteri/orion-dependency-example

Check out how to create a lib using orion-dependency-lib here: 
https://github.com/diegosanteri/orion-di-lib-example

Join us and help improve this project =D
