function confirmSignOut() {
    if (confirm("Do you really want to sign out?")) {
        // Perform sign-out logic here
        alert("You have been signed out.");
        window.location.href = "login.html"; // Redirect to login page
    }
}