// Demo account credentials
const DEMO_ACCOUNT = {
    email: 'demo@lendingkart.com',
    password: 'demo123'
};

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Check against demo account
        if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
            // Show success message
            showMessage('Login successful! Redirecting to dashboard...', 'success');
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            // Show error message
            showMessage('Invalid email or password. Try demo@lendingkart.com / demo123', 'error');
        }
    });
    
    // Function to show messages
    function showMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        // Add message to form
        loginForm.insertBefore(messageDiv, loginForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}); 