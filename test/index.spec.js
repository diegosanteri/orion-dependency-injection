const index = require('../lib/index');

describe('Testing lib dependencies load', ()=>{

    it('should load all dependencies', (done)=>{

        index.init('/test/src/bootstrap/dependencies.json').then(instances => {
            expect(instances.UserModel.constructor.name).toBe('UserModel');
            expect(instances.RoleModel.constructor.name).toBe('RoleModel');
            expect(instances.UserRepository.constructor.name).toBe('UserRepository');
            expect(instances.PermissionRepository.constructor.name).toBe('PermissionRepository');
            expect(instances.UserService.constructor.name).toBe('UserService');
            expect(instances.UserController.constructor.name).toBe('UserController');
            expect(instances.OtherService.constructor.name).toBe('OtherService');

            done();
        });
    })

    it('should load all dependencies and subdepencies', (done)=>{

        index.init('/test/src/bootstrap/dependencies.json').then(instances => {
            expect(instances.UserModel.constructor.name).toBe('UserModel');
            expect(instances.RoleModel.constructor.name).toBe('RoleModel');
            expect(instances.UserRepository.constructor.name).toBe('UserRepository');
            expect(instances.PermissionRepository.constructor.name).toBe('PermissionRepository');
            expect(instances.UserService.constructor.name).toBe('UserService');
            expect(instances.UserController.constructor.name).toBe('UserController');
            expect(instances.OtherService.constructor.name).toBe('OtherService');

            done();
        });
    })
})