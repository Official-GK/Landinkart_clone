// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabSections = document.querySelectorAll('.tab-section');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and sections
      navButtons.forEach(btn => btn.classList.remove('active'));
      tabSections.forEach(section => section.classList.remove('active'));

      // Add active class to clicked button and corresponding section
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Payment Methods Selection
  const paymentMethodBtns = document.querySelectorAll('.payment-method-btn');
  paymentMethodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paymentMethodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Analytics Period Selection
  const periodBtns = document.querySelectorAll('.period-btn');
  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      periodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Here you would typically update the charts based on the selected period
      updateCharts(btn.textContent);
    });
  });

  // Analytics Section Tab Switching
  const analyticsTabBtns = document.querySelectorAll('.analytics-tabs .tab-btn');
  const analyticsTabContents = document.querySelectorAll('.analytics-tabs .tab-content');

  analyticsTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active from all
      analyticsTabBtns.forEach(b => b.classList.remove('active'));
      analyticsTabContents.forEach(tc => tc.classList.remove('active'));
      // Add active to clicked
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      document.getElementById('tab-' + tab).classList.add('active');
    });
  });

  // Document Upload Button
  const uploadBtn = document.querySelector('.upload-btn');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
      // Create a hidden file input
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.pdf,.doc,.docx,.xls,.xlsx';
      fileInput.style.display = 'none';
      
      // Trigger file selection when upload button is clicked
      document.body.appendChild(fileInput);
      fileInput.click();
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          // Here you would typically handle the file upload
          console.log('Selected file:', file.name);
          // Implement file upload logic here
        }
        document.body.removeChild(fileInput);
      });
    });
  }

  // Make Payment Button
  const makePaymentBtn = document.querySelector('.make-payment-btn');
  if (makePaymentBtn) {
    makePaymentBtn.addEventListener('click', () => {
      // Here you would typically show a payment modal or redirect to payment page
      console.log('Initiating payment...');
      // Implement payment flow here
    });
  }

  // Receipt Buttons
  const receiptBtns = document.querySelectorAll('.receipt-btn');
  receiptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Here you would typically download or show the receipt
      console.log('Downloading receipt...');
      // Implement receipt download logic here
    });
  });

  // Document View/Download Buttons
  const viewDocBtns = document.querySelectorAll('.view-doc-btn');
  const downloadDocBtns = document.querySelectorAll('.download-doc-btn');

  viewDocBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Here you would typically show a document preview
      console.log('Viewing document...');
      // Implement document preview logic here
    });
  });

  downloadDocBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Here you would typically download the document
      console.log('Downloading document...');
      // Implement document download logic here
    });
  });

  // Filter functionality for payment history
  const filterSelect = document.querySelector('.filter-select');
  const monthPicker = document.querySelector('.month-picker');

  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      // Here you would typically filter the transactions table
      console.log('Filter changed:', filterSelect.value);
      // Implement filtering logic here
    });
  }

  if (monthPicker) {
    monthPicker.addEventListener('change', () => {
      // Here you would typically filter the transactions by month
      console.log('Month changed:', monthPicker.value);
      // Implement month filtering logic here
    });
  }

  // Load applications when dashboard loads
  loadApplications();

  // Function to handle new application button
  const newApplicationBtn = document.querySelector('.new-application-btn');
  if (newApplicationBtn) {
    newApplicationBtn.addEventListener('click', function() {
      window.location.href = 'new-application.html';
    });
  }

  // Logout functionality
  const logoutButton = document.querySelector('.logout');
  
  if (logoutButton) {
    logoutButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Show confirmation dialog
      if (confirm('Are you sure you want to logout?')) {
        // Clear any stored session data
        localStorage.removeItem('userToken');
        sessionStorage.removeItem('userData');
        
        // Clear any cookies
        document.cookie.split(";").forEach(function(c) { 
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
        
        // Redirect to landing page
        window.location.href = 'landingpage.html';
      }
    });
  }
});

