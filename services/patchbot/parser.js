const cheerio = require("cheerio");

function limpiarTitulo(texto) {
    return texto.replace(/^#+/, "").trim();
}

function parsePatch(title, html) {

    const $ = cheerio.load(html);

    const result = {

        title,

        intro: [],

        sections: []

    };

    let currentSection = null;

    $("body").children().each((i, el) => {

        const tag = el.tagName?.toLowerCase();

        if (!tag) return;

        // ---------- NUEVA SECCIÓN ----------

        if (tag === "h2") {

            const titulo = $(el)
                .clone()
                .children()
                .remove()
                .end()
                .text()
                .trim();

            currentSection = {

                title: limpiarTitulo(titulo),

                blocks: []

            };

            result.sections.push(currentSection);

            return;

        }

        // Antes del primer h2 = INTRO

        const destino = currentSection
            ? currentSection.blocks
            : result.intro;

        // ---------- PÁRRAFOS ----------

        if (tag === "p") {

            const texto = $(el).text().trim();

            if (texto.length) {

                destino.push({

                    type: "paragraph",

                    text: texto

                });

            }

            return;

        }

        // ---------- LISTAS ----------

        if (tag === "ul") {

            const items = [];

            $(el).find("li").each((i, li) => {

                const txt = $(li).text().trim();

                if (txt.length)
                    items.push(txt);

            });

            if (items.length) {

                destino.push({

                    type: "list",

                    items

                });

            }

            return;

        }

        // ---------- IMÁGENES ----------

        if (tag === "img") {

            destino.push({

                type: "image",

                src: $(el).attr("src")

            });

        }

    });

    return result;

}

module.exports = {

    parsePatch

};