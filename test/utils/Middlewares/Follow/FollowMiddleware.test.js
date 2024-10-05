const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const httpMocks = require('node-mocks-http');
const { followUserNameMiddleware } = require('../../../../src/Utils/Middlewares/Follow/FollowMiddleware');
const { body, validationResult } = require('express-validator');

describe('FollowMiddleware.js', () => {
    let request, response, next;
    beforeEach(() => {
        request = httpMocks.createRequest();
        response = httpMocks.createResponse();
        next = jest.fn();
    });
  describe('with followerid is missing', () => {
    test('should return 400 is missing followeid', async () => {
       request.body={ usernamefollowingid: "testFollowerid" };
       
       await followUserNameMiddleware[1](request,response,next);
       const responseData = response._getData();
       expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
       expect(responseData).toEqual({
           status: "error",
           message: "messages.missing_data_to_fill",
       });
       expect(next).not.toHaveBeenCalled();
    });
    
    
  });
  
})
