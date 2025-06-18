// Format number to Indian currency format
function formatIndianCurrency(number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

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

function calculateEMI(P, N, R) {
    const r = R / (12 * 100); // monthly interest rate
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    return emi;
}

const loanAmountSlider = document.getElementById('loanAmount');
const tenureSlider = document.getElementById('tenure');
const interestRateSlider = document.getElementById('interestRate');
const loanAmountValue = document.getElementById('loanAmount-value');
const tenureValue = document.getElementById('tenure-value');
const interestRateValue = document.getElementById('interestRate-value');
const resultsContainer = document.getElementById('resultsContainer');
const emiResult = document.getElementById('emiResult');
const interestResult = document.getElementById('interestResult');
const totalResult = document.getElementById('totalResult');

function updateSliderBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #12a9c0 0%, #12a9c0 ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
}

function updateSliderValue(slider, valueDisplay, isPercentage = false) {
    const value = parseFloat(slider.value);
    valueDisplay.textContent = isPercentage ? `${value.toFixed(1)}%` : formatIndianCurrency(value);
    updateSliderBackground(slider);
}

function updateResults() {
    const P = parseInt(loanAmountSlider.value);
    const N = parseInt(tenureSlider.value);
    const R = parseFloat(interestRateSlider.value);
    const emi = calculateEMI(P, N, R);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;
    
    emiResult.textContent = formatINR(Math.round(emi));
    interestResult.textContent = formatINR(Math.round(totalInterest));
    totalResult.textContent = formatINR(Math.round(totalPayment));
    resultsContainer.style.display = 'block';
    
    // Update chart
    updateChart(
        Math.round(P),
        Math.round(totalInterest)
    );
}

// Initialize slider backgrounds
updateSliderBackground(loanAmountSlider);
updateSliderBackground(tenureSlider);
updateSliderBackground(interestRateSlider);

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chart
    initializeChart();
    
    // Add event listeners for sliders
    loanAmountSlider.addEventListener('input', () => {
        updateSliderValue(loanAmountSlider, loanAmountValue);
        updateResults();
    });
    
    tenureSlider.addEventListener('input', () => {
        updateSliderValue(tenureSlider, tenureValue);
        updateResults();
    });
    
    interestRateSlider.addEventListener('input', () => {
        updateSliderValue(interestRateSlider, interestRateValue, true);
        updateResults();
    });
    
    // Add event listener for calculate button
    document.querySelector('.calculate-btn').addEventListener('click', updateResults);
    
    // Initial calculation
    updateResults();
}); 