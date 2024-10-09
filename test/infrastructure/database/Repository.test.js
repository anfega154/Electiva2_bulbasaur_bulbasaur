const Repository = require('../../../src/infrastucture/database/Repository'); // Importa la clase Repository

describe('Repository.js', () => {
    let repository;

    class TestRepository extends Repository {
        constructor(model) {
            super(model);
        }

        async getAll() { return 'mocked getAll'; }
        async getById(id) { return 'mocked getById'; }
        async create(data) { return 'mocked create'; }
        async update(id, data) { return 'mocked update'; }
        async delete(id) { return 'mocked delete'; }
    }

    const mockModel = {};

    beforeEach(() => {
        repository = new TestRepository(mockModel);
    });

    describe('with try creating an instance of the Repository directly', () => {
        test('should throw error when trying to instantiate Repository directly', () => {
            expect(() => new Repository(mockModel)).toThrow("No puedes instanciar una clase abstracta.");
        });
      
    });
     describe('with when instantiating a subclass of Repository', () => {
        test('should not throw error when instantiating a subclass of Repository', () => {
            expect(() => new TestRepository(mockModel)).not.toThrow();
        });   
     });
     
     describe('with call getAll() method in subclass', () => {
        test('should call getAll() method in subclass', async () => {
            const result = await repository.getAll();
            expect(result).toBe('mocked getAll');
        });       
     });
     
    describe('with call getById(id) method in subclass', () => {
        test('should call getById(id) method in subclass', async () => {
            const result = await repository.getById(1);
            expect(result).toBe('mocked getById'); 
        });       
     });
     
    describe('with call create(data) method in subclass', () => {
        test('should call create(data) method in subclass', async () => {
            const result = await repository.create({ name: 'test' });
            expect(result).toBe('mocked create');
        });       
     });

    describe('with update(id, data) method in subclass', () => {
        test('should call update(id, data) method in subclass', async () => {
            const result = await repository.update(1, { name: 'updated' });
            expect(result).toBe('mocked update');
        });      
    });

    describe('with call delete(id) method in subclass', () => {
        test('should call delete(id) method in subclass', async () => {
            const result = await repository.delete(1);
            expect(result).toBe('mocked delete'); 
        });
    });
});
