let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/1.mp3');

let currentSong = 1;

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #ff0000 ${progress}%, #333 ${progress}%)`;
})

progressBar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #ff0000 ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName('playMusic'));

makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index = parseInt(e.target.id);
        currentSong = index;
        audio.src = `Audio/${index}.mp3`;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    })
});

let allMusic = Array.from(document.getElementsByClassName('music-card'));

songs = [
    { songName: 'I Really Do', songDes: 'Karan Aujla', songImage: 'Images/1.jpg', songPath: 'Audio/1.mp3' },
    { songName: 'Gehra Hua', songDes: 'Arjit Singh', songImage: 'Images/2.jpg', songPath: 'Audio/2.mp3' },
    { songName: 'Teri Yaad', songDes: 'Aditya Rikhari', songImage: 'Images/3.jpg', songPath: 'Audio/3.mp3' },
    { songName: 'Sarkaare', songDes: 'King', songImage: 'Images/4.jpg', songPath: 'Audio/4.mp3' },
    { songName: 'Vibrate', songDes: 'Kr$na & Badshah', songImage: 'Images/5.jpg', songPath: 'Audio/5.mp3' },
    { songName: 'Supreme', songDes: 'Shubh', songImage: 'Images/6.jpg', songPath: 'Audio/6.mp3' },
    { songName: '5 Am', songDes: 'Zaeden', songImage: 'Images/7.jpg', songPath: 'Audio/7.mp3' },
    { songName: 'Sapphire', songDes: 'Ed Sheeran', songImage: 'Images/8.jpg', songPath: 'Audio/8.mp3' },
    { songName: 'One Thousand Mile', songDes: 'Yo Yo Honey Singh', songImage: 'Images/9.jpg', songPath: 'Audio/9.mp3' },
    { songName: 'Water', songDes: 'Diljit Dosanjh', songImage: 'Images/10.jpg', songPath: 'Audio/10.mp3' },
    { songName: 'Bairan', songDes: 'Banjaare', songImage: 'Images/11.jpg', songPath: 'Audio/11.mp3' },
    { songName: 'Finding Her', songDes: 'Kushagra', songImage: 'Images/12.jpg', songPath: 'Audio/12.mp3' },
    { songName: 'Sheesha', songDes: 'Mitta Ror', songImage: 'Images/13.jpg', songPath: 'Audio/13.mp3' },
    { songName: 'Russian Bandana', songDes: 'Dhanda Nyoliwala', songImage: 'Images/14.jpg', songPath: 'Audio/14.mp3' },
    { songName: 'Blinding Lights', songDes: 'The Weeknd', songImage: 'Images/15.jpg', songPath: 'Audio/15.mp3' },
    { songName: 'Afsos', songDes: 'Anuv Jain & AP Dhillon', songImage: 'Images/16.jpg', songPath: 'Audio/16.mp3' },
    { songName: 'Tu', songDes: 'Talwiinder', songImage: 'Images/17.jpg', songPath: 'Audio/17.mp3' },
    { songName: 'Barbaad', songDes: 'Jubin Nautiyal', songImage: 'Images/18.jpg', songPath: 'Audio/18.mp3' }
]

order = [...songs];

allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs (originalOrder) {
    order = [...originalOrder];
    for(i = order.length - 1; i > 0; i--){
        let j = Math.floor((Math.random) * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

shuffle.addEventListener('click', () => {
    if(!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order = shuffleSongs(songs);
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');

        order = songs;
    }
});

repeat.addEventListener('click', () => {
    if(!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
})

playNextSong = () => {
    if(!songOnRepeat){
        let nextSong = (currentSong + 1) % playMusic.length;
        currentSong = nextSong == 0 ? 18 : nextSong;
    
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    } else {
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    }
}

playPrevSong = () => {
    let prevSong = (currentSong - 1);
    currentSong = prevSong == 0 ? 18 : prevSong;
    audio.src = `Audio/${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
}

function updateNowBar () {
    nowBar.getElementsByTagName('img')[0].src = order[currentSong-1].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentSong-1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentSong-1].songDes;
    addToRecentlyPlayed(currentSong - 1);
}

// ====== Recently Played Tracking ======
let recentlyPlayed = JSON.parse(localStorage.getItem('beatsRecentlyPlayed')) || [];

function addToRecentlyPlayed(songIndex) {
    // Don't add duplicate if it's the same as the most recent
    if (recentlyPlayed.length > 0 && recentlyPlayed[0] === songIndex) return;

    // Remove this song if it exists elsewhere in history
    recentlyPlayed = recentlyPlayed.filter(i => i !== songIndex);

    // Add to front (most recent first)
    recentlyPlayed.unshift(songIndex);

    // Keep only last 10 songs
    if (recentlyPlayed.length > 10) {
        recentlyPlayed = recentlyPlayed.slice(0, 10);
    }

    localStorage.setItem('beatsRecentlyPlayed', JSON.stringify(recentlyPlayed));
    renderRecentlyPlayed();
}

function renderRecentlyPlayed() {
    let container = document.getElementById('recentlyPlayedSongs');
    container.innerHTML = '';

    if (recentlyPlayed.length === 0) {
        container.innerHTML = `
            <div class="recently-played-empty">
                <i class="fa-solid fa-clock-rotate-left"></i>
                <span>Songs you play will appear here</span>
            </div>`;
        return;
    }

    recentlyPlayed.forEach((songIndex) => {
        let song = songs[songIndex];
        if (!song) return;

        let card = document.createElement('div');
        card.classList.add('music-card');
        card.innerHTML = `
            <img src="${song.songImage}">
            <div class="music-play-btn"><i class="playMusic fa-solid fa-circle-play"></i></div>
            <div class="img-title">${song.songName}</div>
            <div class="img-description">${song.songDes}</div>
        `;
        card.addEventListener('click', () => {
            currentSong = songIndex + 1;
            audio.src = song.songPath;
            audio.currentTime = 0;
            audio.play();
            updateNowBar();
            play.classList.remove('fa-circle-play');
            play.classList.add('fa-circle-pause');
        });
        container.appendChild(card);
    });
}

// Render on page load
renderRecentlyPlayed();

forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
})

audio.addEventListener('ended', () => {
    playNextSong();
})

backward.addEventListener('click', () => {
    playPrevSong();
});

// ====== Search Functionality ======
let searchInput = document.querySelector('.input-box');
let searchIcon = document.querySelector('.search-icon');
let searchResults = document.getElementById('searchResults');

function performSearch() {
    let query = searchInput.value.trim().toLowerCase();

    // Clear previous results
    searchResults.innerHTML = '';

    if (query === '') {
        searchResults.classList.remove('active');
        return;
    }

    // Filter songs matching the query by name or artist
    let matches = [];
    songs.forEach((song, index) => {
        if (
            song.songName.toLowerCase().includes(query) ||
            song.songDes.toLowerCase().includes(query)
        ) {
            matches.push({ ...song, index: index });
        }
    });

    if (matches.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fa-solid fa-face-sad-tear"></i>
                <span>No songs found for "<strong>${searchInput.value.trim()}</strong>"</span>
            </div>`;
        searchResults.classList.add('active');
        return;
    }

    // Build result cards
    matches.forEach((song) => {
        let resultCard = document.createElement('div');
        resultCard.classList.add('search-result-card');
        resultCard.innerHTML = `
            <img src="${song.songImage}" alt="${song.songName}">
            <div class="search-result-info">
                <div class="search-result-title">${song.songName}</div>
                <div class="search-result-artist">${song.songDes}</div>
            </div>
            <i class="fa-solid fa-circle-play search-result-play"></i>
        `;
        resultCard.addEventListener('click', () => {
            currentSong = song.index + 1;
            audio.src = song.songPath;
            audio.currentTime = 0;
            audio.play();
            updateNowBar();
            play.classList.remove('fa-circle-play');
            play.classList.add('fa-circle-pause');
            searchResults.classList.remove('active');
            searchInput.value = '';
        });
        searchResults.appendChild(resultCard);
    });

    searchResults.classList.add('active');
}

// Search on clicking the search icon
searchIcon.addEventListener('click', () => {
    performSearch();
});

// Search on pressing Enter
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && !e.target.closest('.search-bar')) {
        searchResults.classList.remove('active');
    }
});

// ====== Playlist Functionality ======
let playlists = JSON.parse(localStorage.getItem('beatsPlaylists')) || [];
let currentViewingPlaylist = null;

const playlistModal = document.getElementById('playlistModal');
const closePlaylistModal = document.getElementById('closePlaylistModal');
const playlistNameInput = document.getElementById('playlistNameInput');
const playlistSongList = document.getElementById('playlistSongList');
const savePlaylistBtn = document.getElementById('savePlaylistBtn');
const selectedCountEl = document.getElementById('selectedCount');
const playlistListEl = document.getElementById('playlistList');
const createPlaylistBtn = document.getElementById('createPlaylistBtn');
const createPlaylistBoxBtn = document.getElementById('createPlaylistBoxBtn');

// Playlist View elements
const playlistViewOverlay = document.getElementById('playlistViewOverlay');
const closePlaylistView = document.getElementById('closePlaylistView');
const playlistViewTitle = document.getElementById('playlistViewTitle');
const playlistViewSongs = document.getElementById('playlistViewSongs');
const deletePlaylistBtn = document.getElementById('deletePlaylistBtn');

// Open Create Playlist modal
function openPlaylistModal() {
    playlistNameInput.value = '';
    populateSongCheckboxes();
    playlistModal.classList.add('active');
}

createPlaylistBtn.addEventListener('click', openPlaylistModal);
createPlaylistBoxBtn.addEventListener('click', openPlaylistModal);

// Close modal
closePlaylistModal.addEventListener('click', () => {
    playlistModal.classList.remove('active');
});

playlistModal.addEventListener('click', (e) => {
    if (e.target === playlistModal) {
        playlistModal.classList.remove('active');
    }
});

