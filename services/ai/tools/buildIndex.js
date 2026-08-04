function normalize(text) {

    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

}

function createKeywords(build) {

    const words = [];

    words.push(build.titulo);

    words.push(build.categoria);

    words.push(build.texto);

    const keywords = new Set();

    words
        .join(" ")
        .split(/\s+/)
        .forEach(word => {

            word = normalize(word);

            if (word.length < 3) return;

            keywords.add(word);

        });

    build.keywords = [...keywords];

    return build;

}

module.exports = {

    createKeywords,
    normalize

};
