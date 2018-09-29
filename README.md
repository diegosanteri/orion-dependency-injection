# orion-dependency-injection

## What's orion-dependency-injection?

It's a lib to work with dependency injection in nodejs, it's very powerfull and flexible.

## Install

```sh
npm install --save orion-dependency-injection

```
## Usage

### Initial configuration
Orion Dependency Injection expect a file called @dependency.json in application root

Add orion-dependency-injection in project

//server.js
```sh
var dijs = require('orion-dependency-injection');
dijs.init('/src/test/bootstrap/dependency.json');
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
app.use(orionDI.init('/src/bootstrap/dependencies.json', {routes}));
```

You can see a complete integration here: https://github.com/diegosanteri/orion-dependency-example

Join us and help to improve this project =D
