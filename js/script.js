"use strict";
import SpaceTravel from './classes/SpaceTravel.js';

console.log(PROD)

let canvas = null;
let skip = null;

window.addEventListener('load', () => {
  canvas = document.getElementById('canvas');
  skip = document.getElementById('skip');
  const mobRefresh = document.getElementById('refresh-mob');
  const spaceTravel = new SpaceTravel(canvas, 200);
  if (spaceTravel.getWebGlSupport()) {
    supportsWebGL(spaceTravel);
  } else {
    // If WebGL is not supported, remove the canvas and show the text
    removeText();
    hideCanvas();
  }

  mobRefresh.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
  });
});

const removeText = (cb) => {
  skip.classList.remove('slideUp');
  skip.classList.add('slideDown');
  skip.onanimationend = () => {
    // Remove skip from the DOM
    skip.remove();
    if (cb && typeof cb === 'function') {
      cb();
    }
  };
}

const hideCanvas = () => {
  canvas.style.opacity = '0';
  setTimeout(() => {
    canvas.style.display = 'none';
    document.getElementById('wrapper').style.display = 'flex';
    document.querySelector('.slide-down').style.opacity = '1';
  }, 100);
}

const supportsWebGL = (spaceTravel) => {
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
    if (starsStopped === maxStars / 2) {
      removeText(skip);
      return;
    }
    if (starsStopped === maxStars) {
      hideCanvas();
    }
  });

  skip.addEventListener('click', (e) => {
    e.preventDefault();
    starsStopped++;
    removeText(() => {
      hideCanvas();
    });
  });
}