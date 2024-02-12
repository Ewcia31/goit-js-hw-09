import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate <= now) {
      Notiflix.Report.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
startBtn.addEventListener('click', () => {
  const endDate = new Date(document.getElementById('datetime-picker').value);
  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = endDate - currentTime;
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      Notiflix.Report.success('Countdown finished!');
      return;
    }
    const timeParts = convertMs(remainingTime);

    const remainingDays = document.querySelector('[data-days]');
    remainingDays.textContent = addLeadingZero(timeParts.days);

    const remainingHours = document.querySelector('[data-hours]');
    remainingHours.textContent = addLeadingZero(timeParts.hours);

    const remainingMinutes = document.querySelector('[data-minutes]');
    remainingMinutes.textContent = addLeadingZero(timeParts.minutes);

    const remainingSeconds = document.querySelector('[data-seconds]');
    remainingSeconds.textContent = addLeadingZero(timeParts.seconds);
  }, 1000);
});
