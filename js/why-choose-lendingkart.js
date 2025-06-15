function calculateRate() {
    // Get input values
    const monthlySales = parseFloat(document.getElementById('monthlySales').value) || 0;
    const businessAge = parseInt(document.getElementById('businessAge').value) || 0;
    const creditScore = parseInt(document.getElementById('creditScore').value) || 0;

    // Calculate base rate based on monthly sales
    let baseRate = 17.5; // Default rate
    if (monthlySales >= 500000) {
        baseRate = 13.5;
    } else if (monthlySales >= 250000) {
        baseRate = 15.5;
    }

    // Calculate business history benefit
    let historyBenefit = 0;
    if (businessAge >= 3) {
        historyBenefit = 0.5;
    } else if (businessAge >= 2) {
        historyBenefit = 0.3;
    } else if (businessAge >= 1) {
        historyBenefit = 0.2;
    }

    // Calculate credit score benefit
    let creditBenefit = 0;
    if (creditScore >= 750) {
        creditBenefit = 0.4;
    } else if (creditScore >= 700) {
        creditBenefit = 0.2;
    }

    // Calculate final rate
    const finalRate = ((baseRate - historyBenefit - creditBenefit) / 12).toFixed(2);

    // Update the result display
    document.getElementById('baseRate').textContent = baseRate + '%';
    document.getElementById('historyBenefit').textContent = historyBenefit + '%';
    document.getElementById('creditBenefit').textContent = creditBenefit + '%';
    document.getElementById('finalRate').textContent = finalRate + '%';

    // Show the result section
    document.getElementById('rateResult').style.display = 'block';
} 