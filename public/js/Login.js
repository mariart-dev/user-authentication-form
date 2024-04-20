// Form references
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('login-username');
const passwordInput = document.getElementById('login-password');
const generalErrorMessage = document.getElementById('login-username-error');
const togglePasswordButton = document.getElementById('toggle-password');

// Error handling functions
function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.innerText = message;
}

function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.innerText = '';
}

// Username validation
function validateUsername(username) {
    return /^[a-zA-Z]+$/.test(username);
}

// Handling username input change
function handleUsernameInputChange(event) {
    const input = event.target;
    const inputValue = input.value.trim();

    if (inputValue === '') {
        clearError(input);
    } else if (!validateUsername(inputValue)) {
        showError(input, 'Only letters are allowed in the username.');
    } else {
        clearError(input);
    }
}

usernameInput.addEventListener('input', handleUsernameInputChange);

// Checking registered user
const userDataJSON = localStorage.getItem('userData');
if (userDataJSON) {
    const userData = JSON.parse(userDataJSON);
    const storedUsername = userData.username;

    if (storedUsername === usernameInput.value.trim()) {
        usernameInput.classList.add('valid-user');
    }
}

// Login and messages
const loginButton = document.getElementById('login-button');
const loadingMessage = document.getElementById('loading-message');
const welcomeMessage = document.getElementById('welcome-message');

// Login button
loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (usernameValue === '' || passwordValue === '') {
        generalErrorMessage.innerText = 'Please enter a username and password.';
        return;
    }

    const userDataJSON = localStorage.getItem('userData');
    if (!userDataJSON) {
        generalErrorMessage.innerText = 'User not registered.';
        return;
    }

    const userData = JSON.parse(userDataJSON);
    if (userData.username !== usernameValue || userData.password !== passwordValue) {
        generalErrorMessage.innerText = 'Incorrect username or password.';
        return;
    }

    loadingMessage.classList.remove('hidden');
    setTimeout(function() {
        loadingMessage.classList.add('hidden');
        welcomeMessage.classList.remove('hidden');
    }, 8000);

    loginForm.classList.add('hidden');
});

// Logout button
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
});

// Show/hide password
togglePasswordButton.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordButton.classList.toggle('fa-eye');
    togglePasswordButton.classList.toggle('fa-eye-slash');
});

// "Enter" key on password
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        loginButton.click();
    }
});

