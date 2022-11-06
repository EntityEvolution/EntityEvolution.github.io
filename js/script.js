import SpaceTravel from './classes/SpaceTravel.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const spaceTravel = new SpaceTravel(canvas, 200);
  spaceTravel.start();
});
