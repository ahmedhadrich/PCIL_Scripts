(function () {
  const containerId = 'hospital-list-container';
  const src = new URL('hospital-list.html', document.currentScript.src).href;

  /* ---------- helpers ---------- */
  const makeEl = (tag, cls) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    return el;
  };

  /* ---------- mount / fetch ---------- */
  const container =
    document.getElementById(containerId) ||
    (() => {
      const el = makeEl('div');
      el.id = containerId;
      document.currentScript.parentNode.insertBefore(el, document.currentScript);
      return el;
    })();

  fetch(src)
    .then(r => r.text())
    .then(html => {
      container.innerHTML = html;

      /* ---------- find the original table ---------- */
      const table = container.querySelector('table');
      if (!table) return;

      /* ---------- split rows into regions ---------- */
      const rows = [...table.rows];
      const regions = {};           // { regionName: [<tr>, <tr>, …] }
      let current = 'All';

      rows.forEach(row => {
        const cells = [...row.cells];
        // A region-header row: single cell OR <td colspan=all>
        if (
          cells.length === 1 ||
          (cells[0].hasAttribute('colspan') && cells.length === 1)
        ) {
          const txt = cells[0].textContent.trim();
          
          // Try to extract English from parentheses first: "กรุงเทพมหานคร (BANGKOK)" -> "BANGKOK"
          const parenthesesMatch = txt.match(/\(([^)]+)\)/);
          if (parenthesesMatch) {
            current = parenthesesMatch[1].trim();
          } else {
            // Try to extract English after slash: "นครปฐม/Nakornptrathom" -> "Nakornptrathom"
            const slashMatch = txt.match(/\/(.+)$/);
            current = slashMatch ? slashMatch[1].trim() : txt.trim();
          }
          if (!regions[current]) regions[current] = [];
          return; // don’t keep the header row itself inside the region tab
        }
        if (!regions[current]) regions[current] = [];
        regions[current].push(row.cloneNode(true));
      });

      /* ---------- build tabs ---------- */
      const style = makeEl('style');
      style.textContent = `
        .hospital-tabs      {display:flex;flex-wrap:wrap;gap:.75rem;margin-bottom:.5rem}
        .hospital-tab       {border:none;background:none;cursor:pointer;padding:.5rem 1rem;
                             border-bottom:2px solid transparent;font:inherit}
        .hospital-tab.active{border-color:#0077cc;font-weight:600}
        .hospital-table     {width:100%;border-collapse:collapse;margin-bottom:1.5rem}
        .hospital-table th,
        .hospital-table td  {border:1px solid #ddd;padding:.5rem}
      `;
      document.head.appendChild(style);

      const tabsBar = makeEl('div', 'hospital-tabs');
      const tablesWrap = makeEl('div');

      let first = true;
      Object.keys(regions).forEach(region => {
        /* --- tab button --- */
        const btn = makeEl('button', 'hospital-tab');
        btn.textContent = region;
        if (first) btn.classList.add('active');
        tabsBar.appendChild(btn);

        /* --- region-specific table --- */
        const newTable = table.cloneNode(true);
        newTable.classList.add('hospital-table');

        // keep only the header row, then inject region rows
        const body = newTable.tBodies[0] || newTable; // fall back if no <tbody>
        [...body.rows].forEach((r, i) => i && r.remove());
        regions[region].forEach(r => body.appendChild(r));

        if (first) {
          newTable.style.display = '';
        } else {
          newTable.style.display = 'none';
        }
        tablesWrap.appendChild(newTable);

        /* --- tab click handler --- */
        btn.addEventListener('click', () => {
          tabsBar.querySelectorAll('.hospital-tab').forEach(b => b.classList.remove('active'));
          tablesWrap.querySelectorAll('.hospital-table').forEach(t => (t.style.display = 'none'));
          btn.classList.add('active');
          newTable.style.display = '';
        });

        first = false;
      });

      /* ---------- mount into the container ---------- */
      container.innerHTML = ''; // clear original markup
      container.appendChild(tabsBar);
      container.appendChild(tablesWrap);
    })
    .catch(err => {
      console.error('Unable to load hospital list:', err);
      container.innerHTML =
        '<p style="color:red">Unable to load hospital list. Please try again later.</p>';
    });
})();
