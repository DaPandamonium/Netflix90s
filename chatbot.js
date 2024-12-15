document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    const botResponses = [
        "ASL? (Age, Sex, Location for newbies!)",
        "BRB, Mom's calling!",
        "LOL! Remember dial-up sounds?",
        "You got mail! Oh wait, this isn't AOL.",
        "OMG! Did you see Titanic yet?",
        "404: My brain not found!",
        "AFK... just kidding! Still here.",
        "ROFL! You're too funny!",
        "TTYL, but I'll respond right now. 😉"
    ];

    const botCommands = {
        "/joke": "Why did the modem break up with the router? Too much packet loss!",
        "/advice": "Never cross the streams... unless debugging. Trust me! ",
        "/rickroll": "🎶 Never gonna give you up, never gonna let you down! https://youtu.be/dQw4w9WgXcQ"
    };

    chatbotIcon.addEventListener('click', () => {
        chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('p');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `<span class="${sender === 'Bot' ? 'bot' : 'user'}">${sender}:</span> ${message}`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    chatbotSend.addEventListener('click', () => {
        const userMessage = chatbotInput.value.trim();
        if (!userMessage) return;

        addMessage('You', userMessage);

        chatbotInput.value = '';

        setTimeout(() => {
            if (botCommands[userMessage]) {
                addMessage('Bot', botCommands[userMessage]);
            } else {
                const botMessage = botResponses[Math.floor(Math.random() * botResponses.length)];
                addMessage('Bot', botMessage);
            }
        }, 500);
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatbotSend.click();
        }
    });
});
