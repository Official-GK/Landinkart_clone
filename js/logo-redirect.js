document.addEventListener('DOMContentLoaded', function() {
    // Get all logo elements
    const logos = document.querySelectorAll('.navbar-logo');
    
    // Add click event listener to each logo
    logos.forEach(logo => {
        logo.addEventListener('click', function() {
            // Don't redirect if we're on the dashboard
            if (!window.location.pathname.includes('dashboard.html')) {
                window.location.href = 'landingpage.html';
            }
        });
        
        // Add hover effect styles
        logo.style.cursor = 'pointer';
        logo.style.transition = 'opacity 0.3s ease';
        
        logo.addEventListener('mouseover', function() {
            this.style.opacity = '0.8';
        });
        
        logo.addEventListener('mouseout', function() {
            this.style.opacity = '1';
        });
    });
}); 