// Simple JS for smooth scrolling and active link highlighting
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Offset for fixed navbar
            if (pageYOffset >= (sectionTop - 60)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            // Check if the link's href matches the current section in view
            if (a.getAttribute('href').includes(current)) {
                a.style.color = 'var(--accent-color)';
            } else {
                a.style.color = 'var(--text-white)';
            }
        });
    });
});

// Chatbot Logic
function toggleChat() {
    const chatWindow = document.getElementById('chatbot-window');
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
        // Initial greeting when opened
        if(document.getElementById('chatbot-body').innerText === '') {
            addBotMessage("Hello! I am Untul's AI Assistant. How can I help you today? (e.g., I need a website)");
        }
    }
}

function addBotMessage(text) {
    const chatBody = document.getElementById('chatbot-body');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('bot-msg');
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addUserMessage(text) {
    const chatBody = document.getElementById('chatbot-body');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('user-msg');
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const text = inputField.value.trim();
    if (!text) return;

    addUserMessage(text);
    inputField.value = '';

    // Simple AI Logic (Rule-based)
    setTimeout(() => {
        let response = "";
        let triggerWhatsApp = false;
        let lowerText = text.toLowerCase();

        if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('charge')) {
            response = "Pricing depends on the project requirements. Let's discuss the details on WhatsApp so I can give you an exact quote!";
            triggerWhatsApp = true;
        } 
        else if (lowerText.includes('website') || lowerText.includes('develop') || lowerText.includes('project')) {
            response = "Great! I can build that for you. Let's connect on WhatsApp to discuss the features you need.";
            triggerWhatsApp = true;
        }
        else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
            response = "Hi there! What kind of website or IT solution are you looking for?";
        }
        else if (lowerText.includes('contact') || lowerText.includes('email')) {
            response = "You can email at untulmubeen192@gmail.com or let's chat directly on WhatsApp!";
            triggerWhatsApp = true;
        }
        else {
            response = "I have noted your request. To proceed further, let's connect on WhatsApp!";
            triggerWhatsApp = true;
        }

        addBotMessage(response);

        // Redirect to WhatsApp
        if (triggerWhatsApp) {
            setTimeout(() => {
                // APNA WHATSAPP NUMBER YAHAN LIKHEN (Country code ke sath, 92 ke sath)
                const phoneNumber = "923052949721"; 
                const message = encodeURIComponent("Hello Untul, I visited your portfolio. My query is: " + text);
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            }, 1500); // 1.5 second baad WhatsApp khulega
        }
    }, 800); // Bot 0.8 second mein reply karega
}