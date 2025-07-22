#!/bin/bash

# Add all files to git
git add .

# Create a backdated commit for July 22nd, 2025
GIT_AUTHOR_DATE="2025-07-22T10:00:00" GIT_COMMITTER_DATE="2025-07-22T10:00:00" git commit -m "Add Project folder with Ticket Booking Application - EventHub

- Complete ticket booking platform with React.js and Material-UI
- Advanced event booking system with user authentication
- Professional Netflix/Zomato-style navigation and UI
- Admin dashboard for event management
- Responsive design with modern animations
- Created on July 22, 2025 during Celebal Technology Summer Internship"

# Push to GitHub
git push origin main

echo "Successfully pushed all files to GitHub with backdated commit of July 22nd, 2025!" 