// Placeholder function for updating charts
function updateCharts(period) {
  console.log('Updating charts for period:', period);
  // Here you would typically update the charts with new data
  // Implementation would depend on your charting library (e.g., Chart.js, D3.js)
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Document Upload Section Logic
const documentTypes = [
  { id: 'pan', label: 'PAN Card', icon: '📄', required: true },
  { id: 'aadhaar', label: 'Aadhaar Card', icon: '🆔', required: true },
  { id: 'gst', label: 'GST Certificate', icon: '📊', required: true },
  { id: 'bank_statement', label: 'Bank Statement (6 months)', icon: '🏦', required: true },
];

let documents = [
  {
    id: 'doc-001',
    type: 'pan',
    name: 'PAN_Card.pdf',
    status: 'verified',
    uploadedAt: '2024-01-10',
  },
  {
    id: 'doc-002',
    type: 'aadhaar',
    name: 'Aadhaar_Card.pdf',
    status: 'verified',
    uploadedAt: '2024-01-10',
  },
  {
    id: 'doc-003',
    type: 'gst',
    name: 'GST_Certificate.pdf',
    status: 'pending',
    aiSuggestions: ['Document image is slightly blurred', 'Consider uploading a clearer scan'],
    uploadedAt: '2024-01-11',
  },
  // Bank statement not uploaded yet
];

function getStatusBadge(status) {
  switch (status) {
    case 'verified':
      return '<span class="badge badge-verified">Verified</span>';
    case 'pending':
      return '<span class="badge badge-pending">Pending</span>';
    case 'rejected':
      return '<span class="badge badge-rejected">Rejected</span>';
    default:
      return '<span class="badge badge-required">Required</span>';
  }
}

function getStatusBanner(status) {
  if (status === 'verified') {
    return `<div class="status-banner verified"><span>✔️ Document verified successfully</span></div>`;
  }
  return '';
}

function getAISuggestions(aiSuggestions) {
  if (!aiSuggestions || aiSuggestions.length === 0) return '';
  return `
    <div class="ai-suggestions">
      <div class="ai-suggestions-title">AI Suggestions</div>
      <ul>
        ${aiSuggestions.map(s => `<li>${s}</li>`).join('')}
      </ul>
      <button class="reupload-btn">Re-upload</button>
    </div>
  `;
}

function renderDocumentCards() {
  const grid = document.getElementById('documentsGrid');
  grid.innerHTML = '';
  documentTypes.forEach(type => {
    const doc = documents.find(d => d.type === type.id);
    let card = document.createElement('div');
    card.className = 'document-card';
    card.innerHTML = `
      <div class="document-header">
        <div class="document-icon">${type.icon}</div>
        <div class="document-title">${type.label}</div>
        ${getStatusBadge(doc ? doc.status : null)}
      </div>
      <div class="document-upload">
        <div class="upload-icon">📤</div>
        ${doc ?
          `<div class="uploaded-file">
            <div>
              <div class="file-name">${doc.name}</div>
              <div class="file-date">Uploaded: ${doc.uploadedAt}</div>
            </div>
            <div class="file-actions">
              <button class="view-doc-btn" data-id="${doc.id}">👁️</button>
              <button class="delete-doc-btn" data-id="${doc.id}">❌</button>
            </div>
          </div>
          ${getAISuggestions(doc.aiSuggestions)}
          ${getStatusBanner(doc.status)}
          `
          :
          `<p>Drag and drop your ${type.label} here, or click to browse</p>
          <button class="upload-btn" data-type="${type.id}">Choose File</button>`
        }
      </div>
      <div class="document-info">
        <p>• Supported formats: JPG, PNG, PDF</p>
        <p>• Maximum file size: 5MB</p>
        <p>• AI will auto-enhance image quality</p>
      </div>
    `;
    grid.appendChild(card);
  });
  updateUploadSummary();
  addDocumentCardListeners();
}

function updateUploadSummary() {
  const uploadedCount = documentTypes.filter(type => documents.find(d => d.type === type.id)).length;
  document.getElementById('uploadCount').textContent = `${uploadedCount}/4`;
  document.getElementById('uploadProgressBar').style.width = `${(uploadedCount/4)*100}%`;
}

function addDocumentCardListeners() {
  // Upload
  document.querySelectorAll('.upload-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const type = this.getAttribute('data-type');
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.pdf,.jpg,.jpeg,.png';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);
      fileInput.click();
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          // Simulate upload
          setTimeout(() => {
            documents.push({
              id: 'doc-' + Date.now(),
              type,
              name: file.name,
              status: Math.random() > 0.5 ? 'verified' : 'pending',
              uploadedAt: new Date().toISOString().slice(0,10),
              aiSuggestions: Math.random() > 0.7 ? ['Document image is slightly blurred', 'Consider uploading a clearer scan'] : undefined
            });
            renderDocumentCards();
          }, 800);
        }
        document.body.removeChild(fileInput);
      });
    });
  });
  // Delete
  document.querySelectorAll('.delete-doc-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      documents = documents.filter(d => d.id !== id);
      renderDocumentCards();
    });
  });
  // Re-upload
  document.querySelectorAll('.reupload-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Simulate re-upload
      setTimeout(() => {
        // Find the doc and set status to pending
        const card = btn.closest('.document-card');
        const title = card.querySelector('.document-title').textContent;
        const type = documentTypes.find(t => t.label === title).id;
        documents = documents.map(d => d.type === type ? { ...d, status: 'pending', aiSuggestions: undefined } : d);
        renderDocumentCards();
      }, 500);
    });
  });
  // View (dummy)
  document.querySelectorAll('.view-doc-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      alert('Document preview not implemented in this demo.');
    });
  });
}

