// Pass Details Page JavaScript
// Displays detailed information about a specific satellite pass

// Protect this page - redirect to login if not authenticated
protectPage();

// Get pass data from session storage
const passDataString = sessionStorage.getItem('selectedPassData');

// Parse pass data
let passData = null;
if (passDataString) {
    try {
        passData = JSON.parse(passDataString);
    } catch (e) {
        console.error('Error parsing pass data:', e);
    }
}

// Sample detailed pass data
// TODO: Fetch detailed pass data from API based on pass ID
const getDetailedPassData = () => {
    if (!passData) {
        return null;
    }
    
    // Generate placeholder detailed data
    return {
        ...passData,
        riseAngle: '15° NE',
        setAngle: '12° SW',
        culminationAngle: '68° S'
    };
};

// Display pass details
function displayPassDetails() {
    const detailedData = getDetailedPassData();
    
    if (!detailedData) {
        // If no pass data found, redirect back to explore page
        window.location.href = '/pages/explorePage/explorePage.html';
        return;
    }
    
    // Populate pass details form
    const passDetailsForm = document.getElementById('passDetailsForm');
    passDetailsForm.innerHTML = `
        <div class="detail-row-clean">
            <span class="detail-label-clean">NORAD ID:</span>
            <span class="detail-value-clean" data-testid="text-norad-id">${detailedData.noradId}</span>
        </div>
        <div class="detail-row-clean">
            <span class="detail-label-clean">Satellite Name:</span>
            <span class="detail-value-clean" data-testid="text-satellite-name">${detailedData.satelliteName}</span>
        </div>
        <div class="detail-row-clean">
            <span class="detail-label-clean">Rise Angle:</span>
            <span class="detail-value-clean" data-testid="text-rise-angle">${detailedData.riseAngle}</span>
        </div>
        <div class="detail-row-clean">
            <span class="detail-label-clean">Set Angle:</span>
            <span class="detail-value-clean" data-testid="text-set-angle">${detailedData.setAngle}</span>
        </div>
        <div class="detail-row-clean">
            <span class="detail-label-clean">Culmination Angle:</span>
            <span class="detail-value-clean" data-testid="text-culmination-angle">${detailedData.culminationAngle}</span>
        </div>
        <div class="detail-row-clean">
            <span class="detail-label-clean">AOS Time:</span>
            <span class="detail-value-clean" data-testid="text-aos-time">${detailedData.aos}</span>
        </div>
        <div class="detail-row-clean">
            <span class="detail-label-clean">LOS Time:</span>
            <span class="detail-value-clean" data-testid="text-los-time">${detailedData.los}</span>
        </div>
    `;
}

// Back button functionality
document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = '/pages/satelliteDetailsPage/satelliteDetailsPage.html';
});

// Initialize page
displayPassDetails();
