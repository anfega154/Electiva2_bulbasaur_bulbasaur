const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const httpMocks = require('node-mocks-http');
const { tweerMiddleware } = require('../../../../src/Utils/Middlewares/Tweets/TweetValidate');


describe('tweetMiddleware.js', () => {

        const next = jest.fn();
        const createMocks = (body = {}) => {
          const request = httpMocks.createRequest({
              body: body
          });
        request.t = jest.fn().mockImplementation((key) => {
          const messages = {
              'messages.missing_data_to_fill': 'missing data to fill',
              'messages.content_too_long': 'content too long',
              'messages.tweet_is_valid': 'tweet is valid'
          };
          return messages[key] || key;
      });
      const response = httpMocks.createResponse();
      return { request, response };
  };

  describe('with content is missing', () => {
    test('should return 400 is missing content', async () => {
      const {request, response } = createMocks({ userid: 1 });

      for (let middleware of tweerMiddleware) {
        await middleware(request, response, next);
      };
       const responseData = JSON.parse( response._getData()); 

       expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
       const messages = responseData.message.split(', ');
       expect(messages).toContain('missing data to fill');
       expect(next).not.toHaveBeenCalled();
    });
  });

  describe('with content too long', () => {
    test('should return 403 content too longc', async () => {
      
      const { request, response } = createMocks({ content: "Followerid1" });
      
      for (let middleware of tweerMiddleware) {
        await middleware(request, response, next);
      };
       const responseData = JSON.parse( response._getData()); 

       expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
       const messages = responseData.message.split(', ');
       expect(messages).toContain('content too longc');
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('with userid is missing', () => {
    test('should return 400 is missing userid', async () => {
      const {request, response } = createMocks({ content: "testTweet" });

      for (let middleware of tweerMiddleware) {
        await middleware(request, response, next);
      };
       const responseData = JSON.parse( response._getData()); 

       expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
       const messages = responseData.message.split(', ');
       expect(messages).toContain('missing data to fill');
       expect(next).not.toHaveBeenCalled();
    });
  });


  describe('with tweet is valid', () => {
    test('should return valid', async () => {
      const { request, response } = createMocks({ content: "testTweet",
        userid: 1 
      });

      for (let middleware of tweerMiddlewarere) {
        await middleware(request, response, next);
      };
        const responseData = JSON.parse( response._getData()); 

        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(responseData).toEqual('tweet is valid');
        expect(next).toHaveBeenCalled();
    });    
  });
});
