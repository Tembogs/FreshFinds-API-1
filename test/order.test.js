// import mongoose from 'mongoose';
// import request from 'supertest';
// import app from '../src/app.js';
// import Order from '../src/models/order.js';
// import Product from '../src/models/product.js';
// import User from '../src/models/user.js';

// describe('API Tests', () => {
// 	let userToken;
// 	let adminToken;
// 	let user;
// 	let product;

// 	beforeAll(async () => {
// 		const uri = process.env.MONGO_URL;
// 		await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// 		// Create user and admin
// 		await request(app)
// 			.post('/api/v1/auth/register')
// 			.send({ name: 'Test User', email: 'user@test.com', password: 'password123', phoneNumber: "1234567890", address: "123 Test Street" });
// 		await request(app)
// 			.post('/api/v1/auth/register')
// 			.send({ name: 'Admin User', email: 'admin@test.com', password: 'password123', phoneNumber: "0987654321", address: "321 Admin Street" });
// 		await User.updateOne({ email: 'admin@test.com' }, { $set: { role: 'admin' } });

// 		const userRes = await request(app)
// 			.post('/api/v1/auth/login')
// 			.send({ email: 'user@test.com', password: 'password123' });
// 		userToken = userRes.body.token;
// 		user = userRes.body.user;


// 		const adminRes = await request(app)
// 			.post('/api/v1/auth/login')
// 			.send({ email: 'admin@test.com', password: 'password123' });
// 		adminToken = adminRes.body.token;

// 		product = await Product.create({ name: 'Test Product', price: 100, description: 'A test product', images: ['image.jpg'], stock: 10 });
// 	});

// 	afterAll(async () => {
// 		await User.deleteMany({});
// 		await Product.deleteMany({});
// 		await Order.deleteMany({});
// 		await mongoose.disconnect();
// 	});


// 	describe('/api/v1/orders', () => {
// 		beforeEach(async () => {
// 			await Order.deleteMany({});
// 			// Set user cart with one product before each test in this suite
// 			await User.updateOne({ _id: user._id }, { $set: { cart: [{ product: product._id, quantity: 1 }] } });
// 		});

// 		describe('POST /checkout', () => {
// 			it('should create an order with Cash on Delivery', async () => {
// 				const res = await request(app)
// 					.post('/api/v1/orders/checkout')
// 					.set('Authorization', `Bearer ${userToken}`)
// 					.send({ paymentMethod: 'Cash on Delivery' });

// 				expect(res.status).toBe(201);
// 				expect(res.body.status).toBe('Pending');
// 				expect(res.body.payment.method).toBe('Cash on Delivery');
// 			});

// 			it('should return a Paystack authorization URL for Paystack payment', async () => {
// 				const res = await request(app)
// 					.post('/api/v1/orders/checkout')
// 					.set('Authorization', `Bearer ${userToken}`)
// 					.send({ paymentMethod: 'Paystack' });

// 				expect(res.status).toBe(200);
// 				expect(res.body).toHaveProperty('authorization_url');
// 			});

// 			it('should return 401 if user is not authenticated', async () => {
// 				const res = await request(app)
// 					.post('/api/v1/orders/checkout')
// 					.send({ paymentMethod: 'Cash on Delivery' });

// 				expect(res.status).toBe(401);
// 			});

// 			it('should return 400 if cart is empty', async () => {
// 				await User.updateOne({ _id: user._id }, { $set: { cart: [] } }); // Clear cart for this specific test
// 				const res = await request(app)
// 					.post('/api/v1/orders/checkout')
// 					.set('Authorization', `Bearer ${userToken}`)
// 					.send({ paymentMethod: 'Cash on Delivery' });

// 				expect(res.status).toBe(400);
// 				expect(res.body.message).toBe('User not found or cart is empty');
// 			});
// 		});

// 		describe('GET /', () => {
// 			it('should return all orders for the authenticated user', async () => {
// 				await Order.create({ user: user._id, items: [{ product: product._id, quantity: 1 }], total: 100 });
// 				const res = await request(app)
// 					.get('/api/v1/orders')
// 					.set('Authorization', `Bearer ${userToken}`);

// 				expect(res.status).toBe(200);
// 				expect(res.body.length).toBe(1);
// 				expect(res.body[0].total).toBe(100);
// 			});

// 			it('should return 401 if user is not authenticated', async () => {
// 				const res = await request(app).get('/api/v1/orders');
// 				expect(res.status).toBe(401);
// 			});
// 		});

// 		describe('GET /all', () => {
// 			it('should return all orders for an admin user', async () => {
// 				await Order.create({ user: user._id, items: [{ product: product._id, quantity: 1 }], total: 100 });
// 				const res = await request(app)
// 					.get('/api/v1/orders/all')
// 					.set('Authorization', `Bearer ${adminToken}`);

// 				expect(res.status).toBe(200);
// 				expect(res.body.length).toBe(1);
// 			});

// 			it('should return 403 if user is not an admin', async () => {
// 				const res = await request(app)
// 					.get('/api/v1/orders/all')
// 					.set('Authorization', `Bearer ${userToken}`);

// 				expect(res.status).toBe(403);
// 			});
// 		});

// 		describe('GET /:id', () => {
// 			it('should return a single order by ID', async () => {
// 				const order = await Order.create({ user: user._id, items: [{ product: product._id, quantity: 1 }], total: 100 });
// 				const res = await request(app)
// 					.get(`/api/v1/orders/${order._id}`)
// 					.set('Authorization', `Bearer ${userToken}`);

// 				expect(res.status).toBe(200);
// 				expect(res.body.total).toBe(100);
// 			});

// 			it('should return 404 if order is not found', async () => {
// 				const res = await request(app)
// 					.get(`/api/v1/orders/${new mongoose.Types.ObjectId()}`)
// 					.set('Authorization', `Bearer ${userToken}`);

// 				expect(res.status).toBe(404);
// 			});

// 			it('should return 400 for an invalid order ID', async () => {
// 				const res = await request(app)
// 					.get('/api/v1/orders/invalid-id')
// 					.set('Authorization', `Bearer ${userToken}`);

// 				expect(res.status).toBe(400);
// 			});
// 		});

// 		describe('PUT /:id', () => {
// 			it('should update the order status', async () => {
// 				const order = await Order.create({ user: user._id, items: [{ product: product._id, quantity: 1 }], total: 100 });
// 				const res = await request(app)
// 					.put(`/api/v1/orders/${order._id}`)
// 					.set('Authorization', `Bearer ${adminToken}`)
// 					.send({ status: 'Shipped' });

// 				expect(res.status).toBe(200);
// 				expect(res.body.status).toBe('Shipped');
// 			});

// 			it('should return 403 if user is not an admin', async () => {
// 				const order = await Order.create({ user: user._id, items: [{ product: product._id, quantity: 1 }], total: 100 });
// 				const res = await request(app)
// 					.put(`/api/v1/orders/${order._id}`)
// 					.set('Authorization', `Bearer ${userToken}`)
// 					.send({ status: 'Shipped' });

// 				expect(res.status).toBe(403);
// 			});

// 			it('should return 404 if order is not found', async () => {
// 				const res = await request(app)
// 					.put(`/api/v1/orders/${new mongoose.Types.ObjectId()}`)
// 					.set('Authorization', `Bearer ${adminToken}`)
// 					.send({ status: 'Shipped' });

// 				expect(res.status).toBe(404);
// 			});
// 		});
// 	});
// });