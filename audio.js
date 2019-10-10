const audio = new Audio('./Assets/test.m4a');

const playSong = () => {
  audio.play();
};

const pauseSong = () => {
  audio.pause();
};

document.querySelector('#play').addEventListener('click', playSong);
document.querySelector('#pause').addEventListener('click', pauseSong);
