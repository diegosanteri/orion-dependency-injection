module.exports = class LibService {
    constructor({libRepository}) {
        this.libRepository = libRepository;
    }

    getName() {
        return '#libService' + this.libRepository.getName();
    }
}