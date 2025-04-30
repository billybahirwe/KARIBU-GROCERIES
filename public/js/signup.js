document.getElementById("signupForm").addEventListener("submit", function (event) {
    let isValid = true;

    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    const username = document.getElementById("username").value.trim();
    if (username.length < 3) {
        document.getElementById("usernameError").innerText = "Username must be at least 3 characters.";
        isValid = false;
    }

    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        document.getElementById("emailError").innerText = "Enter a valid email.";
        isValid = false;
    }

    const password = document.getElementById("password").value.trim();
    if (password.length < 6) {
        document.getElementById("passwordError").innerText = "Password must be at least 6 characters.";
        isValid = false;
    }

    const roles = document.getElementsByName("role");
    let roleSelected = false;
    for (let role of roles) {
        if (role.checked) {
            roleSelected = true;
            break;
        }
    }
    if (!roleSelected) {
        document.getElementById("roleError").innerText = "Please select a role.";
        isValid = false;
    }

    const branch = document.getElementById("branch").value;
    if (branch === "") {
        document.getElementById("branchError").innerText = "Please select a branch.";
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});