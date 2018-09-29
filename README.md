# orion-dependency-injection

## What's orion-dependency-injection?

It's a lib to work with dependency injection in nodejs, it's very powerfull and flexible.

## Install

```sh
npm install --save orion-dependency-injection

```
## Usage

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


### Express integration
We can use this lib with Express just following this:
```sh
app.use(orionDI.init('/src/bootstrap/dependencies.json', {routes}));
```

You can see a complete integration here: https://github.com/diegosanteri/orion-dependency-example
