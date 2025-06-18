document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const amountSlider = document.getElementById('amount');
    const amountValueBox = document.getElementById('amount-value-box');
    const minLabel = document.getElementById('amount-min-label');
    const maxLabel = document.getElementById('amount-max-label');
    const gstRateRadios = document.getElementsByName('gstRate');
    const gstTypeExclusive = document.getElementById('exclusive');
    const gstTypeInclusive = document.getElementById('inclusive');
    const calculateBtn = document.querySelector('.calculate-btn');
    // Results section (add your result element selectors here)
    // Example: const resultAmount = document.getElementById('result-amount');

    // Format number with Indian commas and rupee
    function formatINR(num) {
        return '₹' + Number(num).toLocaleString('en-IN');
    }
    function parseIndianNumber(str) {
        return parseFloat(str.replace(/,/g, ''));
    }

    // Set min/max labels
    minLabel.textContent = formatINR(amountSlider.min);
    maxLabel.textContent = formatINR(amountSlider.max);

    // Set initial value box value on page load
    amountValueBox.textContent = formatINR(amountSlider.value);

    // Update slider background
    function updateSliderBackground(slider) {
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        const value = parseFloat(slider.value);
        const percentage = ((value - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #12a9c0 0%, #12a9c0 ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
    }

    // Initialize slider background
    updateSliderBackground(amountSlider);

    // Sync slider and value box
    amountSlider.addEventListener('input', function() {
        amountValueBox.textContent = formatINR(this.value);
        updateSliderBackground(this);
    });

    // Chart initialization
    let gstChart = null;

    function initializeChart() {
        const ctx = document.getElementById('gstChart').getContext('2d');
        gstChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Base Amount', 'GST Amount'],
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
    function updateChart(baseAmount, gstAmount) {
        if (!gstChart) {
            initializeChart();
        }
        
        gstChart.data.datasets[0].data = [
            baseAmount,
            gstAmount
        ];
        
        gstChart.update();
    }

    // Calculate GST
    function calculateGST() {
        const amount = parseFloat(amountSlider.value) || 0;
        const gstRate = parseFloat(gstRateRadios[0].value) || 0;
        const isExclusive = gstTypeExclusive && gstTypeExclusive.checked;
        
        let baseAmount, gstAmount, totalAmount;
        
        if (isExclusive) {
            baseAmount = amount;
            gstAmount = (amount * gstRate) / 100;
            totalAmount = baseAmount + gstAmount;
        } else {
            totalAmount = amount;
            baseAmount = (amount * 100) / (100 + gstRate);
            gstAmount = totalAmount - baseAmount;
        }
        
        // Update result values
        document.getElementById('gst-amount').textContent = formatINR(Math.round(gstAmount));
        document.getElementById('total-amount').textContent = formatINR(Math.round(totalAmount));
        
        // Update chart
        updateChart(
            Math.round(baseAmount),
            Math.round(gstAmount)
        );
    }

    // Initialize calculator when DOM is loaded
    initializeChart();
    
    // Add event listeners
    amountSlider.addEventListener('input', calculateGST);
    
    gstRateRadios.forEach(radio => {
        radio.addEventListener('change', calculateGST);
    });
    
    gstTypeExclusive.addEventListener('change', calculateGST);
    gstTypeInclusive.addEventListener('change', calculateGST);
    
    // Initial calculation
    calculateGST();
});

document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
            header.querySelector('span').textContent = '+';
        } else {
            content.style.display = 'block';
            header.querySelector('span').textContent = '-';
        }
    });
});

// Ensure the slider track fills with blue up to the thumb
function updateAmountSliderFill() {
    var slider = document.getElementById('amount');
    var min = Number(slider.min);
    var max = Number(slider.max);
    var value = Number(slider.value);
    var percent = ((value - min) / (max - min)) * 100;
    slider.style.background = 'linear-gradient(to right, #12a9c0 0%, #12a9c0 ' + percent + '%, #ececec ' + percent + '%, #ececec 100%)';
}
var amountSlider = document.getElementById('amount');
if (amountSlider) {
    updateAmountSliderFill();
    amountSlider.addEventListener('input', updateAmountSliderFill);
}