const express = require("express");
//const app = express();
const supertest = require("supertest");
const app = require("../index.js");
const User = require("../router/user");
const router = express.Router();
const {
  // creatuser,
  // insertuser,
  // login,
 getUser,

  // me
} = require("../controller/user");



test("GET users", async function () {
  const res = await supertest(app).get("/users/getUser");
  expect(res.statusCode).toBe(200);
 

});

test("Post Insertusers", async function () {
  const res = await supertest(app).post("/users/User");
  expect(res.statusCode).toBe(200);
});
// test("Get One User", async function () {
//   const res = await supertest(app).post("/users/me");
//   expect(res.statusCode).toBe(200);
// });

  // afterEach(async () => {
  //   await app.close()
  //   // Close the server instance after each test
  
  // })