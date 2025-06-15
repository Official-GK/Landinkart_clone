// c41.js: Loan Foreclosure Calculator logic

document.addEventListener('DOMContentLoaded', function() {
  console.log('c41.js loaded and DOM ready');
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

  // Utility: format number as Indian currency
  function formatINR(num) {
    return 'Rs. ' + Number(num).toLocaleString('en-IN');
  }

  // Utility: format number with commas
  function formatIndianNumber(num) {
    return Number(num).toLocaleString('en-IN');
  }

  // Utility: parse Indian formatted number
  function parseIndianNumber(str) {
    return parseInt(str.replace(/,/g, ''));
  }

  // Sync slider and input for each field
  function syncSliderInput(slider, input, min, max, step, formatFn) {
    slider.addEventListener('input', function() {
      input.value = formatFn(this.value);
    });
    input.addEventListener('change', function() {
      let val = parseIndianNumber(this.value);
      if (isNaN(val)) val = min;
      val = Math.max(min, Math.min(max, val));
      slider.value = val;
      input.value = formatFn(val);
    });
  }

  syncSliderInput(loanAmountSlider, loanAmountInput, 10000, 10000000, 1000, formatIndianNumber);
  syncSliderInput(interestRateSlider, interestRateInput, 1, 30, 0.1, v => v);
  syncSliderInput(tenureSlider, tenureInput, 6, 240, 1, v => v);
  syncSliderInput(installmentsPaidSlider, installmentsPaidInput, 0, 240, 1, v => v);

  // Slider UI improvement: colored track fill
  function updateSliderUI(slider, value, min, max) {
    const percent = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #12a1c0 0%, #12a1c0 ${percent}%, #e0e0e0 ${percent}%, #e0e0e0 100%)`;
  }

  // Initial slider UI
  updateSliderUI(loanAmountSlider, loanAmountSlider.value, Number(loanAmountSlider.min), Number(loanAmountSlider.max));
  updateSliderUI(interestRateSlider, interestRateSlider.value, Number(interestRateSlider.min), Number(interestRateSlider.max));
  updateSliderUI(tenureSlider, tenureSlider.value, Number(tenureSlider.min), Number(tenureSlider.max));
  updateSliderUI(installmentsPaidSlider, installmentsPaidSlider.value, Number(installmentsPaidSlider.min), Number(installmentsPaidSlider.max));

  // Update on input
  loanAmountSlider.addEventListener('input', function() {
    updateSliderUI(loanAmountSlider, this.value, Number(this.min), Number(this.max));
  });
  interestRateSlider.addEventListener('input', function() {
    updateSliderUI(interestRateSlider, this.value, Number(this.min), Number(this.max));
  });
  tenureSlider.addEventListener('input', function() {
    updateSliderUI(tenureSlider, this.value, Number(this.min), Number(this.max));
  });
  installmentsPaidSlider.addEventListener('input', function() {
    updateSliderUI(installmentsPaidSlider, this.value, Number(this.min), Number(this.max));
  });

  // Dynamically update max for Installments Paid when Tenure changes
  function updateInstallmentsMax() {
    const tenureVal = parseInt(tenureSlider.value) || 6;
    installmentsPaidSlider.max = tenureVal;
    if (parseInt(installmentsPaidSlider.value) > tenureVal) {
      installmentsPaidSlider.value = tenureVal;
      installmentsPaidInput.value = tenureVal;
    }
  }
  tenureSlider.addEventListener('input', updateInstallmentsMax);
  tenureInput.addEventListener('change', updateInstallmentsMax);
  // Also call on load
  updateInstallmentsMax();

  // Foreclosure calculation logic (updated to match reference)
  function calculateForeclosure() {
    const P = parseIndianNumber(loanAmountInput.value) || 0;
    const r = parseFloat(interestRateInput.value) || 0;
    const n = parseInt(tenureInput.value) || 0;
    const paid = parseInt(installmentsPaidInput.value) || 0;
    const results = document.querySelectorAll('.results-container .result-item span:last-child');
    
    if (P <= 0 || r <= 0 || n <= 0 || paid < 0 || paid >= n) {
      if (results.length >= 5) {
        for (let i = 0; i < 5; i++) results[i].textContent = 'Rs. 0';
      }
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
  }

  // Only update results on Calculate button click
  calculateBtn.addEventListener('click', calculateForeclosure);
}); 