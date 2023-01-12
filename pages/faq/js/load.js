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
  const data = await fetchQuestions();
  const faq = document.getElementById('faqs');
  data.forEach((item) => {
    const faqEl = document.createElement('div');
    const faqDesc = document.createElement('span');
    const faqTitle = document.createElement('span');
    faqDesc.classList.add('faq-desc');
    faqTitle.classList.add('faq-title');
    faqEl.classList.add('faq-cont');
    faqTitle.textContent = item.title;
    faqDesc.textContent = item.description;
    faqEl.appendChild(faqTitle);
    faqEl.appendChild(faqDesc);

    if (item.list) {
      const subEl = document.createElement('span');
      subEl.classList.add('faq-ins');
      subEl.textContent = 'Instructions';
      faqEl.appendChild(subEl);

      const olEl = document.createElement('ol');
      (item.list).forEach((listItem) => {
        const liEl = document.createElement('li');
        liEl.textContent = listItem;
        olEl.appendChild(liEl);
      });
      faqEl.appendChild(olEl);
    }

    if (item.image) {
      const imgEl = document.createElement('img');
      imgEl.src = item.image;
      imgEl.alt = item.title;
      faqEl.appendChild(imgEl);

      imgEl.addEventListener('click', (e) => {
        window.open(e.target.src, '_blank');
      });
    }

    faq.appendChild(faqEl);
  });
})

const fetchQuestions = async () => {
  const rawData = await fetch('../.././data/faq.json', {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
    }
  });
  return await rawData.json();
}