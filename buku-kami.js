(() => {
  const grid = document.getElementById('bookGrid');
  const cards = [...grid.querySelectorAll('.book-card')];
  const search = document.getElementById('bookSearch');
  const sort = document.getElementById('bookSort');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const count = document.getElementById('bookCount');
  const empty = document.getElementById('emptyState');
  let activeCategory = 'semua';

  const rupiah = value => `Rp${Number(value).toLocaleString('id-ID')}`;
  function updateCatalog() {
    const term = search.value.trim().toLowerCase();
    const visible = cards.filter(card => {
      const categoryMatch = activeCategory === 'semua' || card.dataset.category === activeCategory;
      const textMatch = `${card.dataset.title} ${card.dataset.author}`.toLowerCase().includes(term);
      card.hidden = !(categoryMatch && textMatch);
      return categoryMatch && textMatch;
    });
    visible.sort((a, b) => {
      if (sort.value === 'price-low') return +a.dataset.price - +b.dataset.price;
      if (sort.value === 'price-high') return +b.dataset.price - +a.dataset.price;
      if (sort.value === 'title') return a.dataset.title.localeCompare(b.dataset.title, 'id');
      return +b.dataset.year - +a.dataset.year;
    }).forEach(card => grid.appendChild(card));
    count.textContent = visible.length;
    empty.hidden = visible.length !== 0;
  }
  search.addEventListener('input', updateCatalog);
  sort.addEventListener('change', updateCatalog);
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('is-active'));
    button.classList.add('is-active'); activeCategory = button.dataset.filter; updateCatalog();
  }));

  const dialog = document.getElementById('bookDialog');
  const cover = document.getElementById('dialogCover');
  document.querySelectorAll('[data-quick]').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.book-card');
    document.getElementById('dialogTitle').textContent = card.dataset.title;
    document.getElementById('dialogAuthor').textContent = card.dataset.author;
    document.getElementById('dialogCategory').textContent = card.querySelector('.book-category').textContent;
    document.getElementById('dialogYear').textContent = card.dataset.year === '0' ? 'Segera hadir' : card.dataset.year;
    document.getElementById('dialogStatus').textContent = card.dataset.year === '0' ? 'Coming Soon' : 'Tersedia';
    document.getElementById('dialogPrice').textContent = card.dataset.priceLabel || rupiah(card.dataset.price);
    document.getElementById('dialogOrder').href = card.querySelector('.book-buy a').href;
    const colorClass = button.className.split(' ').find(c => /^cover-[a-z]/.test(c));
    cover.className = `dialog-cover ${button.classList.contains('book-cover--image') ? 'dialog-cover--image' : colorClass}`;
    cover.innerHTML = button.innerHTML;
    dialog.showModal();
  }));
  document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
