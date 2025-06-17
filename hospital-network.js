// hospital-network.js - Main component for hospital network display
class HospitalNetwork {
  constructor(containerId, dataUrl) {
    this.container = document.getElementById(containerId);
    this.dataUrl = dataUrl;
    this.data = null;
    this.currentTab = 'bangkok';
    this.searchTerm = '';
    
    this.init();
  }

  async init() {
    try {
      // Load hospital data
      await this.loadData();
      // Render the component
      this.render();
      // Add event listeners
      this.attachEventListeners();
    } catch (error) {
      console.error('Failed to initialize Hospital Network:', error);
      this.renderError();
    }
  }

  async loadData() {
    try {
      const response = await fetch(this.dataUrl);
      if (!response.ok) throw new Error('Failed to load data');
      
      // If the response is JavaScript, evaluate it
      const text = await response.text();
      // Create a temporary script element to evaluate the data
      const script = document.createElement('script');
      script.textContent = text + '\nwindow.tempHospitalData = hospitalData;';
      document.head.appendChild(script);
      this.data = window.tempHospitalData;
      document.head.removeChild(script);
      delete window.tempHospitalData;
    } catch (error) {
      console.error('Error loading hospital data:', error);
      throw error;
    }
  }

  render() {
    if (!this.container || !this.data) return;

    this.container.innerHTML = `
      <div class="hospital-network">
        <style>
          .hospital-network {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }

          .hospital-header {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
          }

          .hospital-header h1 {
            color: #0850a3;
            font-size: 24px;
            margin: 0 0 10px 0;
          }

          .hospital-header p {
            color: #666;
            margin: 0;
            font-size: 14px;
          }

          .search-container {
            padding: 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
          }

          .search-input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.3s ease;
          }

          .search-input:focus {
            outline: none;
            border-color: #0850a3;
          }

          .tabs-nav {
            display: flex;
            background: #f8f9fa;
            border-bottom: 2px solid #e9ecef;
            overflow-x: auto;
          }

          .tab-button {
            background: none;
            border: none;
            padding: 15px 20px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            color: #666;
            white-space: nowrap;
            transition: all 0.3s ease;
            border-bottom: 3px solid transparent;
            min-width: 120px;
          }

          .tab-button:hover {
            background: #e9ecef;
            color: #0850a3;
          }

          .tab-button.active {
            background: white;
            color: #0850a3;
            border-bottom-color: #0850a3;
          }

          .tab-content {
            padding: 20px;
            min-height: 400px;
          }

          .province-section {
            margin-bottom: 30px;
          }

          .province-header {
            background: #8391c8;
            color: white;
            padding: 12px 20px;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 0;
            border-radius: 4px 4px 0 0;
          }

          .hospital-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .hospital-table th {
            background: #0850a3;
            color: white;
            padding: 12px 8px;
            text-align: center;
            font-weight: bold;
            font-size: 13px;
          }

          .hospital-table td {
            padding: 10px 8px;
            border: 1px solid #ddd;
            text-align: left;
            vertical-align: middle;
          }

          .hospital-table tr:nth-child(even) {
            background: #c7cbe6;
          }

          .hospital-table tr:nth-child(odd) {
            background: white;
          }

          .hospital-name {
            font-weight: 500;
            color: #333;
          }

          .service-type {
            font-size: 12px;
            color: #666;
            text-align: center;
          }

          .province-name {
            text-align: center;
            font-size: 12px;
          }

          .phone-number {
            text-align: center;
            font-size: 12px;
            color: #555;
          }

          .map-link {
            text-align: center;
          }

          .map-link a {
            color: #0850a3;
            text-decoration: none;
            font-size: 18px;
            padding: 4px;
            border-radius: 4px;
            transition: background-color 0.3s ease;
          }

          .map-link a:hover {
            background-color: #f0f0f0;
          }

          .no-results {
            text-align: center;
            padding: 40px;
            color: #666;
            font-style: italic;
          }

          .loading {
            text-align: center;
            padding: 40px;
            color: #666;
          }

          .error {
            text-align: center;
            padding: 40px;
            color: #dc3545;
          }

          @media (max-width: 768px) {
            .hospital-network {
              margin: 0;
              border-radius: 0;
            }

            .tabs-nav {
              flex-wrap: wrap;
            }

            .tab-button {
              padding: 12px 16px;
              font-size: 13px;
              min-width: auto;
              flex: 1;
            }

            .hospital-table {
              font-size: 12px;
            }

            .hospital-table th,
            .hospital-table td {
              padding: 8px 4px;
            }

            .hospital-header h1 {
              font-size: 20px;
            }
          }
        </style>

        <div class="hospital-header">
          <h1>รายชื่อเครือข่ายข้อมูลโรงพยาบาลและคลินิก ณ เดือนพฤษภาคม 2025</h1>
          <p>Please select tabs below for list of each locations.</p>
        </div>

        <div class="search-container">
          <input type="text" class="search-input" placeholder="Search hospitals by name, province, or phone number..." id="hospitalSearch">
        </div>

        <div class="tabs-nav">
          ${this.renderTabButtons()}
        </div>

        <div class="tab-content" id="tabContent">
          ${this.renderTabContent()}
        </div>
      </div>
    `;
  }

  renderTabButtons() {
    const tabs = [
      { id: 'bangkok', label: 'Bangkok' },
      { id: 'suburban', label: 'Suburban' },
      { id: 'central', label: 'Central' },
      { id: 'eastern', label: 'Eastern' },
      { id: 'northern', label: 'Northern' },
      { id: 'western', label: 'Western' },
      { id: 'northeastern', label: 'North Eastern' },
      { id: 'southern', label: 'Southern' }
    ];

    return tabs.map(tab => `
      <button class="tab-button ${tab.id === this.currentTab ? 'active' : ''}" 
              data-tab="${tab.id}">
        ${tab.label}
      </button>
    `).join('');
  }

  renderTabContent() {
    const tabData = this.data[this.currentTab];
    if (!tabData) return '<div class="error">No data available for this tab.</div>';

    const filteredProvinces = this.filterProvinces(tabData.provinces);
    
    if (filteredProvinces.length === 0) {
      return '<div class="no-results">No hospitals found matching your search.</div>';
    }

    return filteredProvinces.map(province => `
      <div class="province-section">
        <div class="province-header">${province.name}</div>
        <table class="hospital-table">
          <thead>
            <tr>
              <th>สถานพยาบาล/Hospital Name</th>
              <th>Cashless service</th>
              <th>จังหวัด/Province</th>
              <th>เบอร์โทรศัพท์ / Tel.no</th>
              <th>Map</th>
            </tr>
          </thead>
          <tbody>
            ${province.hospitals.map((hospital, index) => `
              <tr>
                <td class="hospital-name">${hospital.name}</td>
                <td class="service-type">${hospital.service}</td>
                <td class="province-name">${hospital.province}</td>
                <td class="phone-number">${hospital.phone}</td>
                <td class="map-link">
                  <a href="${hospital.mapUrl}" target="_blank" title="View on map">📍</a>
                </td>
              </tr>
            `).join('')}