// Initial render
if (document.getElementById('documentsGrid')) {
  renderDocumentCards();
}

// Payments & Payment History Section Logic
const paymentSummaryData = [
  {
    label: 'Total Paid',
    value: 101564,
    icon: '✔️',
    class: 'success',
  },
  {
    label: 'Pending Payments',
    value: 44632,
    icon: '⏳',
    class: 'pending',
  },
  {
    label: 'This Month',
    value: 44632,
    icon: '📅',
    class: 'month',
  },
];

const paymentOptionsData = [
  {
    icon: '💳',
    title: 'Pay EMI',
    amount: 44632,
    details: ['Due Date: 15th February 2024', 'Status: Pending'],
    btnClass: 'pay-now-btn',
    btnText: 'Pay Now',
  },
  {
    icon: '📈',
    title: 'Request Top-Up',
    amount: 'Available Limit: ₹5,00,000',
    details: ['Interest Rate: 18% p.a.', 'Tenure: 12 months'],
    btnClass: 'request-btn',
    btnText: 'Request Now',
  },
];

const paymentHistoryData = [
  {
    id: 'pay-001',
    type: 'emi',
    amount: 44632,
    status: 'completed',
    date: '2024-01-15',
    method: 'Bank Transfer',
    reference: 'TXN123456789',
    description: 'EMI Payment - January 2024',
    icon: '📈',
  },
  {
    id: 'pay-002',
    type: 'processing_fee',
    amount: 11800,
    status: 'completed',
    date: '2023-08-15',
    method: 'UPI',
    reference: 'UPI987654321',
    description: 'Processing Fee + GST',
    icon: '💳',
  },
  {
    id: 'pay-003',
    type: 'emi',
    amount: 44632,
    status: 'completed',
    date: '2023-12-15',
    method: 'Net Banking',
    reference: 'NET456789123',
    description: 'EMI Payment - December 2023',
    icon: '📈',
  },
  {
    id: 'pay-004',
    type: 'late_fee',
    amount: 500,
    status: 'completed',
    date: '2023-11-20',
    method: 'Card',
    reference: 'CARD789123456',
    description: 'Late Payment Fee',
    icon: '⚠️',
  },
  {
    id: 'pay-005',
    type: 'emi',
    amount: 44632,
    status: 'pending',
    date: '2024-02-15',
    method: 'Bank Transfer',
    reference: 'PENDING001',
    description: 'EMI Payment - February 2024',
    icon: '📈',
  },
];

