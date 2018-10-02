module.exports = class PermissionRepository {
    constructor({roleModel}) {
        this.roleModel = roleModel;
    }

    getName() {
        return '#permissionRepository' + this.roleModel.getName();
    }
}