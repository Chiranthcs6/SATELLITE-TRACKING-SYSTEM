
// Authentication module for Satellite Tracking System
// Handles user login, admin login, signup and session management

// Demo account credentials
const DEMO_ACCOUNTS = {
    user: {
        username: 'user',
        password: 'user123',
        role: 'user'
    },
    admin: {
        username: 'admin',
        password: 'admin123',
        role: 'admin'
    }
};

// Store for registered users (in-memory, will be lost on refresh)
const registeredUsers = [];

// Check if user is already logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
}

// Login function
function login(username, password, role = 'user') {
    // Check demo accounts
    if (role === 'user' && username === DEMO_ACCOUNTS.user.username && password === DEMO_ACCOUNTS.user.password) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('role', 'user');
        return true;
    }
    
    if (role === 'admin' && username === DEMO_ACCOUNTS.admin.username && password === DEMO_ACCOUNTS.admin.password) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('role', 'admin');
        return true;
    }
    
    // Check registered users
    const user = registeredUsers.find(u => u.username === username && u.password === password);
    if (user) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('role', 'user');
        return true;
    }
    
    return false;
}

// Signup function
function signup(userData) {
    // Check if username already exists
    if (registeredUsers.some(u => u.username === userData.username)) {
        return { success: false, message: 'Username already exists' };
    }
    
    // Check if passwords match
    if (userData.password !== userData.confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
    }
    
    // Add user to registered users
    registeredUsers.push({
        username: userData.username,
        password: userData.password,
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        role: 'user'
    });
    
    return { success: true, message: 'Account created successfully' };
}

// Logout function
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    window.location.href = '/';
}

// Get current username
function getCurrentUser() {
    return sessionStorage.getItem('username') || 'Guest';
}

// Get current user role
function getUserRole() {
    return sessionStorage.getItem('role') || 'user';
}

// Initialize all event listeners when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabTriggers.length > 0) {
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

    // Handle user login form submission
    const userLoginForm = document.getElementById('userLoginForm');
    if (userLoginForm) {
        userLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('user-username').value;
            const password = document.getElementById('user-password').value;
            
            if (login(username, password, 'user')) {
                window.location.href = 'pages/explorePage/explorePage.html';
            } else {
                alert('Invalid user credentials. Please try again.');
            }
        });
    }

    // Handle admin login form submission
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            
            if (login(username, password, 'admin')) {
                window.location.href = 'pages/explorePage/explorePage.html';
            } else {
                alert('Invalid admin credentials. Please try again.');
            }
        });
    }

    // Handle signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userData = {
                firstname: document.getElementById('signup-firstname').value,
                lastname: document.getElementById('signup-lastname').value,
                username: document.getElementById('signup-username').value,
                email: document.getElementById('signup-email').value,
                password: document.getElementById('signup-password').value,
                confirmPassword: document.getElementById('signup-confirm-password').value
            };
            
            const result = signup(userData);
            
            if (result.success) {
                alert(result.message + '. You can now login with your credentials.');
                // Switch to user login tab
                document.querySelector('[data-tab="user"]').click();
                // Reset form
                signupForm.reset();
            } else {
                alert(result.message);
            }
        });
    }
});

// Protect pages that require authentication
function protectPage() {
    if (!checkAuth()) {
        window.location.href = '/';
    }
}
