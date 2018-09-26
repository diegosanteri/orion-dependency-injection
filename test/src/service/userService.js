module.exports = class UserService {
    constructor(userRepository, permissionRepository) {
        this.userRepository = userRepository;
        this.permissionRepository = permissionRepository;
    }
}