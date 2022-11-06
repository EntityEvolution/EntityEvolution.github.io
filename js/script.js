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
      const wrapper = document.getElementById('wrapper');
      wrapper.style.display = 'flex';
      document.querySelector('.slide-down').style.opacity = '1';
    }
  });

  skip.addEventListener('click', (e) => {
    e.preventDefault();
    spaceTravel.gentleStop();
    removeText(e.target);
  });
});

const removeText = (skip) => {
  skip.classList.remove('slideUp');
  skip.classList.add('slideDown');
  skip.onanimationend = () => {
    // Remove skip from the DOM
    skip.remove();
  };
}