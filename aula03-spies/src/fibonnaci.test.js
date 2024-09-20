const { createSandbox } = require("sinon");
const sinon = createSandbox();
const assert = require("assert");

const Fibonacci = require("./fibonacci");

const fibonacci = new Fibonacci();
(async () => {
  const spy = sinon.spy(fibonacci, fibonacci.execute.name);

  for (const sequencia of fibonacci.execute(5)) {
  }
  const expectedCallCount = 6;

  assert.strictEqual(spy.callCount, expectedCallCount);

  const { args } = spy.getCall(2);

  const expectedParams = [3, 1, 2];

  assert.deepStrictEqual(args, expectedParams, "Os arrays não são iguais!");
})();
