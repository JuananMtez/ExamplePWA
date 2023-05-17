const profile = JSON.parse(localStorage.getItem('profile'))

if (profile === undefined || profile === null) {
    window.location.href = `login.html`;
}

const cameraBtn = document.getElementById('camera-button');
const recordBtn = document.getElementById('record-button');
const stopBtn = document.getElementById('stop-button');
const video= document.getElementById('camera');
const videoList = document.getElementById('video-list');

let media;
let chunks = [];
let open = false
let stream

const createVideoElement = (blob) => {

}


cameraBtn.addEventListener('click', async () => {
    if (open) {
        cameraBtn.innerHTML = 'Open camera'

        recordBtn.hidden = true
        stopBtn.hidden = true
        video.srcObject = null;
        stream.getTracks().forEach(track => track.stop());
        video.hidden = true
        open = false
        

    } else {
        try {
            
            cameraBtn.innerHTML = 'Opening camera'
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            video.srcObject = stream;
            media = new MediaRecorder(stream);
            media.ondataavailable = (event) => chunks.push(event.data);
            media.onstop = () => saveVideo();
            recordBtn.hidden = false
            stopBtn.hidden = false
            recordBtn.disabled = false;
            open = true
            cameraBtn.innerHTML = 'Close camera'
            video.hidden = false
        } catch (error) {
            console.error('Error opening camera', error);
        }
    }

});

recordBtn.addEventListener('click', () => {
    recordBtn.disabled = true;
    cameraBtn.disabled = true

    stopBtn.disabled = false;
    chunks = [];
    media.start();
});

stopBtn.addEventListener('click', () => {
    recordBtn.disabled = false;
    stopBtn.disabled = true;
    cameraBtn.disabled = false

    media.stop();
});

const saveVideo = () => {
    
    const blob = new Blob(chunks, { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(blob);
    const videoDiv = document.createElement('div')
    videoDiv.className = 'col-12 col-md-4 col-xl-3'
    const videoElem = document.createElement('video');

    videoElem.controls = true;
    videoElem.src = videoUrl;
    videoElem.style.width = '100%'

    videoDiv.appendChild(videoElem);
    videoList.appendChild(videoDiv);
}

