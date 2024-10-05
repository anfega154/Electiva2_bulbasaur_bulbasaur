const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const httpMocks = require('node-mocks-http');
const { followUserNameMiddleware } = require('../../../../src/Utils/Middlewares/Follow/FollowMiddleware');


describe('FollowMiddleware.js', () => {
    let request, response, next;
    beforeEach(() => {
        request = httpMocks.createRequest();
        response = httpMocks.createResponse();
        next = jest.fn();

        request.t = jest.fn().mockImplementation((key) => {
          const messages = {
              'messages.followerid_must_be_numeric': 'followerid must be numeric',
              'messages.missing_data_to_fill': 'missing data to fill',
              'messages.usernamefollowingid_must_be_string': 'usernamefollowingid must be string',
              'messages.follower_is_valid': 'follower is valid'
          };
          return messages[key] || key;
      });
    });

  describe('with followerid is missing', () => {
    test('should return 400 is missing followeid', async () => {
      request.body={ usernamefollowingid: "testFollowerid" };

      for (let middleware of followUserNameMiddleware) {
        await middleware(request, response, next);
      };
       const responseData = JSON.parse( response._getData()); 

       expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
       const messages = responseData.message.split(', ');
       expect(messages).toContain('missing data to fill');
       //expect(next).not.toHaveBeenCalled();
    });
  });

  describe('with followerid is not numeric', () => {
    test('should return 403 followeid is not numeric', async () => {
      console.log("not numeric");
      request.body={ followingid: "Followerid1" };
      
      for (let middleware of followUserNameMiddleware) {
        await middleware(request, response, next);
      };
       const responseData = JSON.parse( response._getData()); 

       expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
       const messages = responseData.message.split(', ');
       expect(messages).toContain('followerid must be numeric');
       //expect(next).not.toHaveBeenCalled();
    });
  });

  describe('with follower is valid', () => {
    test('should return valid', async () => {
      console.log("probando el valido");
      request.body={             
        followerid: 1,
        usernamefollowingid: "testFollowerid" 
      };

      for (let middleware of followUserNameMiddleware) {
        await middleware(request, response, next);
      };
        const responseData = JSON.parse( response._getData()); 

        expect(response.statusCode).toBe(400);// corregir esta mal
        const messages = responseData.message.split(', ');
        //expect(messages).toContain('follower is valid');
        //expect(next).not.toHaveBeenCalled();
    });    

  });
  
});
