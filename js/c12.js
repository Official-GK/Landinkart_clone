// Format number to Indian currency format
function formatIndianCurrency(number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
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
tenureValue = document.getElementById('tenure-value');
interestRateValue = document.getElementById('interestRate-value');
const resultsContainer = document.getElementById('resultsContainer');
const emiResult = document.getElementById('emiResult');
const interestResult = document.getElementById('interestResult');
const totalResult = document.getElementById('totalResult');

function updateSliderValue(slider, valueDisplay, isPercentage = false) {
    const value = parseFloat(slider.value);
    valueDisplay.textContent = isPercentage ? `${value.toFixed(1)}%` : formatIndianCurrency(value);
}

loanAmountSlider.addEventListener('input', () => {
    updateSliderValue(loanAmountSlider, loanAmountValue);
});
tenureSlider.addEventListener('input', () => {
    tenureValue.textContent = tenureSlider.value;
});
interestRateSlider.addEventListener('input', () => {
    updateSliderValue(interestRateSlider, interestRateValue, true);
});

document.querySelector('.calculate-btn').addEventListener('click', () => {
    const P = parseInt(loanAmountSlider.value);
    const N = parseInt(tenureSlider.value);
    const R = parseFloat(interestRateSlider.value);
    const emi = calculateEMI(P, N, R);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;
    emiResult.textContent = formatIndianCurrency(Math.round(emi));
    interestResult.textContent = formatIndianCurrency(Math.round(totalInterest));
    totalResult.textContent = formatIndianCurrency(Math.round(totalPayment));
    resultsContainer.style.display = 'block';
});

// Initialize slider values
updateSliderValue(loanAmountSlider, loanAmountValue);
tenureValue.textContent = tenureSlider.value;
updateSliderValue(interestRateSlider, interestRateValue, true); 