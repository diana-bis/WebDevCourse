

//--Get HTML DOM Element Reference
const form = document.getElementById('songForm');
const list = document.getElementById('songList');
const submitBtn = document.getElementById('submitBtn');
// View mode
const cardGrid = document.getElementById('cardGrid');
const toggleViewBtn = document.getElementById('toggleViewBtn');
const toggleIcon = document.getElementById('toggleIcon');

//if doesnt exsist in local storage get empty array, else
//get json text and convert it to object json
let songs = JSON.parse(localStorage.getItem('playlist')) || [];
let viewMode = localStorage.getItem('viewMode') || 'table';

document.addEventListener('DOMContentLoaded', () => {
    updateViewVisibility();
    renderSongs();
});

// Sort Event for radio buttons
document.querySelectorAll('input[name="sortOption"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const sortBy = e.target.value;

        if (sortBy === 'name') {
            songs.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if (sortBy === 'date') {
            songs.sort((a, b) => b.dateAdded - a.dateAdded);
        }
        else if (sortBy === 'rating') {
            songs.sort((a, b) => b.rating - a.rating);
        }

        saveAndRender(); // Save to LocalStorage and re-render
    });
});

toggleViewBtn.addEventListener('click', () => {
    viewMode = (viewMode === 'table') ? 'cards' : 'table';
    localStorage.setItem('viewMode', viewMode);
    updateViewVisibility();
    renderSongs();
});

function updateViewVisibility() {
    if (viewMode === 'table') {
        document.querySelector('table').classList.remove('d-none');
        cardGrid.classList.add('d-none');
        toggleIcon.classList.remove('fa-grip');
        toggleIcon.classList.add('fa-list');
    } else {
        document.querySelector('table').classList.add('d-none');
        cardGrid.classList.remove('d-none');
        toggleIcon.classList.remove('fa-list');
        toggleIcon.classList.add('fa-grip');
    }
}


//user clicked the add button
form.addEventListener('submit', async (e) => {
    //dont submit the form to the server yet, let me handle it here
    e.preventDefault();

    //read forms data
    const id = document.getElementById('songId').value;
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const rating = parseInt(document.getElementById('rating').value);

    // add title if nothing was enetered
    const videoId = getYouTubeID(url);
    if (!videoId) {
        alert("Please enter a valid YouTube URL");
        return;
    }

    // fetch title automatically if empty
    let finalTitle = title.trim();
    if (!finalTitle) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching...';
        const apiTitle = await fetchVideoTitle(videoId);
        finalTitle = apiTitle || "Unknown Video";
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add';
    }

    //TODO VALIDATE FIELDS

    // If clicked submit for editing
    if (id) {
        const index = songs.findIndex(s => s.id == id);
        if (index !== -1) {
            // update fileds
            songs[index].title = finalTitle;
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
            title: finalTitle,
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
    cardGrid.innerHTML = '';

    songs.forEach(song => {

        const videoId = getYouTubeID(song.url);
        const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

        // Table view
        const row = document.createElement('tr');   // Create table row
        row.innerHTML = `
            <td><img src="${thumb}" alt="thumbnail" class="img-fluid rounded" width="120"></td>
            <td>${song.title}</td>
            <td>
                <button class="btn btn-outline-info btn-sm" onclick="openPlayer(${song.id})">
                    <i class="fas fa-play"></i> Play
                </button>
            </td>
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

        // Card view
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card h-100 border-primary text-center">
                <img src="${thumb}" class="card-img-top" alt="${song.title}">
                <div class="card-body">
                    <h5 class="card-title">${song.title}</h5>
                    <p class="card-text">Rating: ${song.rating}/10</p>
                    <button class="btn btn-outline-info btn-sm" onclick="openPlayer(${song.id})">
                        <i class="fas fa-play"></i> Play
                    </button>
                </div>
                <div class="card-footer d-flex justify-content-end gap-2">
                    <button class="btn btn-sm btn-warning" onclick="editSong(${song.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>`;
        cardGrid.appendChild(col);
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

function getYouTubeID(url) {
    try {
        const u = new URL(url);

        if (u.hostname.includes('youtu.be')) {
            return u.pathname.slice(1);
        }

        if (u.searchParams.get('v')) {
            return u.searchParams.get('v');
        }

        if (u.pathname.includes('/shorts/')) {
            return u.pathname.split('/shorts/')[1];
        }

        if (u.pathname.includes('/embed/')) {
            return u.pathname.split('/embed/')[1];
        }

        return null;
    } catch {
        return null;
    }
}

async function fetchVideoTitle(videoId) {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        console.log("Title fetched:", data.title);
        return data.title;
    } catch (err) {
        console.error("Title fetch error:", err);
        return null;
    }
}

function openPlayer(id) {
    const song = songs.find(s => s.id === id);
    if (!song) return;

    const videoId = getYouTubeID(song.url);
    if (!videoId) {
        alert("Invalid YouTube link");
        return;
    }

    // Load video into modal
    const player = document.getElementById('playerFrame');
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    // Set modal title
    document.getElementById('playerModalLabel').textContent = song.title;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('playerModal'));
    modal.show();

    // Stop video when modal closes
    document.getElementById('playerModal').addEventListener('hidden.bs.modal', () => {
        player.src = "";
    });
}

