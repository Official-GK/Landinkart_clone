document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newApplicationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const applicationData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            businessName: document.getElementById('businessName').value,
            businessType: document.getElementById('businessType').value,
            businessAge: document.getElementById('businessAge').value,
            monthlyRevenue: document.getElementById('monthlyRevenue').value,
            loanAmount: document.getElementById('loanAmount').value,
            loanPurpose: document.getElementById('loanPurpose').value,
            loanTenure: document.getElementById('loanTenure').value,
            status: 'Submitted',
            applicationDate: new Date().toISOString(),
            applicationId: 'APP' + Date.now(),
            documents: []
        };

        // Get existing applications from localStorage
        let applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
        
        // Add new application to the beginning of the array
        applications.unshift(applicationData);
        
        // Save back to localStorage
        localStorage.setItem('loanApplications', JSON.stringify(applications));

        // Show success message
        Swal.fire({
            title: 'Application Submitted!',
            text: 'Your loan application has been submitted successfully.',
            icon: 'success',
            confirmButtonText: 'View Applications',
            confirmButtonColor: '#023347'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'dashboard.html';
            }
        });
    });
}); 