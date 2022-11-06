import SpaceTravel from './classes/SpaceTravel.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const skip = document.getElementById('skip');
  const spaceTravel = new SpaceTravel(canvas, 200);
  const maxStars = spaceTravel.getMaxStars();
  let starsStopped = 0;
  spaceTravel.start();

  setTimeout(() => {
    if (starsStopped === 0) {
      spaceTravel.gentleStop();
    }
  }, 3000);

  window.addEventListener('starStopped', () => {
    starsStopped++;
    if (starsStopped === 1) {
      removeText(skip);
      return;
    }
    if (starsStopped === maxStars) {
      console.log('All stars stopped');
      document.getElementById('wrapper').style.display = 'flex';
      document.querySelector('.slide-down').style.opacity = '1';
    }
  });

  skip.addEventListener('click', (e) => {
    e.preventDefault();
    starsStopped++;
    removeText(e.target, () => {
      document.getElementById('wrapper').style.display = 'flex';
      document.querySelector('.slide-down').style.opacity = '1';

      canvas.style.opacity = '0';
      setTimeout(() => {
        canvas.style.display = 'none';
      }, 1000);
    });
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