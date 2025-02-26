const Express = require("express");
const cors = require("cors");
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = Express();

const genAI = new GoogleGenerativeAI(process.env.API);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.use(cors());
app.use(Express.json());

app.post("/generate", async (req, res) => {
    try {
        const {prompt} = req.body;
        if(!prompt) {
           return res.send(400).json({error: "Prompt is required"});
        }

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        res.json({response: responseText});
    } catch(error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
});

// const prompt = "Explain how AI works";

app.listen(process.env.PORT, () => {
    console.log("Server is started");
})