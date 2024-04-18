// Form references
const registerForm = document.getElementById('register-form');
const usernameInput = document.getElementById('register-username');
const emailInput = document.getElementById('register-email');
const passwordInput = document.getElementById('register-password');
const confirmPasswordInput = document.getElementById('register-confirm-password');
const successMessageContainer = document.getElementById('register-success');
const generalErrorMessage = document.getElementById('register-error-message');

// Function to display error messages
function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.innerText = message;
}

function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.innerText = '';
}

// Validate username
function validateUsername(username) {
    return /^[a-zA-Z]+$/.test(username);
}

// Validate email
function validateEmail(email) {
    const allowedDomains = /@(outlook|gmail|hotmail)\.(com|es|net)$/i;
    return allowedDomains.test(email);
}

// Validate password
function validatePassword(password) {
    return password.length >= 8;
}

// Validate passwords match
function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

// Handle input on form fields
function handleInputChange(event) {
    const input = event.target;
    const inputValue = input.value.trim();

    switch (input.id) {
        case 'register-username':
            if (inputValue === '') {
                clearError(input);
            } else if (!validateUsername(inputValue)) {
                showError(input, 'Only letters are allowed in the username.');
            } else {
                clearError(input);
            }
            break;
        case 'register-email':
            if (inputValue === '') {
                clearError(input);
            } else if (!validateEmail(inputValue)) {
                showError(input, 'Please enter a valid email address.');
            } else {
                clearError(input);
            }
            break;
        case 'register-password':
            if (inputValue === '') {
                clearError(input);
            } else if (!validatePassword(inputValue)) {
                showError(input, 'Password must be at least 8 characters long.');
            } else {
                clearError(input);
            }
            break;
        case 'register-confirm-password':
            const password = passwordInput.value.trim();
            if (inputValue === '') {
                clearError(input);
            } else if (!validateConfirmPassword(password, inputValue)) {
                showError(input, 'Passwords do not match.');
            } else {
                clearError(input);
            }
            break;
        default:
            break;
    }
}

usernameInput.addEventListener('input', handleInputChange);
emailInput.addEventListener('input', handleInputChange);
passwordInput.addEventListener('input', handleInputChange);
confirmPasswordInput.addEventListener('input', handleInputChange);

// Show/hide password
document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('register-password');
    const icon = document.getElementById('toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
});

// Show/hide confirm password
document.getElementById('toggle-confirm-password').addEventListener('click', function () {
    const confirmPasswordInput = document.getElementById('register-confirm-password');
    const icon = document.getElementById('toggle-confirm-password');

    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        confirmPasswordInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
});

// Register button
const registerButton = document.getElementById('register-button');

// Register button handler
registerButton.addEventListener('click', function(event) {
    
    event.preventDefault();

    // Check for empty fields
    if (usernameInput.value.trim() === '' || 
        emailInput.value.trim() === '' || 
        passwordInput.value.trim() === '' || 
        confirmPasswordInput.value.trim() === '') {
        
        // Error message
        generalErrorMessage.innerText = 'Please fill in all fields.';
    } else {
        generalErrorMessage.innerText = '';

        // Validate before saving data
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (validateUsername(username) && validateEmail(email) && validatePassword(password) && validateConfirmPassword(password, confirmPassword)) {
            // Save data to localStorage
            const userData = {
                username: username,
                email: email,
                password: password 
            };
            localStorage.setItem('userData', JSON.stringify(userData));

            // Success message
            successMessageContainer.classList.remove('hidden');
            registerForm.classList.add('hidden');

            setTimeout(function() {
                successMessageContainer.classList.add('hidden');
                window.location.href = 'Login.html';
            }, 5000);
        } else {
            // Error message if fields are invalid
            generalErrorMessage.innerText = 'Please check the fields.';
        }
    }
});

// "Enter" key on password
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        registerButton.click();
    }
});
