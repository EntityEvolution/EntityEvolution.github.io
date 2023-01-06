"use strict";
import SpaceTravel from './classes/SpaceTravel.js';

let canvas = null;
let skip = null;

window.addEventListener('load', async () => {
  // Elems
  canvas = document.getElementById('canvas');
  skip = document.getElementById('skip');
  const mobRefresh = document.getElementById('refresh-mob');
  const mobSidebar = document.getElementById('sidebar-mob');
  const sidenav = document.getElementById('sidenav');
  const sidenavClose = document.getElementById('sidenav-close');

  // three.js init
  const spaceTravel = new SpaceTravel(canvas, 200);
  if (spaceTravel.getWebGlSupport()) {
    supportsWebGL(spaceTravel);
  } else {
    // If WebGL is not supported, remove the canvas and show the text
    removeText();
    hideCanvas();
  }
  debugMode();

  // Setup fav res
  await setupFavRes();

  // Observer setup
  const titles = document.querySelectorAll('.intro-title');
  const paragraphs = document.querySelectorAll('.intro-p');
  const cards = document.querySelectorAll('.card-res');
  for (let i = 0; i < titles.length; i++) {
    setupScroll(titles[i], 'slide-left');
    setupScroll(paragraphs[i], 'slide-left');
  }

  for (let i = 0; i < cards.length; i++) {
    setupScroll(cards[i], 'slide-right');
  }

  setupScroll( document.querySelector('.card-title'), 'slide-right');

  // Listeners
  mobRefresh.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
  });

  mobSidebar.addEventListener('click', (e) => {
    e.preventDefault();
    // Change data-active attribute
    sidenav.setAttribute('data-active', sidenav.getAttribute('data-active') === 'true' ? 'false' : 'true');
  });

  sidenavClose.addEventListener('click', (e) => {
    e.preventDefault();
    // Change data-active attribute
    sidenav.setAttribute('data-active', 'false');
  });
});

window.addEventListener('resize', (e) => {
  // If the new width is less than 768px, set the sidenav attribute to false
  if (window.innerWidth > 768) {
    document.getElementById('sidenav').setAttribute('data-active', 'false');
  }
});

const setupScroll = (target, anim) => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add(anim);
        observer.disconnect();
      }
    })
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  })
  observer.observe(target);
}

const setupFavRes = async () => {
  const rawData = await fetch('./data/favres.json');
  const data = await rawData.json();
  const cont = document.querySelector('.card-cont');
  for (const res of data) {
    const contEl = document.createElement('div');
    const titleEl = document.createElement('span');
    const descEl = document.createElement('span');
    const btnEl = document.createElement('button');
    const aEl = document.createElement('a');
    contEl.classList.add('card-res');
    titleEl.classList.add('title');
    titleEl.textContent = res.title;
    descEl.textContent = res.description;
    aEl.textContent = res.label;
    aEl.href = res.url;
    aEl.target = '_blank';
    aEl.rel = 'noopener noreferrer';
    btnEl.appendChild(aEl);
    contEl.appendChild(titleEl);
    contEl.appendChild(descEl);
    contEl.appendChild(btnEl);
    cont.appendChild(contEl);
  }
}

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

const debugMode = () => {
  canvas.style.display = 'none';
  document.getElementById('wrapper').style.display = 'flex';
  document.querySelector('.slide-down').style.opacity = '1';
  document.getElementById('skip').remove();
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