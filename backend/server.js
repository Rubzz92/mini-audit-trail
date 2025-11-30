const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let versions = [];
let lastText = "";

// Save version
app.post("/save-version", (req, res) => {
    const { text } = req.body;

    // Calculate diffs
    const oldWords = lastText.split(" ");
    const newWords = text.split(" ");

    const addedWords = newWords.filter(w => !oldWords.includes(w));
    const removedWords = oldWords.filter(w => !newWords.includes(w));

    const entry = {
        timestamp: new Date().toLocaleString(),
        addedWords,
        removedWords,
        oldLength: lastText.length,
        newLength: text.length
    };

    versions.push(entry);
    lastText = text;

    res.json({ success: true });
});

// Get all versions
app.get("/versions", (req, res) => {
    res.json(versions);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
