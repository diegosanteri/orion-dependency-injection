module.exports = class OtherService {
    constructor({userModel, permissionRepository, orionDiLibExample}) {
        this.userModel = userModel;
        this.permissionRepository = permissionRepository;
        this.orionDiLibExample = orionDiLibExample;
    }

    getName() {
        return '#otherService' + this.userModel.getName() + this.permissionRepository.getName() + this.orionDiLibExample.getName();
    }
}