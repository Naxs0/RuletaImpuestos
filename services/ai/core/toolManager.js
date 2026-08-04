const knowledgeEngine = require("../knowledgeEngine");
const patchTool = require("../tools/patchTool");
const webTool = require("../tools/webTool");

async function getContext(context) {

    const sources = [];

    const knowledge = knowledgeEngine.getContext(context.content);

    if (knowledge) {
        sources.push({
            source: "knowledge",
            priority: 100,
            content: knowledge
        });
    }

    if (await patchTool.canHandle(context)) {

        const patch = await patchTool.getContext(context);

        if (patch) {
            sources.push({
                source: "patch",
                priority: patchTool.priority,
                content: patch
            });
        }

    }

    if (await webTool.canHandle(context)) {

        const web = await webTool.getContext(context);

        if (web) {
            sources.push({
                source: "web",
                priority: webTool.priority,
                content: web
            });
        }

    }

    sources.sort((a, b) => b.priority - a.priority);

    return sources;

}

module.exports = {
    getContext
};