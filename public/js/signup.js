document.getElementById("signupForm").addEventListener("submit", function (event) {
  let isValid = true;

  // Clear previous errors
  document.querySelectorAll(".text-danger").forEach(el => el.innerText = "");
  document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));

  const name = document.getElementById("name");
  if (name.value.trim() === "") {
    name.classList.add("is-invalid");
    document.getElementById("nameError").innerText = "Name is required.";
    isValid = false;
  }

  const username = document.getElementById("username");
  if (username.value.trim().length < 3) {
    username.classList.add("is-invalid");
    document.getElementById("usernameError").innerText = "Username must be at least 3 characters.";
    isValid = false;
  }

  const email = document.getElementById("email");
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.value.trim().match(emailPattern)) {
    email.classList.add("is-invalid");
    document.getElementById("emailError").innerText = "Enter a valid email.";
    isValid = false;
  }

  const password = document.getElementById("password");
  if (password.value.trim().length < 6) {
    password.classList.add("is-invalid");
    document.getElementById("passwordError").innerText = "Password must be at least 6 characters.";
    isValid = false;
  }

  const roles = document.getElementsByName("role");
  let roleSelected = false;
  roles.forEach(role => {
    if (role.checked) {
      roleSelected = true;
    }
  });

  if (!roleSelected) {
    document.getElementById("roleError").innerText = "Please select a role.";
    roles.forEach(role => role.classList.add("is-invalid"));
    isValid = false;
  }

  const branch = document.getElementById("branch");
  if (branch.value === "") {
    branch.classList.add("is-invalid");
    document.getElementById("branchError").innerText = "Please select a branch.";
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  }
});
