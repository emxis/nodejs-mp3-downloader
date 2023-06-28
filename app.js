const express = require('express');
const fs = require('fs');
const ytdl = require('ytdl-core');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/page/index.html");
});

app.post("/download", async (req, res) => {
    const url = req.body.url;
    const output = __dirname + '/audio.mp3';
    const music = ytdl(url, { quality: "highestaudio" });

    music.pipe(fs.createWriteStream(output));

    music.on('end', () => {
        res.download(output, 'audio.mp3', () => {
            fs.unlinkSync(output);
        });
    });
});

const port = 3000;

app.listen(port, () => console.log(`Port is running on ${port}`));
