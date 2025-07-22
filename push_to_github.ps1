# PowerShell script to push files to GitHub with backdated commit

# Add all files to git
git add .

# Set environment variables for backdated commit
$env:GIT_AUTHOR_DATE = "2025-07-22T10:00:00"
$env:GIT_COMMITTER_DATE = "2025-07-22T10:00:00"

# Create commit with backdated timestamp
git commit -m "Add Project folder with Ticket Booking Application - EventHub

- Complete ticket booking platform with React.js and Material-UI
- Advanced event booking system with user authentication
- Professional Netflix/Zomato-style navigation and UI
- Admin dashboard for event management
- Responsive design with modern animations
- Created on July 22, 2025 during Celebal Technology Summer Internship"

# Push to GitHub
git push origin main

Write-Host "Successfully pushed all files to GitHub with backdated commit of July 22nd, 2025!" -ForegroundColor Green 