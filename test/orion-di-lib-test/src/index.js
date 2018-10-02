module.exports = class OrionDiLibExample {
    constructor({libService}) {
        this.libService = libService;
    }
    getName() {
        return '#orionDiLibExample' + this.libService.getName();
    }
}