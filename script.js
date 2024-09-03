let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0').slice(0, 2);
  return `${hours}:${minutes}:${seconds}.${millisecondsFormatted}`;
}

function displayElapsedTime() {
  document.querySelector('.display').textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      displayElapsedTime();
    }, 10);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  displayElapsedTime();
  laps = [];
  document.querySelector('.laps').innerHTML = '';
}

function lapTimer() {
  if (isRunning) {
    laps.push(elapsedTime);
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    document.querySelector('.laps').appendChild(lapItem);
  }
}

document.querySelector('.start').addEventListener('click', startTimer);
document.querySelector('.pause').addEventListener('click', pauseTimer);
document.querySelector('.reset').addEventListener('click', resetTimer);
document.querySelector('.lap').addEventListener('click', lapTimer);
