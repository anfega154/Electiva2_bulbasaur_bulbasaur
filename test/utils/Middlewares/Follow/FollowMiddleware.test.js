const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const httpMocks = require('node-mocks-http');
const { followUserNameMiddleware } = require('../../../../src/Utils/Middlewares/Follow/FollowMiddleware');
const Follower = require('../../../../src/v1/Follow/Models/Follower');

jest.mock('../../../../src/v1/Follow/Models/Follower', () => ({
  findByPk: jest.fn()
}));

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
      const { request, response } = createMocks({ usernamefollowingid: "testFollowerid" });

      for (let middleware of followUserNameMiddleware) {
        await middleware(request, response, next);
      };
      const responseData = JSON.parse(response._getData());

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
      const responseData = JSON.parse(response._getData());

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      const messages = responseData.message.split(', ');
      expect(messages).toContain('followerid must be numeric');
    });
  });

  describe('with followerid is empty', () => {
    test('should return 400 if followerid is empty', async () => {
      const { request, response } = createMocks({ followerid: "", usernamefollowingid: "validUsername" });

      for (let middleware of followUserNameMiddleware) {
        await middleware(request, response, next);
      }
      const responseData = JSON.parse(response._getData());

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      const messages = responseData.message.split(', ');
      expect(messages).toContain('missing data to fill');
    });
  });

  describe('with followerid does not exist', () => {
    test('should return 400 if followerid does not exist', async () => {
        Follower.findByPk.mockResolvedValue(null); // Simulando que el follower no existe

        const { request, response } = createMocks({ followerid: 9999, usernamefollowingid: "validUsername" });

        for (let middleware of followUserNameMiddleware) {
            await middleware(request, response, next);
        }
        const responseData = JSON.parse(response._getData());

        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(responseData.message).toContain('Follower is not defined');
    });
});
});
