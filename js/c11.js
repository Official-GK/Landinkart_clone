// c11.js: Business Loan EMI Calculator logic

// Get all the necessary elements
const loanAmountInput = document.querySelector('.input-group:nth-child(1) input');
const tenureInput = document.querySelector('.input-group:nth-child(2) input');
const interestRateInput = document.querySelector('.input-group:nth-child(3) input');
const calculateBtn = document.querySelector('.calculate-btn');
const principalAmountDisplay = document.querySelector('.principal-amount');
const interestAmountDisplay = document.querySelector('.interest-amount');
const monthlyEmiDisplay = document.querySelector('.result-value:not(.principal-amount):not(.interest-amount)');
const totalPayableDisplay = document.querySelector('.total-payable');

// Slider configuration
const sliderConfig = {
    loanAmount: {
        min: 100000,
        max: 5000000,
        step: 100000,
        input: loanAmountInput,
        thumb: document.querySelector('.input-group:nth-child(1) .thumb'),
        track: document.querySelector('.input-group:nth-child(1) .track'),
        range: document.querySelector('.input-group:nth-child(1) .input-range')
    },
    tenure: {
        min: 6,
        max: 36,
        step: 1,
        input: tenureInput,
        thumb: document.querySelector('.input-group:nth-child(2) .thumb'),
        track: document.querySelector('.input-group:nth-child(2) .track'),
        range: document.querySelector('.input-group:nth-child(2) .input-range')
    },
    interestRate: {
        min: 13.5,
        max: 35,
        step: 0.1,
        input: interestRateInput,
        thumb: document.querySelector('.input-group:nth-child(3) .thumb'),
        track: document.querySelector('.input-group:nth-child(3) .track'),
        range: document.querySelector('.input-group:nth-child(3) .input-range')
    }
};

// Function to format currency in Indian format
function formatCurrency(amount) {
    return 'Rs.' + amount.toLocaleString('en-IN', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });
}

// Function to calculate EMI
function calculateEMI(principal, rate, time) {
    const monthlyRate = rate / 12 / 100;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, time) / (Math.pow(1 + monthlyRate, time) - 1);
    return emi;
}

// Function to format value display
function formatValueDisplay(value, type) {
    switch(type) {
        case 'loanAmount':
            return '₹' + value.toLocaleString('en-IN');
        case 'tenure':
            return value + ' Months';
        case 'interestRate':
            return value + '%';
        default:
            return value;
    }
}

// Function to update slider position and track
function updateSlider(slider, value) {
    const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;
    slider.thumb.style.left = `${percentage}%`;
    slider.track.style.width = `${percentage}%`;
    slider.input.value = value;
    
    // Update value display
    const valueDisplay = slider.range.parentElement.querySelector('.value-display');
    const type = slider.input === loanAmountInput ? 'loanAmount' : 
                slider.input === tenureInput ? 'tenure' : 'interestRate';
    valueDisplay.textContent = formatValueDisplay(value, type);
}

// Function to handle slider interaction
function handleSliderInteraction(slider, e) {
    const rect = slider.range.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const value = Math.round((percentage / 100) * (slider.max - slider.min) / slider.step) * slider.step + slider.min;
    const clampedValue = Math.min(Math.max(value, slider.min), slider.max);
    
    updateSlider(slider, clampedValue);
}

