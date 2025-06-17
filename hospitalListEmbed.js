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

      /* ---------- find all tables ---------- */
      const tables = container.querySelectorAll('table');
      if (!tables.length) {
        console.error('No tables found');
        return;
      }

      console.log('Found', tables.length, 'tables');

      // Process each table separately since they're already grouped by region
      const regions = {};
      let headerRow = null;

      tables.forEach((table, tableIndex) => {
        const rows = [...table.rows];
        console.log(`Processing table ${tableIndex + 1} with ${rows.length} rows`);
        
        let currentRegion = null;
        
        rows.forEach((row, rowIndex) => {
          const cells = [...row.cells];
          if (!cells.length) return;
          
          const firstCell = cells[0];
          if (!firstCell) return;

          // Capture header row from first table
          if (!headerRow && (rowIndex === 0 || 
              (firstCell.style.backgroundColor === '#0850a3') ||
              firstCell.textContent.includes('สถานพยาบาล'))) {
            headerRow = row.cloneNode(true);
            console.log('Header row captured');
            return;
          }

          // Check for main region header
          if (firstCell.hasAttribute('colspan') && firstCell.colSpan >= 4) {
            const txt = firstCell.textContent.trim();
            console.log('Checking potential region header:', txt);
            
            // Look for region headers with specific patterns
            if (txt.includes('กรุงเทพมหานคร') && txt.includes('BANGKOK')) {
              currentRegion = 'Bangkok';
            } else if (txt.includes('ปริมณฑล') && txt.includes('Suburban')) {
              currentRegion = 'Suburban';
            } else if (txt.includes('ภาคกลาง') && txt.includes('Central')) {
              currentRegion = 'Central';
            } else if (txt.includes('ภาคตะวันออก') && txt.includes('Eastern')) {
              currentRegion = 'Eastern';
            } else if (txt.includes('ภาคเหนือ') && txt.includes('Northern')) {
              currentRegion = 'Northern';
            } else if (txt.includes('ภาคตะวันตก') && txt.includes('Western')) {
              currentRegion = 'Western';
            } else if (txt.includes('ภาคตะวันออกเฉียงเหนือ') && txt.includes('North Eastern')) {
              currentRegion = 'North Eastern';
            } else if (txt.includes('ภาคใต้') && txt.includes('Southern')) {
              currentRegion = 'Southern';
            }
            
            if (currentRegion) {
              console.log('Found region:', currentRegion);
              if (!regions[currentRegion]) {
                regions[currentRegion] = [];
              }
            }
            return; // Skip header rows
          }

          // Skip sub-region headers (province headers)
          if (firstCell.hasAttribute('colspan') && firstCell.colSpan >= 4 && 
              (firstCell.style.backgroundColor === '#8391c8' || 
               firstCell.style.fontWeight === 'bold')) {
            console.log('Skipping sub-region header:', firstCell.textContent.trim());
            return;
          }

          // Regular hospital row
          if (currentRegion && firstCell.textContent.trim() && 
              !firstCell.hasAttribute('colspan')) {
            if (!regions[currentRegion]) {
              regions[currentRegion] = [];
            }
            regions[currentRegion].push(row.cloneNode(true));
          }
        });
      });

      // Debug: Log regions found
      console.log('Final regions found:', Object.keys(regions));
      Object.entries(regions).forEach(([region, hospitals]) => {
        console.log(`${region}: ${hospitals.length} hospitals`);
      });

      if (Object.keys(regions).length === 0) {
        console.error('No regions were detected. Check the HTML structure.');
        container.innerHTML = '<p style="color:red">Error: Could not parse hospital regions. Please check the data format.</p>';
        return;
      }

      /* ---------- build tabs ---------- */
      const style = makeEl('style');
      style.textContent = `
        .hospital-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          margin-bottom: 1rem;
          border-bottom: 1px solid #ddd;
          background: #fff;
        }
        .hospital-tab {
          border: none;
          background: #f8f9fa;
          cursor: pointer;
          padding: 12px 20px;
          font-family: inherit;
          font-size: 14px;
          border: 1px solid #ddd;
          border-bottom: none;
          margin-right: 2px;
          color: #495057;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .hospital-tab:hover {
          background: #e9ecef;
          color: #212529;
        }
        .hospital-tab.active {
          background: #fff;
          color: #0056b3;
          font-weight: 600;
          border-bottom: 1px solid #fff;
          margin-bottom: -1px;
          position: relative;
          z-index: 1;
        }
        .hospital-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
          font-size: 14px;
          background: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .hospital-table thead th {
          background: #0850a3;
          color: #fff;
          font-weight: 600;
          border: 1px solid #ddd;
          padding: 12px 10px;
          text-align: center;
        }
        .hospital-table tbody td {
          border: 1px solid #ddd;
          padding: 10px;
          vertical-align: top;
        }
        .hospital-table tbody tr:nth-child(even) {
          background: #f8f9fa;
        }
        .hospital-table tbody tr:hover {
          background: #e9ecef;
        }
        .hospital-table a {
          color: #0056b3;
          text-decoration: none;
        }
        .hospital-table a:hover {
          text-decoration: underline;
        }
        
        @media only screen and (max-width: 768px) {
          .hospital-tabs {
            flex-direction: column;
            gap: 0;
          }
          .hospital-tab {
            margin-right: 0;
            margin-bottom: 2px;
            padding: 10px 15px;
            font-size: 13px;
          }
          .hospital-table {
            font-size: 12px;
          }
          .hospital-table th, .hospital-table td {
            padding: 8px 5px;
          }
        }
      `;
      document.head.appendChild(style);

      const tabsBar = makeEl('div', 'hospital-tabs');
      const tablesWrap = makeEl('div');

      // Define the order of regions
      const regionOrder = ['Bangkok', 'Suburban', 'Central', 'Eastern', 'Northern', 'Western', 'North Eastern', 'Southern'];
      
      // Get regions that actually have data, in the correct order
      const orderedRegions = regionOrder.filter(region => 
        regions[region] && regions[region].length > 0
      );

      console.log('Creating tabs for regions:', orderedRegions);

      if (orderedRegions.length === 0) {
        console.error('No valid regions with data found');
        container.innerHTML = '<p style="color:red">No hospital data found. Please check the source file.</p>';
        return;
      }

      let first = true;
      orderedRegions.forEach(region => {
        /* --- tab button --- */
        const btn = makeEl('button', 'hospital-tab');
        btn.textContent = region;
        btn.type = 'button'; // Explicitly set button type
        if (first) btn.classList.add('active');
        tabsBar.appendChild(btn);

        /* --- region-specific table --- */
        const newTable = makeEl('table', 'hospital-table');
        
        // Add header row
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
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Tab clicked:', region);
          
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
          
          console.log('Switched to region:', region, 'with', regions[region].length, 'hospitals');
        });

        first = false;
      });

      /* ---------- mount into the container ---------- */
      container.innerHTML = ''; // clear original markup
      container.appendChild(tabsBar);
      container.appendChild(tablesWrap);

      console.log('Hospital tabs initialized successfully');
      console.log('Tabs created:', tabsBar.children.length);
      console.log('Tables created:', tablesWrap.children.length);
    })
    .catch(err => {
      console.error('Unable to load hospital list:', err);
      container.innerHTML = '<p style="color:red">Unable to load hospital list. Please try again later.</p>';
    });
})();
