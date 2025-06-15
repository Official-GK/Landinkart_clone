// Format number to Indian currency format
function formatIndianCurrency(number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

// Calculate RD maturity amount
function calculateRD(monthlyDeposit, tenure, interestRate) {
    const quarterlyRate = interestRate / 4;
    const numberOfQuarters = tenure / 3;
    const i = quarterlyRate / 100;
    const n = numberOfQuarters;
    const R = monthlyDeposit;
    const maturityAmount = R * ((Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1/3)));
    const totalInvestment = R * tenure;
    const wealthGained = maturityAmount - totalInvestment;
    return {
        maturityAmount: Math.round(maturityAmount),
        totalInvestment: totalInvestment,
        wealthGained: Math.round(wealthGained)
    };
}

const monthlyAmountSlider = document.getElementById('monthlyAmount');
const tenureSlider = document.getElementById('tenure');
const interestRateSlider = document.getElementById('interestRate');
const monthlyAmountValue = document.getElementById('monthlyAmount-value');
const tenureValue = document.getElementById('tenure-value');
const interestRateValue = document.getElementById('interestRate-value');
const resultsContainer = document.getElementById('resultsContainer');
const totalInvestmentDisplay = document.getElementById('totalInvestment');
const wealthGainedDisplay = document.getElementById('wealthGained');
const maturityAmountDisplay = document.getElementById('maturityAmount');
let rdChart = null;

function updateSliderValue(slider, valueDisplay, isPercentage = false) {
    const value = parseFloat(slider.value);
    valueDisplay.textContent = isPercentage ? `${value.toFixed(1)}%` : formatIndianCurrency(value);
}

function updateChart(results) {
    const ctx = document.getElementById('rdChart').getContext('2d');
    if (rdChart) {
        rdChart.destroy();
    }
    rdChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Total Investment', 'Wealth Gained'],
            datasets: [{
                data: [results.totalInvestment, results.wealthGained],
                backgroundColor: ['#12a9c0', '#e0e0e0'],
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
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

function calculateAndDisplayResults() {
    const monthlyDeposit = parseInt(monthlyAmountSlider.value);
    const tenure = parseInt(tenureSlider.value);
    const interestRate = parseFloat(interestRateSlider.value);
    const results = calculateRD(monthlyDeposit, tenure, interestRate);
    totalInvestmentDisplay.textContent = formatIndianCurrency(results.totalInvestment);
    wealthGainedDisplay.textContent = formatIndianCurrency(results.wealthGained);
    maturityAmountDisplay.textContent = formatIndianCurrency(results.maturityAmount);
    updateChart(results);
    resultsContainer.style.display = 'block';
}

monthlyAmountSlider.addEventListener('input', () => {
    updateSliderValue(monthlyAmountSlider, monthlyAmountValue);
});
tenureSlider.addEventListener('input', () => {
    updateSliderValue(tenureSlider, tenureValue);
});
interestRateSlider.addEventListener('input', () => {
    updateSliderValue(interestRateSlider, interestRateValue, true);
});
document.querySelector('.calculate-btn').addEventListener('click', calculateAndDisplayResults);
updateSliderValue(monthlyAmountSlider, monthlyAmountValue);
updateSliderValue(tenureSlider, tenureValue);
updateSliderValue(interestRateSlider, interestRateValue, true); 