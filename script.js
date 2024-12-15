window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    
    const loadingSound = new Audio('./assets/retroscifiPC.mp3'); 
    
    if (loadingScreen) {
        loadingSound.play().catch((error) => {
            console.error("Error playing loading sound:", error);
        });
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }, 4000);
    }
});

function initializeChat() {
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.querySelector('.chat-messages');
    const chatSendButton = document.querySelector('.chat-send');

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const messageEl = document.createElement('p');
            messageEl.className = 'chat-message';
            messageEl.innerHTML = `<span class="username">Guest:</span> ${message}`;
            chatMessages.appendChild(messageEl);
            chatMessages.parentElement.scrollTop = chatMessages.parentElement.scrollHeight;
            chatInput.value = '';
            chatInput.focus();
        }
    }

    if (chatInput && chatMessages && chatSendButton) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });

        chatSendButton.addEventListener('click', sendChatMessage);
    }
}

function initializeGuestbook() {
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookEntries = document.querySelector('.guestbook-entries');

    if (guestbookForm && guestbookEntries) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;

            if (name && message) {
                const entryElement = document.createElement('div');
                entryElement.className = 'guestbook-entry';
                entryElement.innerHTML = `
                    <h4>${name}</h4>
                    <p>${message}</p>
                    <small>${new Date().toLocaleDateString()}</small>
                `;

                guestbookEntries.insertBefore(entryElement, guestbookEntries.firstChild);
                guestbookForm.reset();
            }
        });
    }
}

function initializeVisitorCounter() {
    const visitorCount = document.getElementById('visitor-count');
    if (visitorCount) {
        let count = parseInt(localStorage.getItem('visitorCount') || '0');
        count++;
        localStorage.setItem('visitorCount', count.toString());
        visitorCount.textContent = count;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeChat();
    initializeGuestbook();
    initializeVisitorCounter();
    initializeSignup();
    initializeProfile();

    document.querySelectorAll('.genre-button').forEach((button) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.querySelector(`.${targetId}-movies`);
            const genreSections = document.querySelectorAll('.movie-grid');

            genreSections.forEach((section) => {
                section.style.display = 'none';
            });

            if (targetSection) {
                targetSection.style.display = 'grid';
            }

            document.querySelectorAll('.genre-button').forEach((btn) =>
                btn.classList.remove('active')
            );
            this.classList.add('active');
        });
    });
});

document.querySelector('.signup-button').addEventListener('click', () => {
    openModal('signupModal');
});

document.getElementById('confirmSignup').addEventListener('click', () => {
    const name = document.getElementById('signupName').value;
    if (name) {
        let signedUpUsers = JSON.parse(localStorage.getItem('signedUpUsers')) || [];
        signedUpUsers.push(name);
        localStorage.setItem('signedUpUsers', JSON.stringify(signedUpUsers));
        displaySignedUpUsers();
        closeModal('signupModal');
    } else {
        showAlert('Please enter a valid name.');
    }
});

function displayGuestbookSubmissions() {
    const submissionsContainer = document.querySelector('.guestbook .submissions');
    submissionsContainer.innerHTML = '';
    guestbookSubmissions.forEach((entry) => {
        const submission = document.createElement('div');
        submission.textContent = `${entry.name}: ${entry.message}`;
        submissionsContainer.appendChild(submission);
    });
}

function displaySignedUpUsers() {
    const userList = document.querySelector('.signed-up-users');
    userList.innerHTML = '<h3>Signed Up Users:</h3>';
    let signedUpUsers = JSON.parse(localStorage.getItem('signedUpUsers')) || [];
    signedUpUsers.forEach((user) => {
        const userItem = document.createElement('p');
        userItem.textContent = user;
        userList.appendChild(userItem);
    });
}

window.onload = () => {
    displaySignedUpUsers();
    displayGuestbookSubmissions();

    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 3000);

    document.querySelectorAll('button, a').forEach((element) => {
        element.addEventListener('mouseover', () => buttonHoverSound.play());
        element.addEventListener('click', () => buttonClickSound.play());
    });
};

document.querySelectorAll('.genre-link').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const genreSections = document.querySelectorAll('.genre-section');

        genreSections.forEach((section) => {
            section.style.display = 'none';
        });

        targetSection.style.display = 'block';
        glitchEffect(targetSection);
    });
});

function glitchEffect(targetSection) {
    targetSection.classList.add('glitch');
    setTimeout(() => {
        targetSection.classList.remove('glitch');
    }, 1000);
}

const triviaMarquee = document.querySelector('.trivia marquee');
triviaMarquee.addEventListener('mouseover', () => {
    triviaMarquee.scrollAmount = 1;
});
triviaMarquee.addEventListener('mouseout', () => {
    triviaMarquee.scrollAmount = 6;
});

const backgroundMusic = new Audio('background-music.mid');
backgroundMusic.loop = true;
backgroundMusic.play();

