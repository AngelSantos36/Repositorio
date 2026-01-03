async function loadPortfolio() {
  const grid = document.querySelector('#portfolioGrid');
  if (!grid) return;

  try {
    const res = await fetch('/content/portfolio.json', { cache: 'no-store' });
    const data = await res.json();
    const items = data.items || [];

    if (!items.length) {
      grid.innerHTML = `<div class="work-card"><div class="work-body"><h3>Aún no hay trabajos</h3><p>Agrega items en content/portfolio.json desde /admin.</p></div></div>`;
      return;
    }

    grid.innerHTML = items.map(item => `
      <a class="work-card" href="${item.link || '#'}" target="_blank" rel="noopener">
        <div class="work-img">
          ${item.cover ? `<img src="${item.cover}" alt="${item.title || ''}">` : 'Sin portada'}
        </div>
        <div class="work-body">
          <h3>${item.title || 'Trabajo'}</h3>
          <p>${item.desc || ''}</p>
          <div class="meta">
            <span class="pill">${item.type || 'video'}</span>
            ${item.category ? `<span class="pill">${item.category}</span>` : ''}
          </div>
        </div>
      </a>
    `).join('');

  } catch (e) {
    grid.innerHTML = `<div class="work-card"><div class="work-body"><h3>Error cargando portafolio</h3><p>Revisa content/portfolio.json</p></div></div>`;
  }
}
loadPortfolio();
