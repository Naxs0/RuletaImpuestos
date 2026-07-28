require("dotenv").config();

(async () => {

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: "Responde únicamente con OK."
                            }
                        ]
                    }
                ]
            })
        }
    );

    const json = await response.json();

    console.log(JSON.stringify(json, null, 2));

})();