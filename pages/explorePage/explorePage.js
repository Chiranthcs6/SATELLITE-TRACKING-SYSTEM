// Explore Page JavaScript
// Handles satellite listing, search, and navigation to detail pages

// Protect this page - redirect to login if not authenticated
protectPage();

// Detect user role and configure page accordingly
const userRole = getUserRole();
const isAdmin = userRole === 'admin';

// Sample satellite data for demonstration
// TODO: Fetch satellite data from API
const sampleSatellites = [
    {
        id: 1,
        name: 'ISS ',
        noradId: '25544',
        type: 'Space Station',
        status: 'active',
        altitude: '408 km',
        country: 'International',
        nextPass: '2025-10-31 16:21 UTC'
    },
    {
        id: 2,
        name: 'Meteor M 2-3',
        noradId: '20580',
        type: 'Telescope',
        status: 'active',
        altitude: '540 km',
        country: 'USA',
        nextPass: '2025-10-31 14:29 UTC'
    },
    {
        id: 3,
        name: 'Meteor M 2-4',
        noradId: '25994',
        type: 'Earth Observation',
        status: 'active',
        altitude: '705 km',
        country: 'USA',
        nextPass: '2025-10-31 11:15 UTC'
    },
    {
        id: 4,
        name: 'Metop B',
        noradId: '41866',
        type: 'Weather',
        status: 'active',
        altitude: '35786 km',
        country: 'USA',
        nextPass: '2025-10-31 15:00 UTC'
    },
        {
        id: 5,
        name: 'Metop C',
        noradId: '817',
        type: 'Weather',
        status: 'active',
        altitude: '35786 km',
        country: 'USA',
        nextPass: '2025-10-31 15:45 UTC'
    }
];

// Display current user
document.getElementById('currentUser').textContent = getCurrentUser();

// Render satellites to the grid
function renderSatellites(satellites) {
    const grid = document.getElementById('satelliteGrid');
    const noResults = document.getElementById('noResults');
    
    // Clear existing content
    grid.innerHTML = '';
    
    if (satellites.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    satellites.forEach(satellite => {
        const card = createSatelliteCard(satellite);
        grid.appendChild(card);
    });
    
    // Update satellite count
    document.getElementById('satelliteCount').textContent = `Tracking ${satellites.length} satellites`;
}

// Create a satellite card element
function createSatelliteCard(satellite) {
    const card = document.createElement('div');
    card.className = 'satellite-card';
    card.dataset.testid = `card-satellite-${satellite.id}`;
    
    card.innerHTML = `
        <div class="satellite-card-header">
            <div class="satellite-name-section">
                <h3 class="satellite-name">${satellite.name}</h3>
            </div>
            <div class="status-indicator">
                <div class="status-dot ${satellite.status}"></div>
            </div>
        </div>
        <div class="satellite-card-content">
            <div class="satellite-details">
                <div class="detail-item">
                    <span class="label">NORAD ID:</span>
                    <span class="value" data-testid="text-norad-${satellite.id}">${satellite.noradId}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Type:</span>
                    <span class="value" data-testid="text-type-${satellite.id}">${satellite.type}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Altitude:</span>
                    <span class="value" data-testid="text-altitude-${satellite.id}">${satellite.altitude}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Next Pass:</span>
                    <span class="value next-pass" data-testid="text-nextpass-${satellite.id}">${satellite.nextPass}</span>
                </div>
            </div>
        </div>
        <div class="satellite-card-footer">
            <button class="btn primary full-width" data-testid="button-view-details-${satellite.id}">
                View Details
            </button>
        </div>
    `;
    
    // Add click handler to View Details button
    const viewDetailsBtn = card.querySelector('button');
    viewDetailsBtn.addEventListener('click', () => {
        navigateToDetails(satellite.id);
    });
    
    return card;
}

// Navigate to satellite details page
function navigateToDetails(satelliteId) {
    // Store selected satellite ID for details page
    sessionStorage.setItem('selectedSatelliteId', satelliteId);
    window.location.href = '../satelliteDetailsPage/satelliteDetailsPage.html';
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredSatellites = sampleSatellites.filter(satellite => 
        satellite.name.toLowerCase().includes(searchTerm) ||
        satellite.noradId.includes(searchTerm) ||
        satellite.type.toLowerCase().includes(searchTerm)
    );
    
    renderSatellites(filteredSatellites);
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
});

// Initialize page
function init() {
    // TODO: Fetch satellites from API
    // For now, using sample data
    renderSatellites(sampleSatellites);
    
    // Initialize admin features if user is admin
    if (isAdmin) {
        initAdminFeatures();
    }
}

