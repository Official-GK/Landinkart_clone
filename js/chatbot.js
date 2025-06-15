document.addEventListener('DOMContentLoaded', function() {
  // Floating Chatbot Logic
  const chatbotFab = document.getElementById('chatbot-fab');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessages = document.getElementById('chatbot-messages');

  if (chatbotFab && chatbotWindow) {
    // Set initial display style
    chatbotWindow.style.display = 'none';

    // Toggle chatbot window
    chatbotFab.addEventListener('click', () => {
      const isVisible = chatbotWindow.style.display === 'flex';
      chatbotWindow.style.display = isVisible ? 'none' : 'flex';
      
      if (!isVisible && chatbotMessages.children.length === 0) {
        // Add welcome message when opening
        addFloatingBotMessage('Hello! I\'m GK Bot. How can I help you today?');
      }
    });

    // Close chatbot window
    chatbotClose.addEventListener('click', () => {
      chatbotWindow.style.display = 'none';
    });

    // Handle send button click
    chatbotSend.addEventListener('click', handleFloatingSendMessage);

    // Handle enter key press
    chatbotInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleFloatingSendMessage();
      }
    });
  }

  function handleFloatingSendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
      addFloatingUserMessage(message);
      chatbotInput.value = '';
      generateFloatingBotReply(message);
    }
  }

  function addFloatingUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-bubble user';
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    scrollFloatingToBottom();
  }

  function addFloatingBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-bubble';
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    scrollFloatingToBottom();
  }

  function generateFloatingBotReply(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let reply = '';

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      reply = 'Hello! How can I assist you today?';
    } else if (lowerMessage.includes('apply') || lowerMessage.includes('loan')) {
      reply = 'You can apply for a loan right from your dashboard! Just click on "Apply for Loan" and I\'ll guide you through the process.';
    } else if (lowerMessage.includes('document')) {
      reply = 'For a quick loan approval, you\'ll need your business registration, bank statements, and ID proof. Don\'t worry, it\'s a simple process!';
    } else if (lowerMessage.includes('status')) {
      reply = 'Check your loan status in the "My Loans" section. If you need help finding it, just let me know!';
    } else if (lowerMessage.includes('contact')) {
      reply = 'Need to talk to someone? Our support team is available at support@lendingkart.com or call us at 1800-XXX-XXXX. We\'re here to help!';
    } else if (lowerMessage.includes('thank')) {
      reply = 'You\'re welcome! Is there anything else I can help you with?';
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      reply = 'Goodbye! Feel free to come back if you need any help. Have a great day!';
    } else {
      reply = 'I\'m here to help! You can ask me about loans, documents, or anything else you need. What would you like to know?';
    }

    // Simulate typing delay
    setTimeout(() => {
      addFloatingBotMessage(reply);
    }, 500);
  }

  function scrollFloatingToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Support Chat Logic
  const messagesContainer = document.getElementById('supportChatMessages');
  const suggestionsContainer = document.getElementById('supportChatSuggestions');
  const input = document.querySelector('.support-chat-input');
  const sendButton = document.querySelector('.support-chat-send');

  if (!messagesContainer || !input || !sendButton) return;

  // Initial suggestions
  const initialSuggestions = [
    'How do I apply for a loan?',
    'What documents do I need?',
    'How to check loan status?',
    'Contact support'
  ];

  // Add initial suggestions
  initialSuggestions.forEach(suggestion => {
    const chip = document.createElement('div');
    chip.className = 'suggestion-chip';
    chip.textContent = suggestion;
    chip.onclick = () => handleSuggestionClick(suggestion);
    suggestionsContainer.appendChild(chip);
  });

  // Add welcome message
  addBotMessage('Hello! I\'m GK Bot. How can I help you today?');

  // Handle send button click
  sendButton.addEventListener('click', handleSendMessage);

  // Handle enter key press
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });

  function handleSendMessage() {
    const message = input.value.trim();
    if (message) {
      addUserMessage(message);
      input.value = '';
      generateBotReply(message);
    }
  }

  function handleSuggestionClick(suggestion) {
    addUserMessage(suggestion);
    generateBotReply(suggestion);
  }

  function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
  }

  function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
  }

  function generateBotReply(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let reply = '';

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      reply = 'Hello! How can I assist you today?';
    } else if (lowerMessage.includes('apply') || lowerMessage.includes('loan')) {
      reply = 'You can apply for a loan right from your dashboard! Just click on "Apply for Loan" and I\'ll guide you through the process.';
    } else if (lowerMessage.includes('document')) {
      reply = 'For a quick loan approval, you\'ll need your business registration, bank statements, and ID proof. Don\'t worry, it\'s a simple process!';
    } else if (lowerMessage.includes('status')) {
      reply = 'Check your loan status in the "My Loans" section. If you need help finding it, just let me know!';
    } else if (lowerMessage.includes('contact')) {
      reply = 'Need to talk to someone? Our support team is available at support@lendingkart.com or call us at 1800-XXX-XXXX. We\'re here to help!';
    } else if (lowerMessage.includes('thank')) {
      reply = 'You\'re welcome! Is there anything else I can help you with?';
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      reply = 'Goodbye! Feel free to come back if you need any help. Have a great day!';
    } else {
      reply = 'I\'m here to help! You can ask me about loans, documents, or anything else you need. What would you like to know?';
    }

    // Simulate typing delay
    setTimeout(() => {
      addBotMessage(reply);
    }, 500);
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}); 