// Populate song checkboxes in the modal
function populateSongCheckboxes() {
    playlistSongList.innerHTML = '';
    selectedCountEl.textContent = '0 songs selected';

    songs.forEach((song, index) => {
        let item = document.createElement('label');
        item.classList.add('playlist-song-item');
        item.innerHTML = `
            <input type="checkbox" value="${index}" class="playlist-checkbox">
            <img src="${song.songImage}" alt="${song.songName}">
            <div class="playlist-song-item-info">
                <span class="playlist-song-item-name">${song.songName}</span>
                <span class="playlist-song-item-artist">${song.songDes}</span>
            </div>
        `;
        playlistSongList.appendChild(item);
    });

    // Update selected count
    playlistSongList.addEventListener('change', updateSelectedCount);
}

function updateSelectedCount() {
    let checked = playlistSongList.querySelectorAll('.playlist-checkbox:checked').length;
    selectedCountEl.textContent = `${checked} song${checked !== 1 ? 's' : ''} selected`;
}

// Save playlist
savePlaylistBtn.addEventListener('click', () => {
    let name = playlistNameInput.value.trim();
    if (!name) {
        playlistNameInput.style.borderColor = '#ff4444';
        playlistNameInput.focus();
        setTimeout(() => { playlistNameInput.style.borderColor = ''; }, 1500);
        return;
    }

    let selectedIndexes = [];
    playlistSongList.querySelectorAll('.playlist-checkbox:checked').forEach((cb) => {
        selectedIndexes.push(parseInt(cb.value));
    });

    if (selectedIndexes.length === 0) {
        selectedCountEl.textContent = 'Please select at least 1 song!';
        selectedCountEl.style.color = '#ff4444';
        setTimeout(() => {
            selectedCountEl.style.color = '';
            updateSelectedCount();
        }, 1500);
        return;
    }

    let playlist = {
        id: Date.now(),
        name: name,
        songIndexes: selectedIndexes,
        createdAt: new Date().toISOString()
    };

    playlists.push(playlist);
    localStorage.setItem('beatsPlaylists', JSON.stringify(playlists));

    playlistModal.classList.remove('active');
    renderPlaylistList();
});

// Render playlists in the sidebar
function renderPlaylistList() {
    playlistListEl.innerHTML = '';

    if (playlists.length === 0) return;

    playlists.forEach((pl) => {
        let item = document.createElement('div');
        item.classList.add('playlist-sidebar-item');
        item.innerHTML = `
            <div class="playlist-sidebar-icon"><i class="fa-solid fa-list-ul"></i></div>
            <div class="playlist-sidebar-info">
                <div class="playlist-sidebar-name">${pl.name}</div>
                <div class="playlist-sidebar-count">${pl.songIndexes.length} song${pl.songIndexes.length !== 1 ? 's' : ''}</div>
            </div>
        `;
        item.addEventListener('click', () => openPlaylistView(pl));
        playlistListEl.appendChild(item);
    });
}

// Open playlist view
function openPlaylistView(playlist) {
    currentViewingPlaylist = playlist;
    playlistViewTitle.textContent = playlist.name;
    playlistViewSongs.innerHTML = '';

    if (playlist.songIndexes.length === 0) {
        playlistViewSongs.innerHTML = '<div class="playlist-view-empty"><i class="fa-solid fa-music"></i><p>No songs in this playlist</p></div>';
    } else {
        playlist.songIndexes.forEach((songIndex, i) => {
            let song = songs[songIndex];
            if (!song) return;

            let songCard = document.createElement('div');
            songCard.classList.add('playlist-view-song-card');
            songCard.innerHTML = `
                <span class="playlist-view-song-num">${i + 1}</span>
                <img src="${song.songImage}" alt="${song.songName}">
                <div class="playlist-view-song-info">
                    <div class="playlist-view-song-name">${song.songName}</div>
                    <div class="playlist-view-song-artist">${song.songDes}</div>
                </div>
                <i class="fa-solid fa-circle-play playlist-view-play-btn"></i>
            `;
            songCard.addEventListener('click', () => {
                currentSong = songIndex + 1;
                audio.src = song.songPath;
                audio.currentTime = 0;
                audio.play();
                updateNowBar();
                play.classList.remove('fa-circle-play');
                play.classList.add('fa-circle-pause');
            });
            playlistViewSongs.appendChild(songCard);
        });
    }

    playlistViewOverlay.classList.add('active');
}

// Close playlist view
closePlaylistView.addEventListener('click', () => {
    playlistViewOverlay.classList.remove('active');
    currentViewingPlaylist = null;
});

playlistViewOverlay.addEventListener('click', (e) => {
    if (e.target === playlistViewOverlay) {
        playlistViewOverlay.classList.remove('active');
        currentViewingPlaylist = null;
    }
});

// Delete playlist
deletePlaylistBtn.addEventListener('click', () => {
    if (!currentViewingPlaylist) return;
    playlists = playlists.filter(p => p.id !== currentViewingPlaylist.id);
    localStorage.setItem('beatsPlaylists', JSON.stringify(playlists));
    playlistViewOverlay.classList.remove('active');
    currentViewingPlaylist = null;
    renderPlaylistList();
});

// Initial render of saved playlists
renderPlaylistList();
