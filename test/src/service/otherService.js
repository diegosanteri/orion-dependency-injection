module.exports = class OtherService {
    constructor(userModel, permissionRepository) {
        this.userModel = userModel;
        this.permissionRepository = permissionRepository;
    }
}