// Function to initialize sliders
function initializeSliders() {
    Object.entries(sliderConfig).forEach(([key, slider]) => {
        // Set initial values
        updateSlider(slider, parseFloat(slider.input.value));

        // Add mouse event listeners for slider
        slider.range.addEventListener('mousedown', (e) => {
            handleSliderInteraction(slider, e);
            
            const mouseMoveHandler = (e) => {
                handleSliderInteraction(slider, e);
            };
            
            const mouseUpHandler = () => {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };
            
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

        // Add input event listener
        slider.input.addEventListener('input', (e) => {
            let value = parseFloat(e.target.value);
            value = Math.min(Math.max(value, slider.min), slider.max);
            updateSlider(slider, value);
        });
    });
}

// Function to update the calculator
function updateCalculator() {
    const principal = parseFloat(loanAmountInput.value) || 0;
    const rate = parseFloat(interestRateInput.value) || 0;
    const time = parseInt(tenureInput.value) || 0;

    const emi = calculateEMI(principal, rate, time);
    const totalInterest = (emi * time) - principal;
    const totalAmount = principal + totalInterest;

    // Show and update results container
    const resultsContainer = document.querySelector('.results-container');
    resultsContainer.classList.add('show');

    principalAmountDisplay.textContent = formatCurrency(principal);
    interestAmountDisplay.textContent = formatCurrency(totalInterest);
    monthlyEmiDisplay.textContent = formatCurrency(emi);
    totalPayableDisplay.textContent = `Total Amount Payable: ${formatCurrency(totalAmount)}`;

    // Update the chart with animation
    const chartPlaceholder = document.querySelector('.chart-container div');
    chartPlaceholder.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="margin-bottom: 20px; font-size: 18px; color: #023347; font-weight: 500;">Loan Distribution</div>
            <div style="display: flex; justify-content: center; gap: 30px;">
                <div style="text-align: center;">
                    <div style="width: 120px; height: 120px; background: #294e9b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; box-shadow: 0 4px 12px rgba(41, 78, 155, 0.2);">
                        ${Math.round((principal / totalAmount) * 100)}%
                    </div>
                    <div style="margin-top: 15px; font-size: 16px; color: #023347;">Principal</div>
                </div>
                <div style="text-align: center;">
                    <div style="width: 120px; height: 120px; background: #12a9c0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; box-shadow: 0 4px 12px rgba(18, 169, 192, 0.2);">
                        ${Math.round((totalInterest / totalAmount) * 100)}%
                    </div>
                    <div style="margin-top: 15px; font-size: 16px; color: #023347;">Interest</div>
                </div>
            </div>
        </div>
    `;
}

// Initialize sliders
initializeSliders();

// Add event listener for calculate button
calculateBtn.addEventListener('click', updateCalculator);

// Hide results initially
const resultsContainer = document.querySelector('.results-container');
if (resultsContainer) resultsContainer.classList.remove('show');

// Chart initialization
let emiChart = null;

function initializeChart() {
    const ctx = document.getElementById('emiChart').getContext('2d');
    emiChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal Amount', 'Interest Amount'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [
                    '#12a9c0',
                    '#ff6b6b'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + formatINR(context.raw);
                        }
                    }
                }
            }
        }
    });
}

// Update chart with new data
function updateChart(principal, interest) {
    if (!emiChart) {
        initializeChart();
    }
    
    emiChart.data.datasets[0].data = [
        principal,
        interest
    ];
    
    emiChart.update();
}

// Format currency in Indian format
function formatINR(num) {
    return '₹' + Number(num).toLocaleString('en-IN');
}

// Calculate EMI
function calculateEMI() {
    const principal = parseFloat(document.querySelector('input[type="number"]').value) || 0;
    const rate = parseFloat(document.querySelectorAll('input[type="number"]')[2].value) || 0;
    const tenure = parseFloat(document.querySelectorAll('input[type="number"]')[1].value) || 0;
    
    // Monthly interest rate
    const monthlyRate = rate / 12 / 100;
    
    // Calculate EMI
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    
    // Calculate total interest
    const totalInterest = (emi * tenure) - principal;
    
    // Update results
    document.querySelector('.principal-amount').textContent = formatINR(Math.round(principal));
    document.querySelector('.interest-amount').textContent = formatINR(Math.round(totalInterest));
    document.querySelector('.result-value:last-child').textContent = formatINR(Math.round(emi));
    document.querySelector('.total-payable').textContent = 'Total Amount Payable: ' + formatINR(Math.round(principal + totalInterest));
    
    // Update chart
    updateChart(
        Math.round(principal),
        Math.round(totalInterest)
    );
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chart
    initializeChart();
    
    // Add event listeners
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', calculateEMI);
    });
    
    document.querySelector('.calculate-btn').addEventListener('click', calculateEMI);
    
    // Initial calculation
    calculateEMI();
}); 