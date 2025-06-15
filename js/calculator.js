// Function to format currency in Indian format
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Function to calculate EMI
function calculateEMI(principal, rate, time) {
    // Convert annual rate to monthly rate
    const monthlyRate = rate / 12 / 100;
    // Convert time to months
    const timeInMonths = time;
    
    // Calculate EMI using the formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, timeInMonths) / 
                (Math.pow(1 + monthlyRate, timeInMonths) - 1);
    
    // Calculate total amount
    const totalAmount = emi * timeInMonths;
    
    return {
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount)
    };
}

// Function to update all values
function updateValues() {
    // Get values from sliders
    const principal = parseFloat(document.getElementById('loanAmount').value);
    const rate = parseFloat(document.getElementById('interest').value);
    const time = parseInt(document.getElementById('tenure').value);
    
    // Update slider displays
    document.getElementById('loanAmountValue').textContent = (principal / 100000) + 'L';
    document.getElementById('tenureValue').textContent = time + 'M';
    document.getElementById('interestValue').textContent = rate + '%';
    
    // Calculate EMI
    const result = calculateEMI(principal, rate, time);
    
    // Update card values
    document.querySelector('.loan-amount').textContent = formatCurrency(result.totalAmount);
    document.querySelector('.emi-amount').textContent = formatCurrency(result.emi) + '/mo';
}

// Add event listeners when the page loads
window.onload = function() {
    // Add event listeners to all sliders
    document.getElementById('loanAmount').addEventListener('input', updateValues);
    document.getElementById('tenure').addEventListener('input', updateValues);
    document.getElementById('interest').addEventListener('input', updateValues);
    
    // Initial calculation
    updateValues();
}; 