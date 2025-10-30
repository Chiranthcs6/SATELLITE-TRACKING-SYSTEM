// Satellite Details Page JavaScript
// Displays detailed information about a selected satellite and pass predictions

// Protect this page - redirect to login if not authenticated
protectPage();

// Sample satellite data (same as in explore page)
// TODO: Fetch satellite data from API
const sampleSatellites = [
    {
        id: 1,
        name: 'ISS',
        noradId: '25544',
        type: 'Space Station',
        status: 'active',
        altitude: '408 km',
        country: 'International',
        launchDate: '1998-11-20',
        period: '92.68 min',
        inclination: '51.64°'
    },
    {
        id: 2,
        name: 'Meteor M 2-3',
        noradId: '20580',
        type: 'Telescope',
        status: 'active',
        altitude: '540 km',
        country: 'USA',
        launchDate: '1990-04-24',
        period: '95.47 min',
        inclination: '28.47°'
    },
    {
        id: 3,
        name: 'Meteor M 2-4',
        noradId: '25994',
        type: 'Earth Observation',
        status: 'active',
        altitude: '705 km',
        country: 'USA',
        launchDate: '1999-12-18',
        period: '98.88 min',
        inclination: '98.21°'
    },
    {
        id: 4,
        name: 'Metop B',
        noradId: '41866',
        type: 'Weather',
        status: 'active',
        altitude: '35786 km',
        country: 'USA',
        launchDate: '2016-11-19',
        period: '1436.10 min',
        inclination: '0.04°'
    },
        {
        id: 5,
        name: 'Metop C',
        noradId: '41866',
        type: 'Weather',
        status: 'active',
        altitude: '35786 km',
        country: 'USA',
        launchDate: '2016-11-19',
        period: '1436.10 min',
        inclination: '0.04°'
    }
];

// Sample future passes data
// TODO: Fetch future passes from API
const sampleFuturePasses = [
    {
        id: 1,
        aos: '14:32:15 UTC',
        tca: '14:36:40 UTC',
        los: '14:41:22 UTC',
        maxElevation: '78°',
        direction: 'SW-NE'
    },
    {
        id: 2,
        aos: '16:08:43 UTC',
        tca: '16:12:55 UTC',
        los: '16:17:12 UTC',
        maxElevation: '45°',
        direction: 'W-E'
    }
];

// Sample past passes data
// TODO: Fetch past passes from API
const samplePastPasses = [
    {
        id: 1,
        aos: '12:16:30 UTC',
        tca: '12:20:08 UTC',
        los: '12:24:45 UTC',
        maxElevation: '82°',
        direction: 'S-N'
    },
    {
        id: 2,
        aos: '10:42:12 UTC',
        tca: '10:46:22 UTC',
        los: '10:50:33 UTC',
        maxElevation: '56°',
        direction: 'W-E'
    }
];

// Get selected satellite ID from session storage
const selectedSatelliteId = parseInt(sessionStorage.getItem('selectedSatelliteId'));

// Find the selected satellite
const satellite = sampleSatellites.find(sat => sat.id === selectedSatelliteId);

// Display satellite details
function displaySatelliteDetails() {
    if (!satellite) {
        // If no satellite found, redirect back to explore page
        window.location.href = '/pages/explorePage/explorePage.html';
        return;
    }
    
    // Update header information
    document.getElementById('satelliteName').textContent = satellite.name;
    
    // Update status badge
    const statusBadge = document.getElementById('statusBadge');
    statusBadge.textContent = satellite.status.charAt(0).toUpperCase() + satellite.status.slice(1);
    statusBadge.className = `status-badge status-${satellite.status}`;
    
    // Populate metadata line
    const satelliteMeta = document.getElementById('satelliteMeta');
    satelliteMeta.innerHTML = `
        <span data-testid="text-type">${satellite.type}</span>
        <span data-testid="text-altitude">${satellite.altitude}</span>
        <span data-testid="text-country">${satellite.country}</span>
    `;
}

// Render future passes
function renderFuturePasses() {
    const futurePassesContainer = document.getElementById('futurePasses');
    
    // TODO: Fetch future passes from API
    // For now, using sample data
    
    if (sampleFuturePasses.length === 0) {
        futurePassesContainer.innerHTML = '<p class="muted-text">No upcoming passes available.</p>';
        return;
    }
    
    futurePassesContainer.innerHTML = '';
    
    sampleFuturePasses.forEach(pass => {
        const passCard = createPassCard(pass, 'future');
        futurePassesContainer.appendChild(passCard);
    });
}

