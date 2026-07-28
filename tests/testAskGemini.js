require("dotenv").config();

const { askGemini } = require("../services/ai/gemini");

(async () => {

    try {

        const respuesta = await askGemini(
            "¿Cuál es la capital de Chile? Responde solo con una palabra."
        );

        console.log(respuesta);

    } catch (err) {

        console.error(err);

    }

})();