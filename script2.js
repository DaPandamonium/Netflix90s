let simpleSequence = [];
const simpleCode = ['a', 'w', 'e', 's', 'o', 'm', 'e'];

window.addEventListener('keydown', (e) => {
    simpleSequence.push(e.key.toLowerCase());
    if (simpleSequence.length > simpleCode.length) {
        simpleSequence.shift();
    }

    if (simpleSequence.toString() === simpleCode.toString()) {
        show90sAlert();
        simpleSequence = [];
    }
});


function show90sAlert() {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'easter-egg-alert';
    alertDiv.innerHTML = `
    <div class="alert-content">
        <p>💾🎮 YOU UNLOCKED A 90s SECRET! 🎶💾</p>
        <pre>
     .--.       .-'.      .--.      .--.
    :::::.   .' .::::.   :::::.  .' .::::.
    :::::::.   .::::::::.::::::.   .::::::.
    ':::::::.:::::'  '::::::: ':::::::.:::'
       '::::::::'        ':::::::::::::'
           '::'              ':::::'
        </pre>
        <p style="margin-top: 15px; font-weight: bold; font-size: 16px;">YOU ARE AWESOME!</p>
        <button class="close-easter-egg">Close</button>
    </div>
`;
    document.body.appendChild(alertDiv);
    document.querySelector('.close-easter-egg').addEventListener('click', () => {
        document.body.removeChild(alertDiv);
    });
}

