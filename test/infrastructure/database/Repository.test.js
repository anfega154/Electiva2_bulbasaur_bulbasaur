const Repository = require('../../../src/infrastucture/database/Repository');

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

    class UnimplementedRepository extends Repository {
        constructor(model) {
            super(model);
        }
        // No implementamos los métodos abstractos
    }

    const mockModel = {};

    beforeEach(() => {
        repository = new TestRepository(mockModel);
    });

    describe('when trying to instantiate Repository directly', () => {
        test('should throw error when trying to instantiate Repository directly', () => {
            expect(() => new Repository(mockModel)).toThrow("No puedes instanciar una clase abstracta.");
        });
    });

    describe('when instantiating a subclass of Repository', () => {
        test('should not throw error when instantiating a subclass of Repository', () => {
            expect(() => new TestRepository(mockModel)).not.toThrow();
        });
    });

    describe('when calling getAll() method in subclass', () => {
        test('should call getAll() method in subclass', async () => {
            const result = await repository.getAll();
            expect(result).toBe('mocked getAll');
        });
    });

    describe('when calling getById(id) method in subclass', () => {
        test('should call getById(id) method in subclass', async () => {
            const result = await repository.getById(1);
            expect(result).toBe('mocked getById');
        });
    });

    describe('when calling create(data) method in subclass', () => {
        test('should call create(data) method in subclass', async () => {
            const result = await repository.create({ name: 'test' });
            expect(result).toBe('mocked create');
        });
    });

    describe('when calling update(id, data) method in subclass', () => {
        test('should call update(id, data) method in subclass', async () => {
            const result = await repository.update(1, { name: 'updated' });
            expect(result).toBe('mocked update');
        });
    });

    describe('when calling delete(id) method in subclass', () => {
        test('should call delete(id) method in subclass', async () => {
            const result = await repository.delete(1);
            expect(result).toBe('mocked delete');
        });
    });

    describe('abstract methods should throw errors', () => {
        let abstractRepository;

        beforeEach(() => {
            abstractRepository = new UnimplementedRepository(mockModel);
        });

        test('should throw error when calling getAll() on abstract subclass', async () => {
            await expect(abstractRepository.getAll()).rejects.toThrow("Método 'getAll()' no implementado.");
        });

        test('should throw error when calling getById(id) on abstract subclass', async () => {
            await expect(abstractRepository.getById(1)).rejects.toThrow("Método 'getById(id)' no implementado.");
        });

        test('should throw error when calling create(data) on abstract subclass', async () => {
            await expect(abstractRepository.create({ name: 'test' })).rejects.toThrow("Método 'create(data)' no implementado.");
        });

        test('should throw error when calling update(id, data) on abstract subclass', async () => {
            await expect(abstractRepository.update(1, { name: 'updated' })).rejects.toThrow("Método 'update(id, data)' no implementado.");
        });

        test('should throw error when calling delete(id) on abstract subclass', async () => {
            await expect(abstractRepository.delete(1)).rejects.toThrow("Método 'delete(id)' no implementado.");
        });
    });
});