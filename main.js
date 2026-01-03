async function loadPortfolio() {
  try {
    const res = await fetch('/content/portfolio.json', { cache: "no-store" });
    const data = await res.json();

    const grid = document.querySelector('#portfolioGrid');
    if (!grid) return;

    grid.innerHTML = data.items.map(item => `
      <a class="work-card" href="${item.link || '#'}" target="_blank" rel="noopener">
        ${item.cover ? `<img src="${item.cover}" alt="${item.title}" class="work-img">` : `<div class="work-img placeholder">Sin imagen</div>`}
        <div class="work-body">
          <h3>${item.title}</h3>
          <p>${item.desc || ''}</p>
          <div class="work-meta">
            <span class="pill">${item.type}</span>
            ${item.category ? `<span class="pill ghost">${item.category}</span>` : ''}
          </div>
        </div>
      </a>
    `).join('');
  } catch (e) {
    console.error(e);
  }
}

loadPortfolio();
