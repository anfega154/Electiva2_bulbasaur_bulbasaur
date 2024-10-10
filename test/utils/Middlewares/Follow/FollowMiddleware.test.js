const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const httpMocks = require('node-mocks-http');
const { followUserNameMiddleware } = require('../../../../src/Utils/Middlewares/Follow/FollowMiddleware');


describe('FollowMiddleware.js', () => {

        const next = jest.fn();
        const createMocks = (body = {}) => {
          const request = httpMocks.createRequest({
              body: body
          });
        request.t = jest.fn().mockImplementation((key) => {
          const messages = {
              'messages.followerid_must_be_numeric': 'followerid must be numeric',
              'messages.missing_data_to_fill': 'missing data to fill',
              'messages.usernamefollowingid_must_be_string': 'usernamefollowingid must be string',
              'messages.follower_is_valid': 'follower is valid'
          };
          return messages[key] || key;
      });
      const response = httpMocks.createResponse();
      return { request, response };
  };

  describe('with followerid is missing', () => {
    test('should return 400 is missing followeid', async () => {
      const {request, response } = createMocks({ usernamefollowingid: "testFollowerid" });

      for (let middleware of followUserNameMiddleware) {
        await middleware(request, response, next);
      };
       const responseData = JSON.parse( response._getData()); 

       expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
       const messages = responseData.message.split(', ');
       expect(messages).toContain('missing data to fill');
    });
  });

  describe('with followerid is not numeric', () => {
    test('should return 403 followeid is not numeric', async () => {
      
      const { request, response } = createMocks({ followingid: "Followerid1" });
      
      for (let middleware of followUserNameMiddleware) {
        await middleware(request, response, next);
      };
       const responseData = JSON.parse( response._getData()); 

       expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
       const messages = responseData.message.split(', ');
       expect(messages).toContain('followerid must be numeric');
    });
  });
});
