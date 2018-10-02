module.exports = class UserService {
    constructor({userRepository, permissionRepository}) {
        this.userRepository = userRepository;
        this.permissionRepository = permissionRepository;
    }

    getName() {
        return '#userService' + this.userRepository.getName() + this.permissionRepository.getName();
    }
}