const { Sequelize } = require('sequelize');

jest.mock('sequelize', () => {
    const mSequelize = {
        authenticate: jest.fn(),
        sync: jest.fn(),
        close: jest.fn(),
    };
    return { Sequelize: jest.fn(() => mSequelize) };
});

const sequelize = new Sequelize('bulbasaur', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

describe('Sequelize Instance', () => {
    describe('with correct parameters ', () => {
        test('should create an instance of Sequelize with correct parameters', () => {
            expect(Sequelize).toHaveBeenCalledWith('bulbasaur', 'postgres', 'postgres', {
                host: 'localhost',
                dialect: 'postgres',
                logging: false,
            });
        });      
    });
    
    describe('with authenticate method ', () => {
        test('should have authenticate method', () => {
            expect(sequelize.authenticate).toBeDefined();
        });      
    });
    
    describe('with sync method ', () => {
        test('should have sync method', () => {
            expect(sequelize.sync).toBeDefined();
        });
    });
    
    describe('with close method', () => {
        test('should have close method', () => {
            expect(sequelize.close).toBeDefined();
        });      
    });
});
