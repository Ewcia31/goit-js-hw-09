import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const firstDelay = parseInt(formData.get('delay'));
  const delayStep = parseInt(formData.get('step'));
  const amount = parseInt(formData.get('amount'));

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + (i - 1) * delayStep;
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
