document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // prevent default submit to validate first

  const emailInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const generalError = document.getElementById('error-message');

  let valid = true;

  // Reset error messages and styles
  emailError.style.display = 'none';
  passwordError.style.display = 'none';
  generalError.textContent = '';
  emailInput.classList.remove('is-invalid');
  passwordInput.classList.remove('is-invalid');

  // Email validation
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Email is required.';
    emailError.style.display = 'block';
    emailInput.classList.add('is-invalid');
    valid = false;
  }

  // Password validation
  if (passwordInput.value.trim() === '') {
    passwordError.textContent = 'Password is required.';
    passwordError.style.display = 'block';
    passwordInput.classList.add('is-invalid');
    valid = false;
  } else if (passwordInput.value.trim().length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters long.';
    passwordError.style.display = 'block';
    passwordInput.classList.add('is-invalid');
    valid = false;
  }

  if (valid) {
    this.submit(); // submit form if all validations pass
  } else {
    generalError.textContent = 'Please fix the errors above and try again.';
  }
});
