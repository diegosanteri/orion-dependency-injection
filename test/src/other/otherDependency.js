module.exports = class OtherDependency {
    constructor(userModel, permissionRepository) {
        this.userModel = userModel;
        this.permissionRepository = permissionRepository;
    }
}