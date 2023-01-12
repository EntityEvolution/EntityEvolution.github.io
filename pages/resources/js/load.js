const mobRefresh = document.getElementById('refresh-mob');
const mobSidebar = document.getElementById('sidebar-mob');
const sidenav = document.getElementById('sidenav');
const sidenavClose = document.getElementById('sidenav-close');

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

window.addEventListener('load', async () => {
  const repos = await getRepos();
  const repoList = document.getElementById('repos');
  repos.forEach(repo => {
    const divEl = document.createElement('div');
    divEl.classList.add('repo-cont');
    const titleEl = document.createElement('span');
    const descEl = document.createElement('span');
    const btnEl = document.createElement('button');
    titleEl.classList.add('repo-title');
    descEl.classList.add('repo-desc');
    titleEl.textContent = repo.name;
    descEl.textContent = repo.description || 'No description.';
    btnEl.textContent = 'Go to repository!';

    divEl.appendChild(titleEl);
    divEl.appendChild(descEl);
    divEl.appendChild(btnEl);
    repoList.appendChild(divEl);

    btnEl.addEventListener('click', () => {
      window.open(repo.html_url, '_blank');
    })
    setupScroll(divEl, 'fade-in');
  });
})

const getRepos = async () => {
  const rawResp = await fetch('https://api.github.com/orgs/EntityEvolution/repos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  return await rawResp.json();
}

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
    threshold: 0.3
  })
  observer.observe(target);
}