// ==================== ADMIN-ONLY FEATURES ====================

// Sample user requests data for demonstration
// TODO: Fetch user requests from API
let userRequests = [
    {
        id: 1,
        username: 'demo',
        satelliteName: 'ISS',
        satelliteId: 1,
        passTime: '2025-10-08 14:30 UTC',
        duration: '5 minutes',
        status: 'pending'
    },
    {
        id: 2,
        username: 'john_doe',
        satelliteName: 'Meteor M 2-3',
        satelliteId: 2,
        passTime: '2025-10-09 09:15 UTC',
        duration: '7 minutes',
        status: 'pending'
    },
    {
        id: 3,
        username: 'jane_smith',
        satelliteName: 'Metop C',
        satelliteId: 3,
        passTime: '2025-10-10 15:45 UTC',
        duration: '4 minutes',
        status: 'pending'
    }
];

// Initialize admin-specific features
function initAdminFeatures() {
    // Show admin Requests button
    const requestsBtn = document.getElementById('requestsBtn');
    requestsBtn.style.display = 'inline-flex';
    
    // Attach event listeners for admin controls
    requestsBtn.addEventListener('click', openRequestsModal);
    document.getElementById('closeRequestsBtn').addEventListener('click', closeRequestsModal);
    
    // Close modal when clicking outside
    document.getElementById('requestsModal').addEventListener('click', (e) => {
        
        if (e.target.id === 'requestsModal') {
            closeRequestsModal();
        }
    });
}

// Open requests modal
function openRequestsModal() {
    document.getElementById('requestsModal').style.display = 'flex';
    renderRequests();
}

// Close requests modal
function closeRequestsModal() {
    document.getElementById('requestsModal').style.display = 'none';
}

// Render user requests
function renderRequests() {
    const requestsBody = document.getElementById('requestsBody');
    
    // TODO: Fetch requests from API
    // For now, using sample data
    
    if (userRequests.length === 0) {
        requestsBody.innerHTML = '<p class="no-results">No pending requests.</p>';
        return;
    }
    
    requestsBody.innerHTML = '';
    
    userRequests.forEach(request => {
        const requestCard = createRequestCard(request);
        requestsBody.appendChild(requestCard);
    });
}

// Create a request card element
function createRequestCard(request) {
    const card = document.createElement('div');
    card.className = 'request-card';
    card.dataset.testid = `card-request-${request.id}`;
    
    const statusBadge = request.status === 'approved' ? 
        '<span class="badge primary">Approved</span>' :
        request.status === 'rejected' ? 
        '<span class="badge destructive">Rejected</span>' :
        '<span class="badge secondary">Pending</span>';
    
    card.innerHTML = `
        <div class="request-header">
            <div class="request-info">
                <h3 class="request-user">${request.username}</h3>
                <p class="request-satellite">${request.satelliteName}</p>
            </div>
            ${statusBadge}
        </div>
        <div class="request-details">
            <div class="detail-item">
                <span class="label">Pass Time:</span>
                <span class="value">${request.passTime}</span>
            </div>
            <div class="detail-item">
                <span class="label">Duration:</span>
                <span class="value">${request.duration}</span>
            </div>
        </div>
        ${request.status === 'pending' ? `
            <div class="request-actions">
                <button class="btn primary" data-request-id="${request.id}" data-action="approve" data-testid="button-approve-${request.id}">
                    Approve
                </button>
                <button class="btn destructive" data-request-id="${request.id}" data-action="reject" data-testid="button-reject-${request.id}">
                    Reject
                </button>
            </div>
        ` : ''}
    `;
    
    // Add event listeners for approve/reject buttons
    if (request.status === 'pending') {
        const approveBtn = card.querySelector('[data-action="approve"]');
        const rejectBtn = card.querySelector('[data-action="reject"]');
        
        approveBtn.addEventListener('click', () => handleRequestAction(request.id, 'approve'));
        rejectBtn.addEventListener('click', () => handleRequestAction(request.id, 'reject'));
    }
    
    return card;
}

// Handle approve/reject request actions
function handleRequestAction(requestId, action) {
    // TODO: Send approve/reject action to API
    // For now, updating local data
    
    const request = userRequests.find(r => r.id === requestId);
    if (request) {
        request.status = action === 'approve' ? 'approved' : 'rejected';
        
        // TODO: Update pass status in database when approved
        // This would make the pass valid for the user
        
        // Re-render requests to reflect changes
        renderRequests();
        
        // Show feedback to admin
        alert(`Request ${action}d successfully!`);
    }
}

// Run initialization when page loads
init();
