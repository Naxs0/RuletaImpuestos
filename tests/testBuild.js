const buildTool = require("../services/ai/tools/buildTool");

buildTool.loadBuilds();

const build = buildTool.searchBuild("Santificador");

console.log(build.keywords);