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
      let currentMainRegion = 'All';
      let currentSubRegion = null;

      // Define the main region order to match Pacific Cross website
      const regionOrder = ['Bangkok', 'Suburban', 'Central', 'Eastern', 'Northern', 'Western', 'North Eastern', 'Southern'];

      rows.forEach(row => {
        const cells = [...row.cells];
        // A region-header row: has colspan attribute
        if (cells[0] && cells[0].hasAttribute('colspan')) {
          const txt = cells[0].textContent.trim();
          const cell = cells[0];
          
          // Check if this is a main region (has parentheses)
          const isMainRegion = txt.includes('(') && txt.includes(')');
          
          if (isMainRegion) {
            // Main region header: "กรุงเทพมหานคร (BANGKOK)" -> "Bangkok"
            const parenthesesMatch = txt.match(/\(([^)]+)\)/);
            if (parenthesesMatch) {
              let regionName = parenthesesMatch[1].trim();
              // Normalize region names to match website
              if (regionName === 'BANGKOK') regionName = 'Bangkok';
              else if (regionName === 'Suburban') regionName = 'Suburban';
              else if (regionName === 'Central') regionName = 'Central';
              else if (regionName === 'Eastern') regionName = 'Eastern';
              else if (regionName === 'Northern') regionName = 'Northern';
              else if (regionName === 'Western') regionName = 'Western';
              else if (regionName === 'North Eastern') regionName = 'North Eastern';
              else if (regionName === 'Southern') regionName = 'Southern';
              
              currentMainRegion = regionName;
              currentSubRegion = null;
              if (!regions[currentMainRegion]) regions[currentMainRegion] = [];
            }
          } else {
            // Sub-region header: "นครปฐม/Nakornptrathom" -> add to current main region
            currentSubRegion = txt;
            // Don't change the main region, sub-regions belong to the current main region
          }
          return; // don’t keep the header row itself inside the region tab
        }
        // Regular hospital row - add to current main region
        if (!regions[currentMainRegion]) regions[currentMainRegion] = [];
        regions[currentMainRegion].push(row.cloneNode(true));
      });


      /* ---------- build tabs ---------- */
      const style = makeEl('style');
      style.textContent = `
        .hospital-tabs      {display:flex;flex-wrap:wrap;gap:0;margin-bottom:1rem;border-bottom:1px solid #ddd}
        .hospital-tab       {border:none;background:#f8f9fa;cursor:pointer;padding:12px 20px;
                             font:inherit;border:1px solid #ddd;border-bottom:none;
                             margin-right:2px;color:#495057;font-weight:500}
        .hospital-tab:hover {background:#e9ecef;color:#212529}
        .hospital-tab.active{background:#fff;color:#0056b3;font-weight:600;border-bottom:1px solid #fff;
                             margin-bottom:-1px;position:relative}
        .hospital-table     {width:100%;border-collapse:collapse;margin-bottom:1.5rem;
                             font-size:14px;table-layout:fixed}
        .hospital-table thead th {background:#f8f9fa;font-weight:600;color:#495057;
                                  border:1px solid #ddd;padding:12px 10px;text-align:left}
        .hospital-table tbody td {border:1px solid #ddd;padding:10px;vertical-align:top}
        .hospital-table tbody tr:nth-child(even) {background:#f8f9fa}
        .hospital-table tbody tr:hover {background:#e9ecef}
        .hospital-table a {color:#0056b3;text-decoration:none}
        .hospital-table a:hover {text-decoration:underline}
        
        @media only screen and (max-width: 768px) {
          .hospital-tabs {flex-direction:column;gap:0}
          .hospital-tab {margin-right:0;margin-bottom:2px;padding:10px 15px}
          .hospital-table {font-size:12px}
          .hospital-table th, .hospital-table td {padding:8px 5px}
        }
      `;
      document.head.appendChild(style);

      const tabsBar = makeEl('div', 'hospital-tabs');
      const tablesWrap = makeEl('div');

      // Ensure tabs are created in the correct order
      const orderedRegions = regionOrder.filter(region => regions[region] && regions[region].length > 0);
      
      let first = true;
      orderedRegions.forEach(region => {
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
