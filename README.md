# Satellite Tracking System

A web-based satellite tracking and scheduling system built with HTML, CSS, and Vanilla JavaScript.

## Features

- **Authentication System**: Cookie-based login/signup with user and admin roles
- **Satellite Explorer**: Grid view of available satellites with detailed information
- **Pass Tracking**: View future and past satellite passes with AOS, LOS, and TCA data
- **Scheduling System**: Submit observation requests (users) and approve/reject them (admins)
- **Responsive Design**: Mobile-friendly interface with modern UI/UX
- **Admin Panel**: Special interface for administrators to manage scheduling requests

## File Structure

```
satellite-tracking-system/
├── index.html                    # Login/Signup page with inline JavaScript
├── client/
│   ├── src/
│   │   └── pages/
│   │       ├── explore/
│   │       │   ├── explorePage.html
│   │       │   └── explorePage.js
│   │       └── title/
│   │           ├── titlePage.html
│   │           └── titlePage.js
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── images/
│   │       └── background-placeholder.html
│   └── utils/
│       └── auth.js              # Cookie helper functions
└── README.md
```

## Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in a web browser
3. **Sign up** for a new account or login with existing credentials
4. **Choose your role**: User or Admin during signup

## Usage

### For Users
1. **Login/Signup** on the main page
2. **Browse satellites** on the explore page
3. **Click on a satellite** to view detailed information
4. **View passes** (future and past) in the satellite details page
5. **Submit scheduling requests** for satellite observations
6. **Download images** from past passes

### For Admins
1. **Login with admin role** (set during signup)
2. **Access admin panel** on the explore page
3. **View pending requests** from users
4. **Approve or reject** scheduling requests
5. **Manage the system** through the admin interface

## Authentication

The system uses cookie-based authentication with the following cookies:
- `auth=true`: Indicates user is logged in
- `username=<name>`: Current user's username
- `role=user/admin`: User's role in the system

Cookies are set with:
- Path: `/` (available across all pages)
- Max-age: 3600 seconds (1 hour)

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox/Grid and responsive design
- **Vanilla JavaScript**: No external dependencies
- **Local Storage**: For persisting user requests
- **Session Storage**: For passing data between pages

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

### Security Notes
- This is a client-side demo application
- In a production environment, implement server-side authentication
- Add proper input validation and sanitization
- Use HTTPS for secure cookie transmission

## Customization

### Adding New Satellites
Edit the `satellites` array in `explorePage.js`:

```javascript
const satellites = [
    {
        id: 7,
        name: "Your Satellite Name",
        type: "Satellite Type",
        orbit: "Orbit Type",
        status: "Active",
        description: "Description of the satellite"
    }
    // ... existing satellites
];
```

### Styling
Modify `client/assets/css/style.css` to customize:
- Colors and themes
- Layout and spacing
- Typography
- Responsive breakpoints

### Background Image
Replace `client/assets/images/background-placeholder.html` with an actual `background.jpg` image file.

## Development

### Local Development
1. Open the project in a code editor
2. Use a local web server (e.g., Live Server extension in VS Code)
3. Make changes and refresh the browser to see updates

### Testing
- Test on different screen sizes
- Verify authentication flows
- Check admin functionality
- Test form validations

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please refer to the code comments or create an issue in the project repository.