function renderPaymentSummary() {
  const grid = document.getElementById('paymentSummaryGrid');
  if (!grid) return;
  grid.innerHTML = paymentSummaryData.map(card => `
    <div class="summary-card">
      <div class="summary-card-content">
        <div>
          <div class="summary-label">${card.label}</div>
          <div class="summary-value">₹${card.value.toLocaleString()}</div>
        </div>
        <span class="summary-icon ${card.class}">${card.icon}</span>
      </div>
    </div>
  `).join('');
}

function renderPaymentOptions() {
  const container = document.getElementById('paymentOptions');
  if (!container) return;
  container.innerHTML = paymentOptionsData.map(opt => `
    <div class="payment-option">
      <div class="option-header">
        <span class="icon">${opt.icon}</span>
        <span class="title">${opt.title}</span>
      </div>
      <div class="option-amount">${typeof opt.amount === 'number' ? '₹' + opt.amount.toLocaleString() : opt.amount}</div>
      <div class="option-details">
        ${opt.details.map(d => `<p>${d}</p>`).join('')}
      </div>
      <button class="${opt.btnClass}">${opt.btnText}</button>
    </div>
  `).join('');
}

// Payment History Section
const historyFilterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
];
let currentHistoryFilter = 'all';
let currentHistorySearch = '';

function renderHistoryFilterTabs() {
  const tabs = document.getElementById('historyFilterTabs');
  if (!tabs) return;
  tabs.innerHTML = historyFilterTabs.map(tab => `
    <button class="filter-tab${tab.value === currentHistoryFilter ? ' active' : ''}" data-value="${tab.value}">${tab.label}</button>
  `).join('');
  tabs.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', function() {
      currentHistoryFilter = this.getAttribute('data-value');
      renderTransactionList();
      renderHistoryFilterTabs();
    });
  });
}

document.getElementById('transactionSearch')?.addEventListener('input', function(e) {
  currentHistorySearch = e.target.value;
  renderTransactionList();
});

