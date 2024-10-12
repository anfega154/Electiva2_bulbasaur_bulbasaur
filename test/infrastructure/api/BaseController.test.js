const httpMocks = require("node-mocks-http");
const HttpStatus = require('../../../src/Utils/helpers/Httpstatus');
const BulbasaurController = require("../../../src/infrastucture/api/BaseControlller");

jest.mock("../../../src/Utils/helpers/Httpstatus", () => ({
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202
}));

describe("BaseController.js", () => {
    let bulbasaurController, res;
    
    beforeEach(() => {
        bulbasaurController = new BulbasaurController();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('success response', () => {
        test('should return success response', async () => {
            const body = { data: "test" };
            const message = "Operation successful";

            await bulbasaurController.success(res, body, message);

            expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: message,
                body: body
            });
        });          
    });

    describe('created response', () => {
        test('should return created response', async () => {
            const body = { data: "created" };
            const message = "Resource created successfully";

            await bulbasaurController.created(res, body, message);

            expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: message,
                body: body
            });
        });      
    });
    
    describe('accepted response', () => {
        test('should return accepted response', async () => {
            const body = { data: "accepted" };
            const message = "Request accepted";

            await bulbasaurController.accepted(res, body, message);

            expect(res.status).toHaveBeenCalledWith(HttpStatus.ACCEPTED);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: message,
                body: body
            });
        });      
    });
    
    describe('error response with default status', () => {
        test('should return error response with default status 400', () => {
            const message = "An error occurred";

            bulbasaurController.error(res, message);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: message
            });
        });
    });
    
    describe('error response with custom status', () => {
        test('should return error response with custom status', () => {
            const message = "Not found";
            const status = 404;

            bulbasaurController.error(res, message, status);

            expect(res.status).toHaveBeenCalledWith(status);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: message
            });
        });      
    });
});