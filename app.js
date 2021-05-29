// track details
let trackCurrentlyPlaying = document.querySelector('.track-currently-playing');
let trackCover = document.querySelector('.track-cover');
let trackTitle = document.querySelector('.track-title');
let trackArtist = document.querySelector('.track-artist');
let trackAlbumTitle = document.querySelector('.track-album-title');


// pause, forward and backward buttons
let playPauseTrackButton = document.querySelector('.play-pause-track-button');
let nextTrackButton = document.querySelector('.next-track-button');
let previousTrackButton = document.querySelector('.prev-track-button');

// volume navigator
let controlSelectSlider = document.querySelector('.control-select-slider');
let volumeSlider = document.querySelector('.volume-slider');

document.getElementById("progressBar");

// track time stamp
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');

// setting the track index
let trackIndex = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let currentTrack = document.createElement('audio');

// Define the tracks that have to be played
let trackList = [
  {
    name: 'Ghost Town',
    artist: 'Vancouver Sleep Clinic',
    image: './images/track1-album-cover.jpg',
    path: './tracks/Ghost Town.mp3'
  },
  {
    name: 'Villa Luna',
    artist: 'Vancouver Sleep Clinic',
    image: './images/track1-album-cover.jpg',
    path: './tracks/Villa Luna.mp3'
  },
  {
    name: 'Bad Dream',
    artist: 'Vancouver Sleep Clinic',
    image: './images/track1-album-cover.jpg',
    path: './tracks/Bad Dream.mp3',
  },
];

// background color
document.body.style.backgroundColor = 'rgba(0, 0, 0)';


function loadTrack(trackIndex) {
  clearInterval(updateTimer);
  resetValues();
  currentTrack.src = trackList[trackIndex].path;
  currentTrack.load();

  trackCover.style.backgroundImage =
  'url(' + trackList[trackIndex].image + ')'; 
  // Change the above to template literals so it's consistent

  trackTitle.textContent = trackList[trackIndex].name;
  trackArtist.textContent = trackList[trackIndex].artist;
  trackCurrentlyPlaying.textContent = `Currently playing track ${(trackIndex + 1)} of ${trackList.length}`;

  updateTimer = setInterval(seekUpdate, 1000);
  currentTrack.addEventListener('ended', nextTrack);
}

function resetValues() {
  controlSelectSlider.value = 0;

  currentTime.textContent = '00:00';
  totalDuration.textContent = '00:00';
}

// Load the first track in the tracklist
loadTrack(trackIndex);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

// switching between pause and play icon buttons
function playTrack() {
  currentTrack.play();
  isPlaying = true;
  playPauseTrackButton.innerHTML = '<i class="fa fa-pause fa-3x"></i>';
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  playPauseTrackButton.innerHTML = '<i class="fa fa-play fa-3x"></i>';
}

function nextTrack() {
  if (trackIndex < trackList.length - 1)
    trackIndex += 1;
  else trackIndex = 0;
  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  if (trackIndex > 0)
    trackIndex -= 1;
  else trackIndex = trackList.length;
  loadTrack(trackIndex);
  playTrack();
}

function seekUpdate() {
  let seekPosition = 0;

  // NaN is a value that's not a number so this would be a number as the ! is there
  if (!isNaN(currentTrack.duration)) {
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);

    controlSelectSlider.value = seekPosition;

    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = `0${currentSeconds}`;}
    if (durationSeconds < 10) { durationSeconds = `0${durationSeconds}`;}
    if (currentMinutes < 10) { currentMinutes = `0${currentMinutes}`;}
    if (durationMinutes < 10) { durationMinutes = `0${durationMinutes}`;}

    currentTime.textContent = `${currentMinutes}:${currentSeconds}`;
    totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

function getTo() {
  let getToArea = curr_track.duration * (controlSelectSlider.value / 100);
  currentTrack.currentTime = getToArea;
}

function setVolume() {
  currentTrack.volume = volumeSlider.value / 100;
}


