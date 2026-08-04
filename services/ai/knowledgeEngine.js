const { getBuilds } = require("./tools/buildTool");
const { normalize } = require("./tools/buildIndex");

const STOP_WORDS = new Set([
    "a", "al", "con", "como", "cual", "cuales", "de", "del", "el", "en",
    "es", "esta", "este", "la", "las", "los", "me", "mi", "para", "por",
    "que", "quiero", "recomienda", "recomendacion", "una", "un", "y"
]);

function queryTerms(query) {

    return [...new Set(
        normalize(query)
            .split(" ")
            .filter(term => term.length > 1 && !STOP_WORDS.has(term))
    )];

}

function scoreBuild(build, terms) {

    const category = normalize(build.categoria);
    const body = normalize(`${build.titulo} ${build.texto}`);
    let score = 0;

    for (const term of terms) {

        if (category.includes(term)) score += 5;
        if (body.includes(term)) score += 2;
        if ((build.keywords || []).includes(term)) score += 1;

    }

    return score;

}

function search(query, { limit = 3 } = {}) {

    const terms = queryTerms(query);

    if (!terms.length) return [];

    return getBuilds()
        .map(build => ({ build, score: scoreBuild(build, terms) }))
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(result => ({
            source: "builds",
            category: result.build.categoria,
            title: result.build.titulo,
            content: result.build.texto.trim(),
            image: result.build.imagen,
            score: result.score
        }));

}

function getContext(query, options) {

    const results = search(query, options);

    if (!results.length) return "";

    return results.map((result, index) => [
        `[Build ${index + 1} | ${result.category}]`,
        result.content,
        result.image ? `Imagen: ${result.image}` : ""
    ].filter(Boolean).join("\n")).join("\n\n");

}

function getDocuments(query, options) {

    return search(query, options);

}

module.exports = {

    search,
    getContext,
    getDocuments,
    queryTerms

};
