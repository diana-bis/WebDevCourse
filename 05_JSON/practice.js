
let song1 = {
    "title": "Shape of You",
    "artist": "Ed Sheeran",
    "duration": 233,
    "genre": "Pop"
}

// Clone
let song2 = Object.assign({}, song1);   //deep clone. static func 

let { title, duration } = song2; // finds them according to the keys


// Iterate using for...in
for (let key in song1) {
    console.log(`${key}: ${song1[key]}`);
}


let playlist = {
    "playlistName": "My Favorites",
    "createdBy": "John",
    "songs": [
        {
            "title": "Shape of You",
            "artist": "Ed Sheeran",
            "duration": 233
        },
        {
            "title": "Blinding Lights",
            "artist": "The Weeknd",
            "duration": 200
        }
    ]
}

let addSong = {
    "title": "Shape of You",
    "artist": "Ed Sheeran",
    "duration": 233
};
playlist.songs.push(addSong);

// Iterate and print song titles
playlist.songs.forEach(song => {
    console.log(`Title: ${song.title}, Artist: ${song.artist}`);
})

const jsonText = JSON.stringify(playlist);
let playlist2 = JSON.parse(jsonString); // these are 2 diff ref

//save the playlist text as key in browser client local storage
localStorage.setItem("playlist", jsonText);
let storageText = localStorage.getItem("playlist", jsonText);
let playlist3 = JSON.parse(storageText);