document.addEventListener('DOMContentLoaded', function() {
  // Get all slider and input elements
  const principalSlider = document.getElementById('principal');
  const principalInput = document.getElementById('principal-value');
  const tenureSlider = document.getElementById('tenure');
  const tenureInput = document.getElementById('tenure-value');
  const rateSlider = document.getElementById('rate');
  const rateInput = document.getElementById('rate-value');
  const calculateBtn = document.querySelector('.calculate-btn');
  const frequencyOptions = document.querySelectorAll('input[name="frequency"]');
  
  // Result elements
  const investedAmountEl = document.querySelector('.results .result-box:nth-child(1) p');
  const wealthGainsEl = document.querySelector('.results .result-box:nth-child(2) p');
  const maturityAmountEl = document.querySelector('.results .result-box:nth-child(3) p');

  // Hide results and chart by default
  const resultsSection = document.querySelector('.results');
  const chartContainer = document.querySelector('.chart-container');
  resultsSection.classList.add('hidden');
  chartContainer.classList.add('hidden');

  // Format number with Indian comma separators
  function formatIndianNumber(num) {
      return num.toLocaleString('en-IN');
  }

  // Parse Indian formatted number back to integer
  function parseIndianNumber(str) {
      return parseInt(str.replace(/,/g, ''));
  }

  // Update principal value when slider changes
  principalSlider.addEventListener('input', function() {
      const value = parseInt(this.value);
      principalInput.value = formatIndianNumber(value);
      updateSliderUI(principalSlider, this.value, 100000, 20000000);
  });

  // Update principal slider when input changes
  principalInput.addEventListener('change', function() {
      let value = parseIndianNumber(this.value);
      if (isNaN(value)) value = 100000;
      value = Math.max(100000, Math.min(20000000, value));
      principalSlider.value = value;
      principalInput.value = formatIndianNumber(value);
      updateSliderUI(principalSlider, value, 100000, 20000000);
  });

  // Update tenure value when slider changes
  tenureSlider.addEventListener('input', function() {
      const value = parseInt(this.value);
      tenureInput.value = value;
      updateSliderUI(tenureSlider, this.value, 6, 36);
  });

  // Update tenure slider when input changes
  tenureInput.addEventListener('change', function() {
      let value = parseInt(this.value);
      if (isNaN(value)) value = 6;
      value = Math.max(6, Math.min(36, value));
      tenureSlider.value = value;
      tenureInput.value = value;
      updateSliderUI(tenureSlider, value, 6, 36);
  });

  // Update rate value when slider changes
  rateSlider.addEventListener('input', function() {
      const value = parseFloat(this.value).toFixed(1);
      rateInput.value = value;
      updateSliderUI(rateSlider, this.value, 13.5, 35);
  });

  // Update rate slider when input changes
  rateInput.addEventListener('change', function() {
      let value = parseFloat(this.value);
      if (isNaN(value)) value = 13.5;
      value = Math.max(13.5, Math.min(35, value));
      rateSlider.value = value;
      rateInput.value = value.toFixed(1);
      updateSliderUI(rateSlider, value, 13.5, 35);
  });

  // Get selected compounding frequency
  function getFrequency() {
      for (const option of frequencyOptions) {
          if (option.checked) {
              return option.id; // returns 'monthly', 'quarterly', etc.
          }
      }
      return 'monthly'; // default
  }

  // Show results and chart only after Calculate is clicked
  calculateBtn.addEventListener('click', function() {
    resultsSection.classList.remove('hidden');
    chartContainer.classList.remove('hidden');
    calculateFD();
  });

  // Render a simple bar chart after calculation
  function renderChart(principal, interest, maturity) {
    chartContainer.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: flex-end; height: 180px; gap: 40px;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 60px; height: 120px; background: #294e9b; border-radius: 12px 12px 0 0; margin-bottom: 8px;"></div>
          <div style="font-size: 15px; color: #294e9b; font-weight: 600;">Principal</div>
          <div style="font-size: 14px; color: #294e9b;">Rs. ${principal.toLocaleString('en-IN')}</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 60px; height: 60px; background: #12a1c0; border-radius: 12px 12px 0 0; margin-bottom: 8px;"></div>
          <div style="font-size: 15px; color: #12a1c0; font-weight: 600;">Interest</div>
          <div style="font-size: 14px; color: #12a1c0;">Rs. ${interest.toLocaleString('en-IN')}</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 60px; height: 140px; background: #2a8e9e; border-radius: 12px 12px 0 0; margin-bottom: 8px;"></div>
          <div style="font-size: 15px; color: #2a8e9e; font-weight: 600;">Maturity</div>
          <div style="font-size: 14px; color: #2a8e9e;">Rs. ${maturity.toLocaleString('en-IN')}</div>
        </div>
      </div>
    `;
  }

  // Update calculateFD to call renderChart
  function calculateFD() {
    const principal = parseInt(principalSlider.value);
    const tenureMonths = parseInt(tenureSlider.value);
    const rate = parseFloat(rateSlider.value);
    const frequency = getFrequency();
    let tenureYears = tenureMonths / 12;
    let compoundsPerYear;
    switch(frequency) {
      case 'monthly': compoundsPerYear = 12; break;
      case 'quarterly': compoundsPerYear = 4; break;
      case 'half-yearly': compoundsPerYear = 2; break;
      case 'yearly': compoundsPerYear = 1; break;
      default: compoundsPerYear = 12;
    }
    const totalPeriods = compoundsPerYear * tenureYears;
    const ratePerPeriod = rate / compoundsPerYear;
    const maturityAmount = principal * Math.pow(1 + (ratePerPeriod / 100), totalPeriods);
    const interestEarned = maturityAmount - principal;
    investedAmountEl.textContent = `Rs. ${formatIndianNumber(principal)}`;
    wealthGainsEl.textContent = `Rs. ${formatIndianNumber(Math.round(interestEarned))}`;
    maturityAmountEl.textContent = `Rs. ${formatIndianNumber(Math.round(maturityAmount))}`;
    renderChart(principal, Math.round(interestEarned), Math.round(maturityAmount));
  }

  // Slider UI improvement: colored track fill and value bubble
  function updateSliderUI(slider, value, min, max) {
    const percent = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #12a1c0 0%, #12a1c0 ${percent}%, #e0e0e0 ${percent}%, #e0e0e0 100%)`;
  }
  // Initial slider UI
  updateSliderUI(principalSlider, principalSlider.value, 100000, 20000000);
  updateSliderUI(tenureSlider, tenureSlider.value, 6, 36);
  updateSliderUI(rateSlider, rateSlider.value, 13.5, 35);
  // Update on input
  principalSlider.addEventListener('input', function() {
    updateSliderUI(principalSlider, this.value, 100000, 20000000);
  });
  tenureSlider.addEventListener('input', function() {
    updateSliderUI(tenureSlider, this.value, 6, 36);
  });
  rateSlider.addEventListener('input', function() {
    updateSliderUI(rateSlider, this.value, 13.5, 35);
  });
});

