function validateForm() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let errorMessage = document.getElementById('error-message');

    if (username === '' || password === '') {
        errorMessage.textContent = 'Both fields are required!';
        return false;
    } else if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long!';
        return false;
    }
    errorMessage.textContent = '';
    alert('Login Successful!');
    return true;
}