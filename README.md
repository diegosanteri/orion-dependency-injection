# orion-dependency-injection

## What's orion-dependency-injection?

It's a lib to work with dependency injection in nodejs, it's very powerfull and flexible.

## Install

```sh
npm install --save di-js

```
## Usage

Add di-js in project

//server.js
```sh
var dijs = require('di-js');
dijs.init('/src/test/bootstrap/dependency.json');
```

//service.js
```sh
var dijs = require('di-js');
const userService = dijs.getDependency('UserService');
```