// Chart initialization
let fdChart = null;

function initializeChart() {
    const ctx = document.getElementById('fdChart').getContext('2d');
    fdChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal Amount', 'Interest Earned'],
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
    if (!fdChart) {
        initializeChart();
    }
    
    fdChart.data.datasets[0].data = [
        principal,
        interest
    ];
    
    fdChart.update();
}

// Format currency in Indian format
function formatINR(num) {
    return '₹' + Number(num).toLocaleString('en-IN');
}

// Format number to Indian currency format
function formatIndianCurrency(number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

// Get DOM elements
const principalSlider = document.getElementById('principal');
const tenureSlider = document.getElementById('tenure');
const rateSlider = document.getElementById('rate');
const principalValue = document.getElementById('principal-value');
const tenureValue = document.getElementById('tenure-value');
const rateValue = document.getElementById('rate-value');
const investedAmount = document.getElementById('investedAmount');
const wealthGains = document.getElementById('wealthGains');
const maturityAmount = document.getElementById('maturityAmount');
const resultsContainer = document.querySelector('.results');
const chartContainer = document.querySelector('.chart-container');

function calculateFD(P, N, R, frequency) {
    const r = R / 100; // annual interest rate
    let n = N / 12; // convert months to years
    
    // Adjust for compounding frequency
    switch(frequency) {
        case 'monthly':
            n *= 12;
            r /= 12;
            break;
        case 'quarterly':
            n *= 4;
            r /= 4;
            break;
        case 'half-yearly':
            n *= 2;
            r /= 2;
            break;
        // yearly is default
    }
    
    const A = P * Math.pow(1 + r, n);
    const interest = A - P;
    
    return {
        maturity: A,
        interest: interest
    };
}

function updateSliderBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #12a9c0 0%, #12a9c0 ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
}

function updateSliderValue(slider, valueDisplay, isPercentage = false) {
    const value = parseFloat(slider.value);
    valueDisplay.value = isPercentage ? `${value.toFixed(1)}` : formatIndianCurrency(value);
    updateSliderBackground(slider);
}

function updateResults() {
    const P = parseInt(principalSlider.value);
    const N = parseInt(tenureSlider.value);
    const R = parseFloat(rateSlider.value);
    const frequency = document.querySelector('input[name="frequency"]:checked').id;
    
    const result = calculateFD(P, N, R, frequency);
    
    // Update result displays
    investedAmount.textContent = formatINR(P);
    wealthGains.textContent = formatINR(Math.round(result.interest));
    maturityAmount.textContent = formatINR(Math.round(result.maturity));
    
    // Show results and chart
    resultsContainer.classList.remove('hidden');
    chartContainer.classList.remove('hidden');
    
    // Update chart
    updateChart(
        Math.round(P),
        Math.round(result.interest)
    );
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chart
    initializeChart();
    
    // Initialize slider backgrounds
    updateSliderBackground(principalSlider);
    updateSliderBackground(tenureSlider);
    updateSliderBackground(rateSlider);
    
    // Add event listeners for sliders
    principalSlider.addEventListener('input', () => {
        updateSliderValue(principalSlider, principalValue);
        updateResults();
    });
    
    tenureSlider.addEventListener('input', () => {
        updateSliderValue(tenureSlider, tenureValue);
        updateResults();
    });
    
    rateSlider.addEventListener('input', () => {
        updateSliderValue(rateSlider, rateValue, true);
        updateResults();
    });
    
    // Add event listeners for frequency options
    document.querySelectorAll('input[name="frequency"]').forEach(radio => {
        radio.addEventListener('change', updateResults);
    });
    
    // Add event listener for calculate button
    document.querySelector('.calculate-btn').addEventListener('click', updateResults);
    
    // Initial calculation
    updateResults();
});