// Render past passes
function renderPastPasses() {
    const pastPassesContainer = document.getElementById('pastPasses');
    
    // TODO: Fetch past passes from API
    // For now, using sample data
    
    if (samplePastPasses.length === 0) {
        pastPassesContainer.innerHTML = '<p class="muted-text">No past passes available.</p>';
        return;
    }
    
    pastPassesContainer.innerHTML = '';
    
    samplePastPasses.forEach(pass => {
        const passCard = createPassCard(pass, 'past');
        pastPassesContainer.appendChild(passCard);
    });
}

// Create a pass card element
function createPassCard(pass, type) {
    const card = document.createElement('div');
    card.className = 'new-pass-card';
    card.dataset.testid = `card-${type}-pass-${pass.id}`;
    
    card.innerHTML = `
        <div class="pass-timing-grid">
            <div class="timing-item">
                <div class="timing-label">AOS</div>
                <div class="timing-value" data-testid="text-aos-${pass.id}">${pass.aos}</div>
            </div>
            <div class="timing-item">
                <div class="timing-label">TCA</div>
                <div class="timing-value" data-testid="text-tca-${pass.id}">${pass.tca}</div>
            </div>
            <div class="timing-item">
                <div class="timing-label">LOS</div>
                <div class="timing-value" data-testid="text-los-${pass.id}">${pass.los}</div>
            </div>
            <div class="timing-item">
                <div class="timing-label">MAX ELEVATION</div>
                <div class="timing-value" data-testid="text-elevation-${pass.id}">${pass.maxElevation}</div>
            </div>
        </div>
        <div class="pass-card-bottom">
            <div class="pass-direction-indicator">
                <span class="direction-dot"></span>
                <span class="direction-text">Direction: ${pass.direction}</span>
            </div>
            ${type === 'future' ? 
                `<button class="btn-schedule" data-pass-id="${pass.id}" data-testid="button-schedule-${pass.id}">
                    📅 Schedule
                </button>` :
                `<button class="btn-download" data-pass-id="${pass.id}" data-testid="button-download-${pass.id}">
                    📥 Download Image
                </button>`
            }
        </div>
    `;
    
    // Add event listener to button
    const button = card.querySelector('button');
    if (type === 'future') {
        button.addEventListener('click', () => handleSchedulePass(pass));
    } else {
        button.addEventListener('click', () => handleDownloadImage(pass));
    }
    
    return card;
}

// Handle schedule button click
function handleSchedulePass(pass) {
    // TODO: Handle schedule button click and pass details
    // Store pass data and navigate to pass details page
    sessionStorage.setItem('selectedPassId', pass.id);
    sessionStorage.setItem('selectedPassData', JSON.stringify({
        ...pass,
        satelliteName: satellite.name,
        noradId: satellite.noradId
    }));
    window.location.href = '/pages/passDetailsPage/passDetailsPage.html';
}

// Handle download image button click
function handleDownloadImage(pass) {
    // TODO: Handle image download functionality
    // For now, create a placeholder image download
    
    // Create a simple canvas with pass information
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`${satellite.name} Pass Image`, 50, 50);
    
    ctx.font = '18px Arial';
    ctx.fillStyle = '#a0aec0';
    ctx.fillText(`AOS: ${pass.aos}`, 50, 100);
    ctx.fillText(`TCA: ${pass.tca}`, 50, 130);
    ctx.fillText(`LOS: ${pass.los}`, 50, 160);
    ctx.fillText(`Max Elevation: ${pass.maxElevation}`, 50, 190);
    
    ctx.fillText('Placeholder Image', 50, 250);
    ctx.fillText('Actual satellite pass imagery will be available via API', 50, 280);
    
    // Convert to blob and download
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${satellite.name.replace(/\s+/g, '_')}_pass_${pass.id}.png`;
        link.click();
        URL.revokeObjectURL(url);
    });
}

// Tab switching functionality
function initializeTabs() {
    const tabTriggers = document.querySelectorAll('.pass-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const tabName = trigger.getAttribute('data-tab');
            
            // Remove active class from all triggers and contents
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked trigger and corresponding content
            trigger.classList.add('active');
            document.querySelector(`[data-content="${tabName}"]`).classList.add('active');
        });
    });
}

// Back button functionality
document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = '/pages/explorePage/explorePage.html';
});

// Initialize page
function init() {
    displaySatelliteDetails();
    initializeTabs();
    renderFuturePasses();
    renderPastPasses();
}

init();
