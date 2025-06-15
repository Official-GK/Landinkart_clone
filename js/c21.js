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

    // Sync slider and value box
    amountSlider.addEventListener('input', function() {
        amountValueBox.textContent = formatINR(this.value);
        updateSliderUI(amountSlider, this.value, Number(amountSlider.min), Number(amountSlider.max));
    });

    // Colored track fill for slider
    function updateSliderUI(slider, value, min, max) {
        const percent = ((value - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #12a9c0 0%, #12a9c0 ${percent}%, #e0e0e0 ${percent}%, #e0e0e0 100%)`;
    }
    // Initial UI
    updateSliderUI(amountSlider, amountSlider.value, Number(amountSlider.min), Number(amountSlider.max));

    // GST Calculation logic
    calculateBtn.addEventListener('click', function() {
        // Get amount
        const amount = Number(amountSlider.value);
        // Get GST rate
        let gstRate = 0;
        for (const radio of gstRateRadios) {
            if (radio.checked) {
                gstRate = parseFloat(radio.value);
                break;
            }
        }
        if (!gstRate) gstRate = 18; // default
        // Get GST type
        const isExclusive = gstTypeExclusive && gstTypeExclusive.checked;
        const isInclusive = gstTypeInclusive && gstTypeInclusive.checked;
        // Calculate
        let gstAmount = 0, totalAmount = 0, baseAmount = 0;
        if (isExclusive) {
            gstAmount = amount * gstRate / 100;
            totalAmount = amount + gstAmount;
            baseAmount = amount;
        } else if (isInclusive) {
            baseAmount = amount / (1 + gstRate / 100);
            gstAmount = amount - baseAmount;
            totalAmount = amount;
        } else {
            // Default to exclusive
            gstAmount = amount * gstRate / 100;
            totalAmount = amount + gstAmount;
            baseAmount = amount;
        }
        // Display results in the result-section
        document.getElementById('gst-amount').textContent = formatINR(Math.round(gstAmount));
        document.getElementById('total-amount').textContent = formatINR(Math.round(totalAmount));
    });
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