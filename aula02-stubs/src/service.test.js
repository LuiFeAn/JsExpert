const Service = require("./service");
const assert = require("assert");
const { createSandbox } = require("sinon");
const sinon = createSandbox();

const mocks = {
  alderan: require("../mocks/alderan.json"),
  tatooine: require("../mocks/tatooine.json"),
};

const BASE_URL_1 = "https://swapi.dev/api/planets/1";
const BASE_URL_2 = "https://swapi.dev/api/planets/2";

(async () => {
 
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);

  stub.withArgs(BASE_URL_2).resolves(mocks.alderan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appeardIn: 5,
    };

    const results = await service.getPlanets(BASE_URL_1);
    assert.deepStrictEqual(results, expected);
  }

  {
    const expected = {
        name: "Alderaan",
        surfaceWater: "40",
        appeardIn: 2,
      };
  
      const results = await service.getPlanets(BASE_URL_2);
      assert.deepStrictEqual(results, expected);
  }

})();
