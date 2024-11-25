const emailSection = document.getElementById('email-section');
const otpSection = document.getElementById('otp-section');
const messageDiv = document.getElementById('message');

document.getElementById('send-otp-button').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    fetch('http://localhost:3000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    })
        .then(response => response.json())
        .then(data => {
            emailSection.classList.add('hidden');
            otpSection.classList.remove('hidden');
            messageDiv.innerText = data.message;
        })
        .catch(error => {
            messageDiv.innerText = 'Error sending OTP';
            console.error(error);
        });
});

document.getElementById('verify-otp-button').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;
    fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
    })
        .then(response => response.json())
        .then(data => {
            messageDiv.innerText = data.message;
            otpSection.classList.add('hidden');
        })
        .catch(error => {
            messageDiv.innerText = 'Invalid OTP';
            console.error(error);
        });
});