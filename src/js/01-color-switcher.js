function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

let interval;

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', function () {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  interval = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', function () {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(interval);
});
