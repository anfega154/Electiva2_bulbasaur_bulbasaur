const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const httpMocks = require('node-mocks-http');
const { tweetMiddleware } = require('../../../../src/Utils/Middlewares/Tweets/TweetValidate');

describe('tweetMiddleware.js', () => {
    const next = jest.fn();
    const createMocks = (body = {}) => {
        const request = httpMocks.createRequest({ body });
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

    describe('when content is missing', () => {
        test('should return 400 if content is missing', async () => {
            const { request, response } = createMocks({ userid: 1 });

            await tweetMiddleware[0](request, response, next); 
            await tweetMiddleware[2](request, response, next); 
            const responseData = JSON.parse(response._getData());
            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            const messages = responseData.message.split(', ');
            expect(messages).toContain('missing data to fill');
        });
    });

    describe('when content is too long', () => {
        test('should return 400 if content is too long', async () => {
            const { request, response } = createMocks({ content: "a".repeat(300), userid: 1 });

            await tweetMiddleware[0](request, response, next); 
            await tweetMiddleware[2](request, response, next); 

            const responseData = JSON.parse(response._getData());
            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            const messages = responseData.message.split(', ');
            expect(messages).toContain('content too long');
        });
    });

    describe('when userid is missing', () => {
        test('should return 400 if userid is missing', async () => {
            const { request, response } = createMocks({ content: "testTweet" });

            await tweetMiddleware[1](request, response, next); 
            await tweetMiddleware[2](request, response, next); 

            const responseData = JSON.parse(response._getData());
            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            const messages = responseData.message.split(', ');
            expect(messages).toContain('missing data to fill');
        });
    });

    describe('when tweet is valid', () => {
        test('should pass validation and call next()', async () => {
            const { request, response } = createMocks({
                content: "testTweet",
                userid: 1
            });

            await tweetMiddleware[0](request, response, next); 
            await tweetMiddleware[1](request, response, next); 
            await tweetMiddleware[2](request, response, next); 

            expect(response.statusCode).toBe(HttpStatus.OK);
            expect(next).toHaveBeenCalled();
        });
    });
});