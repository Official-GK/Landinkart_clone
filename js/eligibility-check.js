// Function to check eligibility
function checkEligibility() {
    // Get form values
    const firstName = document.querySelector('.eligibility-form input[type="text"]').value;
    const lastName = document.querySelectorAll('.eligibility-form input[type="text"]')[1].value;
    const email = document.querySelector('.eligibility-form input[type="email"]').value;
    const mobile = document.querySelector('.eligibility-form input[type="tel"]').value;
    const businessProof = document.querySelector('.eligibility-form select').value;
    const monthlySales = document.querySelectorAll('.eligibility-form input[type="text"]')[2].value;
    const businessAge = document.querySelectorAll('.eligibility-form select')[1].value;

    // Validate required fields
    if (!firstName || !lastName || !email || !mobile || !businessProof || !monthlySales || !businessAge) {
        Swal.fire({
            title: 'Required Fields Missing',
            text: 'Please fill in all the required fields',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#023347'
        });
        return;
    }

    // Convert monthly sales to number
    const monthlySalesNum = parseInt(monthlySales.replace(/[^0-9]/g, ''));

    // Eligibility criteria
    const isEligible = 
        businessProof === 'yes' && // Must have business registration
        monthlySalesNum >= 100000 && // Monthly sales should be at least 1 lakh
        (businessAge === '1-3' || businessAge === '3-5' || businessAge === '5+'); // Business should be at least 1 year old

    // Show SweetAlert based on eligibility
    if (isEligible) {
        // Calculate interest rate based on business health
        let baseInterestRate;
        if (monthlySalesNum >= 500000) {
            baseInterestRate = 13.5; // Best rate for healthy business
        } else if (monthlySalesNum >= 250000) {
            baseInterestRate = 15.5; // Medium rate
        } else {
            baseInterestRate = 17.5; // Standard rate
        }

        // Define packages
        const packages = [
            {
                name: "Starter Business",
                loanRange: "₹0 - ₹50,000",
                monthlyRate: `${(baseInterestRate/12).toFixed(2)}%`,
                perks: [
                    "Basic Documentation",
                    "Quick Processing",
                    "Monthly Repayment",
                    "Email Support"
                ]
            },
            {
                name: "Growth Business",
                loanRange: "₹50,000 - ₹2 Lakhs",
                monthlyRate: `${((baseInterestRate-1)/12).toFixed(2)}%`,
                perks: [
                    "50% Off on Processing Fee",
                    "Quick Approval",
                    "Flexible Repayment Options",
                    "Dedicated Relationship Manager",
                    "Business Advisory"
                ]
            },
            {
                name: "Premium Business",
                loanRange: "₹2 Lakhs - ₹50 Lakhs",
                monthlyRate: `${((baseInterestRate-2)/12).toFixed(2)}%`,
                perks: [
                    "Zero Processing Fee",
                    "Instant Approval",
                    "Customized Repayment Plans",
                    "Priority Customer Support",
                    "Free Business Advisory Services",
                    "Premium Banking Benefits"
                ]
            }
        ];

        Swal.fire({
            title: 'Congratulations! 🎉',
            text: 'You are eligible for our business loans!',
            icon: 'success',
            html: `
                <div style="text-align: left; padding: 20px;">
                    <p style="margin-bottom: 20px; color: #023347; font-weight: 600;">Based on your business health, here are your available packages:</p>
                    
                    <div style="display: flex; gap: 15px; justify-content: space-between;">
                        ${packages.map((pkg, index) => `
                            <div style="flex: 1; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px; background: ${index === 2 ? '#f8f9fa' : 'white'}; min-width: 250px;">
                                <h3 style="color: #023347; margin-bottom: 10px; font-size: 1.2em;">${pkg.name}</h3>
                                <div style="margin-bottom: 10px;">
                                    <p><strong>Loan Range:</strong> ${pkg.loanRange}</p>
                                    <p><strong>Monthly Interest Rate:</strong> ${pkg.monthlyRate}</p>
                                </div>
                                <div>
                                    <p style="color: #023347; font-weight: 600; margin-bottom: 5px;">Package Perks:</p>
                                    <ul style="list-style-type: none; padding-left: 0;">
                                        ${pkg.perks.map(perk => `<li style="margin: 5px 0; font-size: 0.9em;">✓ ${perk}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `,
            width: '80%',
            confirmButtonText: 'Proceed to Apply',
            confirmButtonColor: '#023347',
            showCancelButton: true,
            cancelButtonText: 'Learn More'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'apply.html';
            }
        });
    } else {
        Swal.fire({
            title: 'Not Eligible Yet 😔',
            text: 'Based on the information provided, you are not eligible for a business loan at this time. Please check our eligibility criteria and try again later.',
            icon: 'warning',
            confirmButtonText: 'Understand',
            confirmButtonColor: '#023347',
            showCancelButton: true,
            cancelButtonText: 'View Criteria'
        }).then((result) => {
            if (result.isConfirmed) {
                // Do nothing, just close the alert
            } else {
                // Show eligibility criteria
                Swal.fire({
                    title: 'Eligibility Criteria',
                    html: `
                        <div style="text-align: left; padding: 20px;">
                            <p><strong>To be eligible for a business loan, you need:</strong></p>
                            <ul>
                                <li>Valid business registration proof</li>
                                <li>Monthly sales of at least ₹1,00,000</li>
                                <li>Business age of at least 1 year</li>
                            </ul>
                        </div>
                    `,
                    confirmButtonText: 'Got it',
                    confirmButtonColor: '#023347'
                });
            }
        });
    }
}

// Add event listener to the check eligibility button
document.addEventListener('DOMContentLoaded', function() {
    const checkEligibilityBtn = document.querySelector('.check-eligibility-btn');
    if (checkEligibilityBtn) {
        checkEligibilityBtn.addEventListener('click', checkEligibility);
    }
}); 