function renderTransactionList() {
  const list = document.getElementById('transactionList');
  if (!list) return;
  let filtered = paymentHistoryData.filter(txn => {
    const matchesStatus = currentHistoryFilter === 'all' || txn.status === currentHistoryFilter;
    const matchesSearch =
      txn.description.toLowerCase().includes(currentHistorySearch.toLowerCase()) ||
      txn.reference.toLowerCase().includes(currentHistorySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  list.innerHTML = filtered.map(txn => `
    <div class="transaction-item">
      <div class="transaction-icon"><span class="icon">${txn.icon}</span></div>
      <div class="transaction-details">
        <div class="transaction-title">${txn.description}</div>
        <div class="transaction-info">
          <span>${formatDate(txn.date)}</span>
          <span>•</span>
          <span>${txn.method}</span>
          <span>•</span>
          <span>${txn.reference}</span>
        </div>
      </div>
      <div class="transaction-amount">
        <div class="amount">-₹${txn.amount.toLocaleString()}</div>
        <div class="status ${txn.status}">${capitalize(txn.status)}</div>
      </div>
      <button class="receipt-btn"><span class="icon">📄</span></button>
    </div>
  `).join('');
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initial render for Payments & History
if (document.getElementById('paymentSummaryGrid')) renderPaymentSummary();
if (document.getElementById('paymentOptions')) renderPaymentOptions();
if (document.getElementById('historyFilterTabs')) renderHistoryFilterTabs();
if (document.getElementById('transactionList')) renderTransactionList();

// Demo applications data

// Function to handle new application submission
function handleNewApplication(applicationData) {
    // Get existing applications
    const applicationsList = document.querySelector('.applications-list');
    if (!applicationsList) return;

    // Create new application card
    const newCard = document.createElement('div');
    newCard.className = 'application-card';
    newCard.innerHTML = `
        <div class="application-card-header">
            <div class="application-id">Application #${applicationData.applicationId}</div>
            <span class="application-status status-submitted">Submitted</span>
        </div>
        <div class="application-meta">
            <span>Amount: ₹${parseInt(applicationData.loanAmount).toLocaleString()}</span>
            <span>Applied: ${new Date(applicationData.applicationDate).toLocaleDateString()}</span>
            <span>Last Updated: ${new Date().toLocaleDateString()}</span>
        </div>
        <div class="application-progress">
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width:20%"></div>
            </div>
            <div class="progress-steps">
                <span class="step step-completed">Submitted</span>
                <span class="step">Verification</span>
                <span class="step">Approval</span>
                <span class="step">Disbursement</span>
            </div>
        </div>
        <div class="application-details-row">
            <div><span class="application-label">Business Name:</span> ${applicationData.businessName}</div>
            <div><span class="application-label">Purpose:</span> ${applicationData.loanPurpose.replace('_', ' ').toUpperCase()}</div>
            <div><span class="application-label">Documents:</span> 0 uploaded</div>
        </div>
        <div class="application-actions-row">
            <div></div>
            <div class="application-actions">
                <button class="view-details-btn">View Details</button>
            </div>
        </div>
    `;

    // Add new card at the beginning of the list
    applicationsList.insertBefore(newCard, applicationsList.firstChild);
}

// Function to load applications from localStorage
function loadApplications() {
    const applicationsList = document.querySelector('.applications-list');
    if (!applicationsList) return;

    // Get applications from localStorage
    const applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    
    // Clear existing applications
    applicationsList.innerHTML = '';
    
    // Add each application to the list
    applications.forEach(app => {
        const newCard = document.createElement('div');
        newCard.className = 'application-card';
        newCard.innerHTML = `
            <div class="application-card-header">
                <div class="application-id">Application #${app.applicationId}</div>
                <span class="application-status status-submitted">${app.status}</span>
            </div>
            <div class="application-meta">
                <span>Amount: ₹${parseInt(app.loanAmount).toLocaleString()}</span>
                <span>Applied: ${new Date(app.applicationDate).toLocaleDateString()}</span>
                <span>Last Updated: ${new Date().toLocaleDateString()}</span>
            </div>
            <div class="application-progress">
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width:20%"></div>
                </div>
                <div class="progress-steps">
                    <span class="step step-completed">Submitted</span>
                    <span class="step">Verification</span>
                    <span class="step">Approval</span>
                    <span class="step">Disbursement</span>
                </div>
            </div>
            <div class="application-details-row">
                <div><span class="application-label">Business Name:</span> ${app.businessName}</div>
                <div><span class="application-label">Purpose:</span> ${app.loanPurpose.replace('_', ' ').toUpperCase()}</div>
                <div><span class="application-label">Documents:</span> ${app.documents ? app.documents.length : 0} uploaded</div>
            </div>
            <div class="application-actions-row">
                <div></div>
                <div class="application-actions">
                    <button class="view-details-btn">View Details</button>
                </div>
            </div>
        `;
        applicationsList.appendChild(newCard);
    });
}

// Function to handle tab switching
function handleTabSwitch() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabSections = document.querySelectorAll('.tab-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            tabSections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // If applications tab is clicked, reload applications
            if (tabId === 'applications') {
                loadApplications();
            }
        });
    });
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle tab switching
    handleTabSwitch();

    // Handle new application button
    const newApplicationBtn = document.querySelector('.new-application-btn');
    if (newApplicationBtn) {
        newApplicationBtn.addEventListener('click', function() {
            window.location.href = 'new-application.html';
        });
    }

    // Load applications if on applications tab
    if (document.getElementById('applications').classList.contains('active')) {
        loadApplications();
    }
});