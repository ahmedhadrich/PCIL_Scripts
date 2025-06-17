/* hospitalListEmbed.js  — robust tab switcher (v2)
   ------------------------------------------------
   ▸ Assumes ONE table per region, always in the order listed
     in `regionOrder` (adjust if you ever change the HTML order).
*/
(function () {
  const containerId = 'hospital-list-container';
  const src = new URL('hospital-list.html', document.currentScript.src).href;

  /* ---------- tiny helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const el = (tag, cls) => Object.assign(document.createElement(tag), cls && { className: cls });

  /* ---------- mount / fetch ---------- */
  const container = $( `#${containerId}` ) || (() => {
    const c = el('div'); c.id = containerId;
    document.currentScript.before(c); return c;
  })();

  fetch(src).then(r => r.text()).then(html => {
    container.innerHTML = html;

    /* ---------- collect tables & map to regions ---------- */
    const tables = $$('table', container);
    if (!tables.length) throw 'No <table> elements found in hospital-list.html';

    const regionOrder = [
      'Bangkok', 'Suburban', 'Central', 'Eastern',
      'Northern', 'Western', 'North Eastern', 'Southern'
    ];

    /* If you ever shuffle the HTML, just reorder this array! */
    const regionTables = {};
    regionOrder.forEach((region, i) => {
      regionTables[region] = tables[i] || null;
    });

    /* Remove ALL original tables from the flow; we’ll re-attach them. */
    tables.forEach(t => t.remove());

    /* ---------- quick CSS ---------- */
    const css = `
      .hospital-tabs{display:flex;flex-wrap:wrap;border-bottom:1px solid #d9d9d9;margin-bottom:8px}
      .hospital-tab{border:none;background:none;padding:10px 16px;margin:0 4px -1px 0;
                    cursor:pointer;font:600 14px/1.2 system-ui;border-bottom:2px solid transparent}
      .hospital-tab.active{border-color:#0850a3;color:#0850a3}
      .hospital-table{width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px}
      .hospital-table th{background:#0850a3;color:#fff;padding:8px;border:1px solid #e5e5e5}
      .hospital-table td{padding:8px;border:1px solid #e5e5e5}
      @media(max-width:768px){.hospital-tab{flex:1 1 45%;margin-bottom:4px}}
    `;
    document.head.append(el('style', null)).textContent = css;

    /* ---------- build UI ---------- */
    const tabsBar = el('div','hospital-tabs');
    const tablesWrap = el('div');

    regionOrder.forEach((region, idx) => {
      const tbl = regionTables[region];
      if (!tbl) return;                    // skip empty slots (never happens)

      tbl.classList.add('hospital-table');
      tbl.style.display = idx ? 'none' : 'block';

      /* --- Tab button --- */
      const btn = el('button','hospital-tab');
      btn.textContent = region;
      if (!idx) btn.classList.add('active');

      btn.onclick = () => {
        $$('.hospital-tab', tabsBar).forEach(b => b.classList.remove('active'));
        $$('.hospital-table', tablesWrap).forEach(t => t.style.display = 'none');
        btn.classList.add('active');
        tbl.style.display = 'block';
      };

      tabsBar.append(btn);
      tablesWrap.append(tbl);
    });

    /* ---------- mount ---------- */
    container.replaceChildren(tabsBar, tablesWrap);
  })
  .catch(err => {
    console.error('hospitalListEmbed error:', err);
    container.innerHTML = '<p style="color:red">Unable to load hospital list. Please try again later.</p>';
  });
})();
