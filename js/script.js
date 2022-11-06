import SpaceTravel from './classes/SpaceTravel.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const skip = document.getElementById('skip');
  const mobRefresh = document.getElementById('refresh-mob');
  const spaceTravel = new SpaceTravel(canvas, 200);
  const maxStars = spaceTravel.getMaxStars();
  let starsStopped = 0;
  spaceTravel.start();

  setTimeout(() => {
    if (starsStopped === 0) {
      spaceTravel.gentleStop();
    }
  }, 1500);

  window.addEventListener('starStopped', () => {
    starsStopped++;
    if (starsStopped === 1) {
      removeText(skip);
      return;
    }
    if (starsStopped === maxStars) {

      canvas.style.opacity = '0';
      setTimeout(() => {
        canvas.style.display = 'none';
        document.getElementById('wrapper').style.display = 'flex';
        document.querySelector('.slide-down').style.opacity = '1';
      }, 1000);
    }
  });

  skip.addEventListener('click', (e) => {
    e.preventDefault();
    starsStopped++;
    removeText(e.target, () => {

      canvas.style.opacity = '0';
      setTimeout(() => {
        canvas.style.display = 'none';
        document.getElementById('wrapper').style.display = 'flex';
        document.querySelector('.slide-down').style.opacity = '1';
      }, 500);
    });
  });

  mobRefresh.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
  });
});

const removeText = (skip, cb) => {
  skip.classList.remove('slideUp');
  skip.classList.add('slideDown');
  skip.onanimationend = () => {
    // Remove skip from the DOM
    skip.remove();
    cb && cb();
  };
}