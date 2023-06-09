import './styles.css';

const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.querySelector('#play-btn');
const volumeIconDiv = document.querySelector('.volume-icon');
const volumeIcon = document.querySelector('#volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
const controlContainer = document.querySelector('.controls-container')

function showPlayIcon(){
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
}


function togglePlay(){
    if (video.paused){
        video.play();
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.setAttribute('title','Paused');
    }else{
        video.pause();
        showPlayIcon();        
    }
    
    
    
    
}

video.addEventListener('ended',showPlayIcon);

function showControls(){
    controlContainer.style.opacity = 1;
    setTimeout(() => {
        controlContainer.style.opacity = 0;
    }, 7000);
}

function displayTime(time){
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9? seconds : `0${seconds}`;
    minutes = minutes > 9? minutes : `0${minutes}`;
    return `${minutes}:${seconds}`;
}

function updateProgress(){
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

let lastVolume = 1;

function setIcon(volume, isMuted){
console.log('seteando',volume)    
    volumeIcon.className = '';
    if (volume > 0.7){
        volumeIcon.classList.add('fas','fa-volume-up');
    }else if (volume < 0.7 && volume > 0){
        volumeIcon.classList.add('fas','fa-volume-down');
    }else if (volume ===0){
        // volumeIconDiv.classList.add('incorrecto');
        volumeIcon.classList.add('fas','fa-volume-off', 'muted');

        if (isMuted){
            volumeIcon.classList.add('fa-volume-mute');
        }
        
        
    }
}

function changeVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    if (volume < 0.1){
        volume = 0;
    }
    if (volume > 0.9){
        volume = 1;
    }
    volumeBar.style.width = `${volume*100}%`;
    video.volume = volume;
    console.log(volume);
    setIcon(volume,0);
    lastVolume = volume;
}

// mute/ unmute
function toggleMute(){
    let isMuted = 0;
    if (video.volume){
        lastVolume              = video.volume;
        video.volume            = 0;
        volumeBar.style.width   = 0;            
        isMuted                 = 1;
        
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        
    }
    
    setIcon(video.volume,isMuted);
}

function changeSpeed(){
    video.playbackRate = speed.value;
}



/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

function toggleFullscreen(){
    // if (!fullscreen){
    //     openFullscreen(player);
    // }else{
    //     closeFullscreen();
    // }

    !fullscreen ?  openFullscreen(player):closeFullscreen();

    fullscreen = !fullscreen;
}


playBtn.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay',updateProgress);
progressRange.addEventListener('click',setProgress);
volumeRange.addEventListener('click',changeVolume);
volumeIcon.addEventListener('click',toggleMute);
speed.addEventListener('change',changeSpeed);
fullscreenBtn.addEventListener('click',toggleFullscreen);
controlContainer.addEventListener('click',showControls);