module.exports = class UserRepository {
    constructor({userModel}) {
        this.userModel = userModel;
    }

    getName() {
        return '#userRepository' + this.userModel.getName();
    }
}