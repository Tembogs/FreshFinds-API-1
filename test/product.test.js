import { connect, disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";
import product from "../src/models/product.js";
import request from "supertest";

let mongoServer;

describe("PRODUCT API", () => {
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
    await product.deleteMany({});
  });

  describe("GET /api/products", () => {
    it("should return an empty array when no products exist", async () => {
      const response = await request(app).get("/api/products");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should return products when they exist", async () => {
      await product.create({
        name: "iPhone 16 Pro",
        price: 1200000,
        description: "Latest Apple flagship",
        images: ["https://example.com/iphone.jpg"],
        stock: 50,
      });

      const response = await request(app).get("/api/products");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe("iPhone 16 Pro");
    });
  });

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const newProduct = {
        name: "Galaxy A07",
        price: 20000,
        description: "Slim and light",
        images: ["98080899"],
        stock: 123456,
      };

      const response = await request(app).post("/api/products").send(newProduct);
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(newProduct.name);
      expect(response.body.price).toBe(newProduct.price);
      expect(response.body.description).toBe(newProduct.description);
      expect(response.body.images).toEqual(newProduct.images);
      expect(response.body.stock).toBe(newProduct.stock);
    });

    it("should return 400 if required fields are missing", async () => {
      const incompleteProduct = {
        price: 10000,
        stock: 5,
      };

      const response = await request(app).post("/api/products").send(incompleteProduct);
      expect(response.status).toBe(400);
    });
  });
});
