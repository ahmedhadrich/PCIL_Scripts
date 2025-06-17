/* hospitalListEmbed.js — robust tab builder v3
   -------------------------------------------------
   ▸ Works with the full “code-hospital-network.txt” markup from WordPress
   ▸ No dependence on background colours or fixed ordering
   ▸ Region detected by the “(EnglishName)” pattern inside the first colspan row
*/
(function () {
  const containerId = 'hospital-list-container';
  const src = new URL('hospital-list.html', document.currentScript.src).href;

  /* ---------- helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const el = (tag, cls) => Object.assign(document.createElement(tag), cls && { className: cls });

  /* ---------- mount / fetch ---------- */
  const container = $(`#${containerId}`) || (() => {
    const c = el('div'); c.id = containerId; document.currentScript.before(c); return c;
  })();

  fetch(src).then(r => r.text()).then(html => {
    container.innerHTML = html;

    /* ---------- collect tables ---------- */
    const tables = $$('table', container);
    if (!tables.length) throw 'hospital-list.html contains no <table> elements';

    const regions = {};          // { RegionName : original <table> }
    tables.forEach(tbl => {
      const rows = [...tbl.rows];
      const regionRow = rows.find(tr => {
        const c = tr.cells[0];
        return c && c.colSpan >= 4 && /\(.+\)/.test(c.textContent);
      });
      if (!regionRow) return;    // skip malformed tables

      // English title in brackets  →  “ภาคกลาง (Central)” → “Central”
      const match = regionRow.cells[0].textContent.match(/\(([^)]+)\)/);
      const regionName = match ? match[1].trim() : 'Other';
      regions[regionName] = tbl;
    });

    if (!Object.keys(regions).length) throw 'No region headers detected';

    /* ---------- strip VC short-code leftovers (optional) ---------- */
    $$('p', container).forEach(p => {
      if (!p.textContent.trim()) p.remove();
    });

    /* ---------- basic CSS ---------- */
    const css = `
      .hospital-tabs{display:flex;flex-wrap:wrap;border-bottom:1px solid #d9d9d9;margin-bottom:8px}
      .hospital-tab{border:none;background:none;padding:10px 16px;margin:0 4px -1px 0;cursor:pointer;
                    font:600 14px/1 system-ui;border-bottom:2px solid transparent}
      .hospital-tab.active{border-color:#0850a3;color:#0850a3}
      .hospital-table{width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px}
      .hospital-table th{background:#0850a3;color:#fff;padding:8px;border:1px solid #e5e5e5}
      .hospital-table td{padding:8px;border:1px solid #e5e5e5}
      @media(max-width:768px){.hospital-tab{flex:1 1 45%;margin-bottom:4px}}
    `;
    document.head.append(el('style')).textContent = css;

    /* ---------- build UI ---------- */
    const tabsBar   = el('div','hospital-tabs');
    const tablesBox = el('div');

    let first = true;
    Object.entries(regions).forEach(([region, tbl]) => {
      tbl.classList.add('hospital-table');

      /* keep only header + hospital rows (drop region/province headers) */
      const body = tbl.tBodies[0] || tbl;
      [...body.rows].forEach(r => {
        const c = r.cells[0];
        if (c.colSpan >= 4) r.remove();      // province / region header
      });

      tbl.style.display = first ? 'block' : 'none';

      /* tab button */
      const btn = el('button','hospital-tab'); btn.textContent = region;
      if (first) btn.classList.add('active');
      btn.onclick = () => {
        $$('.hospital-tab', tabsBar).forEach(b => b.classList.remove('active'));
        $$('.hospital-table', tablesBox).forEach(t => t.style.display = 'none');
        btn.classList.add('active'); tbl.style.display = 'block';
      };

      tabsBar.append(btn);  tablesBox.append(tbl);  first = false;
    });

    container.replaceChildren(tabsBar, tablesBox);
  })
  .catch(err => {
    console.error('hospitalListEmbed:', err);
    container.innerHTML = '<p style="color:red">Unable to load hospital list. Please try again later.</p>';
  });
})();
