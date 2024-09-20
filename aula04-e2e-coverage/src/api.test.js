const { it, describe, after, before } = require("mocha");
const supertest = require("supertest");
const assert = require("assert");
describe("API Suite test", () => {
  let app;
  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });

  after((done) => app.close(done));
  describe("/contact:GET", () => {
    it("Should request the contact route and return HTTP Status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);

      assert.strictEqual(response.text, "Contact Us Page");
    });
  });

  describe("/login:POST", () => {
    it("Should request the login and return HTTP Status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({
          username: "Luis Fernando",
          password: "123",
        })
        .expect(200);
      assert.strictEqual(response.text, "OK");
    });
  });

  describe("/login:POST", () => {
    it("Should request the login and return HTTP Status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({
          username: "Xuxa da Silva",
          password: "123",
        })
        .expect(401);
      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, "Logging failed!");
    });
  });

  describe("/hi:get - 404", () => {
    it("Should request and existing page and return HTTP Status 404", async () => {
      const response = await supertest(app).get("/hi").expect(404);
      assert.strictEqual(response.text,"Not Found");
    });
  });
});