const hitCounter = document.createElement('div');
hitCounter.textContent = `Visitor Count: ${visits}`;
hitCounter.style.position = 'fixed';
hitCounter.style.bottom = '10px';
hitCounter.style.right = '10px';
hitCounter.style.backgroundColor = 'lightblue';
hitCounter.style.padding = '5px';
hitCounter.style.fontSize = '1em';
hitCounter.style.zIndex = '1000';
document.body.appendChild(hitCounter);

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

document.getElementById('closeSignup').addEventListener('click', () =>
    closeModal('signupModal')
);
document.getElementById('closeGuestbook').addEventListener('click', () =>
    closeModal('guestbookModal')
);

setTimeout(() => {
    showAlert('This site is best viewed in Explorer Navigator at 800x600 resolution!');
}, 4000);

document.querySelectorAll('.movie img').forEach((img) => {
    img.addEventListener('mouseover', () => {
        img.style.opacity = '0.7';
        setTimeout(() => {
            img.style.opacity = '1';
        }, 500);
    });
});



function initializeSignup() {
    const signupForm = document.querySelector('.signup-form');
    const signupEmail = document.querySelector('.signup-email');

    if (signupForm && signupEmail) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signupEmail.value.trim();

            if (email) {
                
                openModal('signupModal');
                
                
                localStorage.setItem('tempEmail', email);
            } else {
                showAlert('Please enter a valid email address.');
            }
        });
    }

    
    document.getElementById('closeSignup').addEventListener('click', () => {
        closeModal('signupModal');
    });

    
    document.getElementById('confirmSignup').addEventListener('click', () => {
        const name = document.getElementById('signupName').value.trim();
        const email = localStorage.getItem('tempEmail');

        if (name) {
            let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
            if (!subscribers.find(sub => sub.email === email)) {
                subscribers.push({ name, email, date: new Date().toLocaleDateString() });
                localStorage.setItem('subscribers', JSON.stringify(subscribers));
                
                
                signupForm.reset();
                closeModal('signupModal');
                
                
                showAlert('Welcome to Netflix DVD! Your first 3 DVDs will ship soon! 📀');
            } else {
                showAlert('This email is already subscribed!');
            }
            localStorage.removeItem('tempEmail');
        } else {
            showAlert('Please enter your name.');
        }
    });

    
    window.addEventListener('click', (e) => {
        if (e.target.className === 'modal') {
            closeModal('signupModal');
        }
    });
}


function initializeProfile() {
    const loginForm = document.getElementById('login-form');
    const profileInfo = document.getElementById('profile-info');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    
    const checkLoginStatus = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            loginForm.style.display = 'none';
            profileInfo.style.display = 'block';
            document.getElementById('profile-name').textContent = currentUser;
            updateQueueDisplay();
        } else {
            loginForm.style.display = 'block';
            profileInfo.style.display = 'none';
        }
    };

    
    loginButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        loginButton.disabled = true; 
        loginButton.textContent = 'Logging in...';

        setTimeout(() => { 
            if (username === 'user' && password === 'pass') {
                localStorage.setItem('currentUser', username);
                checkLoginStatus();
                
            } else {
                loginButton.classList.add('shake'); 
                setTimeout(() => loginButton.classList.remove('shake'), 500);
                showAlert('Invalid credentials! Try user/pass');
            }
            loginButton.disabled = false;
            loginButton.textContent = 'Login';
        }, 500);
    });

    
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        checkLoginStatus();
    });
    
    checkLoginStatus();
}

document.addEventListener('DOMContentLoaded', function() {
    const genreButtons = document.querySelectorAll('.genre-button');
    const movieGrids = document.querySelectorAll('.movie-grid');
    const homeButton = document.getElementById('homeButton');
    const mainMovies = document.querySelector('.main-movies');

    genreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href').substring(1); 
            const targetSection = document.getElementById(targetId); 

            
            movieGrids.forEach(grid => {
                grid.style.display = 'none';
            });

            
            if (targetSection) {
                targetSection.style.display = 'grid'; 
            }

            
            genreButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active'); 
        });
    });

    
    homeButton.addEventListener('click', function(e) {
        e.preventDefault(); 
    
        
        movieGrids.forEach(grid => {
            grid.style.display = 'none';
            console.log(`${grid.className} set to none`);
        });
    
        
        mainMovies.style.display = 'grid';
        console.log(`Main movies section displayed`);
    
        
        this.style.display = 'block';
        console.log(`Home button is visible`);
    
        
        genreButtons.forEach(btn => btn.classList.remove('active'));
    });
    
    
});

window.addEventListener('load', function() {
    const homeButton = document.getElementById('homeButton');
    homeButton.style.display = 'block'; 
});

function showAlert(message, type = 'error') {
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
        console.error('Alert container not found.');
        return;
    }

    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;

    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}
