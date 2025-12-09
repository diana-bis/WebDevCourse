const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

// static folder is client folder
app.use(express.static(path.join(__dirname, "client")));

// Example in-memory data
const songs = [
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', rating: 5 },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', rating: 4 },
    { id: 3, title: 'Someone Like You', artist: 'Adele', rating: 5 }
];

// get songs
app.get('/api/songs', (req, res) => {
    res.json(songs);  // sends as JSON
});

// get id
app.get('/api/songs/:id', (req, res) => {
    const song = songs.find(s => s.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
});

// removes the html from home.html in the http
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/home.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/home.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/home.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


