module.exports = class UserController {
    constructor({userService}) {
        this.userService = userService;
    }
    getName() {
        return '#userController' + this.userService.getName();
    }
}