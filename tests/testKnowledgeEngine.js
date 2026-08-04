const assert = require("assert");
const knowledgeEngine = require("../services/ai/knowledgeEngine");
const buildTool = require("../services/ai/tools/buildTool");

buildTool.loadBuilds();

const santificador = knowledgeEngine.search("build santificador grupal");

assert.ok(santificador.length > 0, "Debe encontrar una build de Santificador");
assert.match(santificador[0].content, /Santificador/i);
assert.match(santificador[0].category, /Grupales Healer/i);

const context = knowledgeEngine.getContext("arco largo estatica");

assert.match(context, /Arco Largo/i);
assert.match(context, /Estatica DPS/i);
assert.deepStrictEqual(knowledgeEngine.search("el y de"), []);

const docs = knowledgeEngine.getDocuments(
    "santificador"
);

assert.ok(Array.isArray(docs));

assert.ok(docs.length > 0);

assert.equal(
    docs[0].source,
    "builds"
);

console.log("Knowledge Engine: OK");
