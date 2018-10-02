const rsync = require('rsyncwrapper');
const index = require('../lib/index');

describe('Testing lib dependencies load', () => {
    beforeAll(done => {
        rsync({
            src: "test/orion-di-lib-test",
            dest: "node_modules",
            recursive: true
        },
        function(error, stdout, stderr, cmd) {
          if (error) {
            console.log(error, stdout, stderr, cmd)
          } else {
              done();
          }
        });
    });

    it('should load all dependencies', (done) => {

        index.loadDependencies().then((instances) => {
            expect(instances.userModel.constructor.name).toBe('UserModel');
            expect(instances.roleModel.constructor.name).toBe('RoleModel');
            expect(instances.userRepository.constructor.name).toBe('UserRepository');
            expect(instances.permissionRepository.constructor.name).toBe('PermissionRepository');
            expect(instances.userService.constructor.name).toBe('UserService');
            expect(instances.userController.constructor.name).toBe('UserController');
            expect(instances.otherService.constructor.name).toBe('OtherService');
            expect(instances.orionDiLibExample.constructor.name).toBe('OrionDiLibExample');

            done();
        });
    })

    it('should get import names correct', (done) => {

        index.loadDependencies().then(() => {

            const userModel = index.getDependency('userModel');
            const roleModel = index.getDependency('roleModel');
            const permissionRepository = index.getDependency('permissionRepository');
            const userRepository = index.getDependency('userRepository');
            const userService = index.getDependency('userService');
            const otherService = index.getDependency('otherService');
            const userController = index.getDependency('userController'); 
            const libRepository = index.getDependency('libRepository');
            const libService = index.getDependency('libService');
            const orionDiLibTest = index.getDependency('orionDiLibExample');

            expect(userModel.getName()).toBe('#userModel');
            expect(roleModel.getName()).toBe('#roleModel');
            expect(permissionRepository.getName()).toBe('#permissionRepository#roleModel');
            expect(userRepository.getName()).toBe('#userRepository#userModel');            
            expect(userService.getName()).toBe('#userService#userRepository#userModel#permissionRepository#roleModel');
            expect(otherService.getName()).toBe('#otherService#userModel#permissionRepository#roleModel#orionDiLibExample#libService#libRepository');
            expect(userController.getName()).toBe('#userController#userService#userRepository#userModel#permissionRepository#roleModel');

            expect(libRepository.getName()).toBe('#libRepository');
            expect(libService.getName()).toBe('#libService#libRepository');
            expect(orionDiLibTest.getName()).toBe('#orionDiLibExample#libService#libRepository');
            
            done();
        });
    })

    it('should get dependency by name', (done) => {
        index.loadDependencies().then(instances => {
            expect(index.getDependency('userModel')).not.toBe(undefined);
            expect(index.getDependency('userModel')).toBe(instances.userModel);
            done();
        });
    })
})