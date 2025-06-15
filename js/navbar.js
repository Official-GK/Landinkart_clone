// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  // Handle mobile menu toggle
  const navbarItems = document.querySelectorAll('.navbar-item');
  
  navbarItems.forEach(item => {
    item.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        const dropdown = this.querySelector('.dropdown-menu');
        if (dropdown) {
          e.preventDefault();
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
      }
    });
  });

  // Desktop: Add delay to dropdown hide on mouseleave
  if (window.innerWidth > 768) {
    navbarItems.forEach(item => {
      let hideTimeout;
      item.addEventListener('mouseenter', function() {
        const dropdown = this.querySelector('.dropdown-menu');
        if (dropdown) {
          clearTimeout(hideTimeout);
          dropdown.style.display = 'block';
          dropdown.style.pointerEvents = 'auto';
        }
      });
      item.addEventListener('mouseleave', function() {
        const dropdown = this.querySelector('.dropdown-menu');
        if (dropdown) {
          hideTimeout = setTimeout(() => {
            dropdown.style.display = '';
            dropdown.style.pointerEvents = '';
          }, 180); // 180ms delay
        }
      });
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar-item')) {
      const dropdowns = document.querySelectorAll('.dropdown-menu');
      dropdowns.forEach(dropdown => {
        if (window.innerWidth <= 768) {
          dropdown.style.display = 'none';
        }
      });
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      const dropdowns = document.querySelectorAll('.dropdown-menu');
      dropdowns.forEach(dropdown => {
        dropdown.style.display = '';
      });
    }
  });
}); 