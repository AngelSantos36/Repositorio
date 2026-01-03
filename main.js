async function loadPortfolio() {
  const grid = document.querySelector('#portfolioGrid');
  if (!grid) return;

  try {
    const res = await fetch('/content/portfolio.json', { cache: 'no-store' });
    const data = await res.json();

    grid.innerHTML = (data.items || []).map(item => `
      <a class="work-card" href="${item.link || '#'}" target="_blank" rel="noopener">
        ${item.cover
          ? `<img class="work-img" src="${item.cover}" alt="${item.title}">`
          : `<div class="work-img placeholder">Demo</div>`
        }
        <div class="work-body">
          <h3>${item.title || 'Trabajo'}</h3>
          <p>${item.desc || ''}</p>
          <div class="work-meta">
            <span class="pill">${item.type || 'video'}</span>
            ${item.category ? `<span class="pill ghost">${item.category}</span>` : ''}
          </div>
        </div>
      </a>
    `).join('');

  } catch (e) {
    console.error(e);
    grid.innerHTML = `<p class="note">No se pudo cargar el portafolio. Revisa content/portfolio.json</p>`;
  }
}

loadPortfolio();

