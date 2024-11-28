const password = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

password.addEventListener('input', () => {
    const strength = getPasswordStrength(password.value);
    updateStrengthMeter(strength);
});

function getPasswordStrength(pass) {
    let strength = 0;

    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[a-z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[\W]/.test(pass)) strength += 1;

    return strength;
}

function updateStrengthMeter(strength) {
    const strengthPercent = (strength / 5) * 100;
    strengthBar.style.width = strengthPercent + '%';

    if (strength <= 1) {
        strengthBar.style.backgroundColor = 'red';
        strengthText.textContent = 'Very Weak';
    } else if (strength === 2) {
        strengthBar.style.backgroundColor = 'orange';
        strengthText.textContent = 'Weak';
    } else if (strength === 3) {
        strengthBar.style.backgroundColor = 'yellow';
        strengthText.textContent = 'Moderate';
    } else if (strength === 4) {
        strengthBar.style.backgroundColor = '#9acd32'; // yellowgreen
        strengthText.textContent = 'Strong';
    } else {
        strengthBar.style.backgroundColor = 'green';
        strengthText.textContent = 'Very Strong';
    }
}
