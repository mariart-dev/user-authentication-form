// showing and hiding elements
function toggleForms(showId, hideId) {
  document.getElementById(showId).classList.remove('hidden');
  document.getElementById(hideId).classList.add('hidden');
}

// authentication
function simulateAuthentication() {
  // login form 
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('loading-spinner').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('loading-spinner').classList.add('hidden');
    console.log('Login successful');
    setTimeout(() => {
      document.getElementById('login-form').classList.remove('hidden');
    }, 100);
  }, 2000); 
}

// listeners
document.getElementById('login-button').addEventListener('click', simulateAuthentication);

document.getElementById('show-register').addEventListener('click', (event) => {
  event.preventDefault(); 
  toggleForms('register-form', 'login-form-container');
});

document.getElementById('show-login').addEventListener('click', (event) => {
  event.preventDefault(); 
  toggleForms('login-form-container', 'register-form');
});

// successful registration
function simulateRegistrationSuccess() {
  document.getElementById('register-form').classList.add('hidden');

  document.getElementById('register-success').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('register-success').classList.add('hidden');
  }, 5000);
}

// listener 
document.getElementById('register-button').addEventListener('click', (event) => {
  event.preventDefault(); 
  simulateRegistrationSuccess();
});
