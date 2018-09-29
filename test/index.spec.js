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
            expect(instances.UserModel.constructor.name).toBe('UserModel');
            expect(instances.RoleModel.constructor.name).toBe('RoleModel');
            expect(instances.UserRepository.constructor.name).toBe('UserRepository');
            expect(instances.PermissionRepository.constructor.name).toBe('PermissionRepository');
            expect(instances.UserService.constructor.name).toBe('UserService');
            expect(instances.UserController.constructor.name).toBe('UserController');
            expect(instances.OtherService.constructor.name).toBe('OtherService');
            expect(instances.OrionDiLibExample.constructor.name).toBe('OrionDiLibExample');

            done();
        });
    })

    it('should get dependency by name', (done) => {
        index.loadDependencies().then(instances => {
            expect(index.getDependency('UserModel')).not.toBe(undefined);
            done();
        });
    })
})