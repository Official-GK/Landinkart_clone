// c41.js: Loan Foreclosure Calculator logic

// Utility functions
function formatINR(num) {
    return '₹' + Number(num).toLocaleString('en-IN');
}

function formatIndianCurrency(number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

function parseIndianNumber(str) {
    return parseInt(str.replace(/,/g, ''));
}

// Slider UI update function
function updateSliderUI(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percent = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #12a9c0 0%, #12a9c0 ${percent}%, #e0e0e0 ${percent}%, #e0e0e0 100%)`;
}

// Sync slider and input for each field
function syncSliderInput(slider, input, min, max, step, formatFn) {
    slider.addEventListener('input', function() {
        input.value = formatFn(this.value);
        updateSliderUI(this);
    });

    input.addEventListener('change', function() {
        let val = parseIndianNumber(this.value);
        if (isNaN(val)) val = min;
        val = Math.max(min, Math.min(max, val));
        slider.value = val;
        input.value = formatFn(val);
        updateSliderUI(slider);
    });
}

// Chart initialization
let foreclosureChart = null;

function initializeChart() {
    const ctx = document.getElementById('foreclosureChart').getContext('2d');
    foreclosureChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal Remaining', 'Interest Saved'],
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
function updateChart(principalRemaining, interestSaved) {
    if (!foreclosureChart) {
        initializeChart();
    }
    
    foreclosureChart.data.datasets[0].data = [
        principalRemaining,
        interestSaved
    ];
    
    foreclosureChart.update();
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all slider and input elements
    const loanAmountSlider = document.getElementById('loanAmount');
    const loanAmountInput = document.getElementById('loanAmount-value');
    const interestRateSlider = document.getElementById('interestRate');
    const interestRateInput = document.getElementById('interestRate-value');
    const tenureSlider = document.getElementById('tenure');
    const tenureInput = document.getElementById('tenure-value');
    const installmentsPaidSlider = document.getElementById('installmentsPaid');
    const installmentsPaidInput = document.getElementById('installmentsPaid-value');
    const calculateBtn = document.querySelector('.calculate-btn');

    // Initialize sliders
    syncSliderInput(loanAmountSlider, loanAmountInput, 10000, 10000000, 1000, formatIndianCurrency);
    syncSliderInput(interestRateSlider, interestRateInput, 1, 30, 0.1, v => v);
    syncSliderInput(tenureSlider, tenureInput, 6, 240, 1, v => v);
    syncSliderInput(installmentsPaidSlider, installmentsPaidInput, 0, 240, 1, v => v);

    // Initialize slider backgrounds
    updateSliderUI(loanAmountSlider);
    updateSliderUI(interestRateSlider);
    updateSliderUI(tenureSlider);
    updateSliderUI(installmentsPaidSlider);

    // Dynamically update max for Installments Paid when Tenure changes
    function updateInstallmentsMax() {
        const tenureVal = parseInt(tenureSlider.value) || 6;
        installmentsPaidSlider.max = tenureVal;
        if (parseInt(installmentsPaidSlider.value) > tenureVal) {
            installmentsPaidSlider.value = tenureVal;
            installmentsPaidInput.value = tenureVal;
            updateSliderUI(installmentsPaidSlider);
        }
    }

    tenureSlider.addEventListener('input', updateInstallmentsMax);
    tenureInput.addEventListener('change', updateInstallmentsMax);
    updateInstallmentsMax();

    // Initialize chart
    initializeChart();

    // Calculate foreclosure amount and related values
    function calculateForeclosure() {
        const P = parseIndianNumber(loanAmountInput.value) || 0;
        const r = parseFloat(interestRateInput.value) || 0;
        const n = parseInt(tenureInput.value) || 0;
        const paid = parseInt(installmentsPaidInput.value) || 0;
        const results = document.querySelectorAll('.results-container .result-item span:last-child');
        
        if (P <= 0 || r <= 0 || n <= 0 || paid < 0 || paid >= n) {
            if (results.length >= 5) {
                for (let i = 0; i < 5; i++) results[i].textContent = '₹0';
            }
            updateChart(0, 0);
            return;
        }

        // Monthly interest rate
        const monthlyRate = r / 12 / 100;

        // Calculate EMI
        const emi = P * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);

        // Calculate total interest and closing balance for each month
        let totalInterestPaid = 0;
        let closingBalance = P;
        let monthlyInterest = 0;
        let monthlyPrincipal = 0;

        for (let i = 1; i <= paid; i++) {
            monthlyInterest = closingBalance * monthlyRate;
            monthlyPrincipal = emi - monthlyInterest;
            totalInterestPaid += monthlyInterest;
            closingBalance -= monthlyPrincipal;
        }

        // Calculate total interest if no foreclosure
        let totalInterestNoForeclosure = 0;
        let tempBalance = P;
        for (let i = 1; i <= n; i++) {
            monthlyInterest = tempBalance * monthlyRate;
            monthlyPrincipal = emi - monthlyInterest;
            totalInterestNoForeclosure += monthlyInterest;
            tempBalance -= monthlyPrincipal;
        }

        // Calculate interest saved
        const interestSaved = totalInterestNoForeclosure - totalInterestPaid;

        // Update results
        if (results.length >= 5) {
            results[0].textContent = formatINR(Math.round(closingBalance)); // Foreclosure Amount
            results[1].textContent = formatINR(Math.round(emi)); // Monthly EMI
            results[2].textContent = formatINR(Math.round(totalInterestPaid)); // Interest Paid
            results[3].textContent = formatINR(Math.round(interestSaved)); // Interest Saved
            results[4].textContent = formatINR(Math.round(totalInterestNoForeclosure)); // Total Interest before Foreclosure
        }

        // Update chart
        updateChart(
            Math.round(closingBalance),
            Math.round(interestSaved)
        );
    }

    // Add click event listener to calculate button
    calculateBtn.addEventListener('click', calculateForeclosure);

    // Initialize FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggleIcon = this.querySelector('.toggle-icon');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer) {
                    item.style.display = 'none';
                    item.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
                }
            });
            
            // Toggle current answer
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
                toggleIcon.textContent = '−';
            } else {
                answer.style.display = 'none';
                toggleIcon.textContent = '+';
            }
        });
    });
}); 