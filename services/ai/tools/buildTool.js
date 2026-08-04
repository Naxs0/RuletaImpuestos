const fs = require("fs");
const path = require("path");
const { createKeywords } = require("./buildIndex");


const BUILDS_PATH = path.join(
    __dirname,
    "../../../knowledge/builds/builds.txt"
);

let builds = [];

function loadBuilds() {

    const data = fs.readFileSync(BUILDS_PATH, "utf8");

    builds = [];

    const lines = data.split(/\r?\n/);

    let categoria = "";
    let actual = null;

    for (const rawLine of lines) {

        const line = rawLine.trim();

        if (!line) continue;

        // Categoría
        if (
            !line.startsWith("-") &&
            !line.startsWith("https") &&
            !line.toLowerCase().startsWith("**build")
        ) {

            categoria = line;

            continue;
        }

        // Inicio de Build
        if (line.toLowerCase().startsWith("**build")) {

            if (actual) {
                builds.push(createKeywords(actual));
            }

            actual = {
                categoria,
                titulo: "",
                texto: "",
                imagen: ""
            };

            continue;

        }

        if (!actual) continue;

        if (!actual.titulo && line.startsWith("-")) {

            actual.titulo = line
                .replace("-", "")
                .trim();

        }

        if (line.startsWith("http")) {

            actual.imagen = line;

            continue;

        }

        actual.texto += rawLine + "\n";

    }

    if (actual) {

        builds.push(createKeywords(actual));

    }

    return builds;

}

function getBuilds() {

    if (!builds.length) loadBuilds();

    return builds;

}

function searchBuild(query) {

    const normalizedQuery = String(query || "").trim().toLowerCase();

    if (!normalizedQuery) return null;

    return getBuilds().find(build =>

        build.titulo.toLowerCase().includes(normalizedQuery) ||

        build.texto.toLowerCase().includes(normalizedQuery) ||

        build.categoria.toLowerCase().includes(normalizedQuery)

    ) || null;

}

module.exports = {

    loadBuilds,
    searchBuild,
    getBuilds

};
