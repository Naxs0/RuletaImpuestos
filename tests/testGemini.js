require("dotenv").config();

const { testConnection } = require("../services/ai/gemini");

(async () => {

    try {

        const response = await testConnection();

        console.log(response);

    } catch (err) {

        console.error(err);

    }

})();