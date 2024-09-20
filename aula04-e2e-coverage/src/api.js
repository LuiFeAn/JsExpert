const http = require("http");
const { once } = require("events");

const DEFAULT_USER = {
  username: "Luis Fernando",
  password: "123",
};

const routes = {
  "/contact:get": (request, response) => {
    response.write("Contact Us Page");
    return response.end();
  },
  "/login:post": async (request, response) => {
    const data = JSON.parse(await once(request, "data"));
    const toLower = (text) => text.toLowerCase();
    if (
      toLower(data.username) != toLower(DEFAULT_USER.username) ||
      data.password != DEFAULT_USER.password
    ) {
      response.writeHead(401);
      response.end("Logging failed!");
      return;
    }

    return response.end("OK");
  },
  default(request, response) {
    response.writeHead(404);
    return response.end("Not Found");
  },
};

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("running at 3000"));

module.exports = app;
