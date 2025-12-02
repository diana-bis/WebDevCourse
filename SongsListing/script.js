

//--Get HTML DOM Element Reference
const form = document.getElementById('songForm');
const list = document.getElementById('songList');
const submitBtn = document.getElementById('submitBtn');

document.addEventListener('DOMContentLoaded', () => {
    renderSongs();
});

//if doesnt exsist in local storage get empty array, else
//get json text and convert it to object json
let songs = JSON.parse(localStorage.getItem('playlist')) || [];

//user clicked the add button
form.addEventListener('submit', (e) => {
    //dont submit the form to the server yet, let me handle it here
    e.preventDefault();

    //read forms data
    const id = document.getElementById('songId').value;
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const rating = parseInt(document.getElementById('rating').value);

    //TODO VALIDATE FIELDS

    // If clicked submit for editing
    if (id) {
        const index = songs.findIndex(s => s.id == id);
        if (index !== -1) {
            // update fileds
            songs[index].title = title;
            songs[index].url = url;
            songs[index].rating = rating;
        }
        // Returns the form button back to add mode
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add';
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-success');
        document.getElementById('songId').value = '';
    } else {
        //create JSON OBJ based on URL title
        const song = {
            id: Date.now(),  // Unique ID
            title: title,
            url: url,
            rating: rating,
            dateAdded: Date.now()
        };
        songs.push(song);
    }

    //TO DO SAVE  AND RERENDER 
    saveAndRender();

    form.reset();
});

//save to local storage and render UI Table
function saveAndRender() {

    localStorage.setItem('playlist', JSON.stringify(songs));
    //TODO RELOAD UI
    renderSongs();

}


function renderSongs() {
    list.innerHTML = ''; // Clear current list

    songs.forEach(song => {
        // Create table row
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${song.title}</td>
            <td><a href="${song.url}" target="_blank" class="text-info">Watch</a></td>
            <td>${song.rating}/10</td>
            <td class="text-end">
                <button class="btn btn-sm btn-warning me-2" onclick="editSong(${song.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(row);
    });
}


function deleteSong(id) {
    if (confirm('Are you sure?')) {
        // Filter out the song with the matching ID
        songs = songs.filter(song => song.id !== id);
        saveAndRender();
    }
}

function editSong(id) {
    const song = songs.find(s => s.id === id);
    if (!song) return;

    // loads the song’s info into the form fields
    document.getElementById('songId').value = song.id;
    document.getElementById('title').value = song.title;
    document.getElementById('url').value = song.url;
    document.getElementById('rating').value = song.rating;

    // changes button to update
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update';
    submitBtn.classList.remove('btn-success');  // green button for add
    submitBtn.classList.add('btn-primary');     // blue button for edit
}

