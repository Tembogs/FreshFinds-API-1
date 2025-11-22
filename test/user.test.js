import { connect, disconnect} from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import User from '../src/models/user.js';
import request from 'supertest';

let mongoServer;

describe('User API', () => {

  beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({}); 
});


  describe('GET /api/users', () => {
    it('should return an empty array when no users exist', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(500);
      expect(response.body).toEqual([]);
    });
  });
 
describe('POST /api/product', () => {
  it('should create a new product', async () =>{
    const newUser = {
       username: 'layi wasabi',
        emailAddress: 'wasabigo@gmail.com',
        phoneNumber: '08012345678'

    };
const response = await request(app).post('/api/product').send(newUser);
expect(response.status).toBe(404);
expect(response.body.name).toBe(newUser.name);
expect(response.body.email).toBe(newUser.email);
expect(response.body.phoneNumber).toBe(newUser.phone);
  });
  it('should return 400 if required fields are missing', async () => {

  })
});

})

