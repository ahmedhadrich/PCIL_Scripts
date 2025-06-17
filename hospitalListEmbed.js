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
      let currentMainRegion = null;
      let headerRow = null;

      // Define the main region order to match Pacific Cross website
      const regionOrder = ['Bangkok', 'Suburban', 'Central', 'Eastern', 'Northern', 'Western', 'North Eastern', 'Southern'];

      rows.forEach((row, index) => {
        const cells = [...row.cells];
        
        // Skip empty rows
        if (!cells.length) return;
        
        const firstCell = cells[0];
        if (!firstCell) return;

        // Check if this is a header row (first row with column headers)
        if (index === 0 || firstCell.style.backgroundColor === '#0850a3' || 
            (firstCell.textContent.includes('สถานพยาบาล') && firstCell.textContent.includes('Hospital Name'))) {
          headerRow = row.cloneNode(true);
          return;
        }

        // Check if this is a main region header row
        if (firstCell.hasAttribute('colspan') && firstCell.colSpan >= 4) {
          const txt = firstCell.textContent.trim();
          
          // Main region headers have specific background colors and patterns
          if (firstCell.style.backgroundColor === '#4267b1' || txt.includes('(') && txt.includes(')')) {
            // Extract English region name from parentheses
            const parenthesesMatch = txt.match(/\(([^)]+)\)/);
            if (parenthesesMatch) {
              let regionName = parenthesesMatch[1].trim();
              
              // Normalize region names
              const regionMap = {
                'BANGKOK': 'Bangkok',
                'Suburban': 'Suburban',
                'Central': 'Central', 
                'Eastern': 'Eastern',
                'Northern': 'Northern',
                'Western': 'Western',
                'North Eastern': 'North Eastern',
                'NORTH EASTERN': 'North Eastern',
                'NORTHEASTERN': 'North Eastern',
                'Southern': 'Southern'
              };
              
              regionName = regionMap[regionName] || regionName;
              currentMainRegion = regionName;
              
              // Initialize region array if it doesn't exist
              if (!regions[currentMainRegion]) {
                regions[currentMainRegion] = [];
              }
              
              console.log('Found main region:', currentMainRegion, 'from text:', txt);
            }
          }
          return; // Don't include header rows in the region data
        }

        // Check if this is a sub-region header (province header)
        if (firstCell.hasAttribute('colspan') && firstCell.colSpan >= 4 && 
            firstCell.style.backgroundColor === '#8391c8') {
          // This is a province/sub-region header, skip it
          console.log('Skipping sub-region header:', firstCell.textContent.trim());
          return;
        }

        // Regular hospital row - add to current main region
        if (currentMainRegion && firstCell.textContent.trim()) {
          if (!regions[currentMainRegion]) {
            regions[currentMainRegion] = [];
          }
          regions[currentMainRegion].push(row.cloneNode(true));
        }
      });

      // Debug: Log regions found
      console.log('Regions found:', Object.keys(regions));
      console.log('Region counts:', Object.fromEntries(
        Object.entries(regions).map(([key, val]) => [key, val.length])
      ));

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

      // Get regions that actually have data, in the correct order
      const orderedRegions = regionOrder.filter(region => 
        regions[region] && regions[region].length > 0
      );
      
      // If no regions found in the preferred order, use all available regions
      if (orderedRegions.length === 0) {
        orderedRegions.push(...Object.keys(regions).filter(region => 
          regions[region] && regions[region].length > 0
        ));
      }

      console.log('Ordered regions to display:', orderedRegions);

      let first = true;
      orderedRegions.forEach(region => {
        /* --- tab button --- */
        const btn = makeEl('button', 'hospital-tab');
        btn.textContent = region;
        if (first) btn.classList.add('active');
        tabsBar.appendChild(btn);

        /* --- region-specific table --- */
        const newTable = makeEl('table', 'hospital-table');
        
        // Add header row if we have one
        if (headerRow) {
          const thead = makeEl('thead');
          thead.appendChild(headerRow.cloneNode(true));
          newTable.appendChild(thead);
        }

        // Add table body with region's hospitals
        const tbody = makeEl('tbody');
        regions[region].forEach(row => {
          tbody.appendChild(row.cloneNode(true));
        });
        newTable.appendChild(tbody);

        // Show/hide table based on if it's the first tab
        newTable.style.display = first ? 'block' : 'none';
        tablesWrap.appendChild(newTable);

        /* --- tab click handler --- */
        btn.addEventListener('click', () => {
          // Remove active class from all tabs
          tabsBar.querySelectorAll('.hospital-tab').forEach(b => 
            b.classList.remove('active')
          );
          // Hide all tables
          tablesWrap.querySelectorAll('.hospital-table').forEach(t => 
            t.style.display = 'none'
          );
          // Activate clicked tab and show its table
          btn.classList.add('active');
          newTable.style.display = 'block';
        });

        first = false;
      });

      /* ---------- mount into the container ---------- */
      container.innerHTML = ''; // clear original markup
      container.appendChild(tabsBar);
      container.appendChild(tablesWrap);

      // Log final state for debugging
      console.log('Tabs created:', tabsBar.children.length);
      console.log('Tables created:', tablesWrap.children.length);
    })
    .catch(err => {
      console.error('Unable to load hospital list:', err);
      container.innerHTML =
        '<p style="color:red">Unable to load hospital list. Please try again later.</p>';
    });
})();
