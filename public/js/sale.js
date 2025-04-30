document.getElementById('salesForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let produce = document.getElementById('produce').value.trim();
    let tonnage = document.getElementById('tonnage').value.trim();
    let amount = document.getElementById('amount').value.trim();
    let buyer = document.getElementById('buyer').value.trim();
    let agent = document.getElementById('agent').value.trim();
    let datetime = document.getElementById('datetime').value.trim();
    
    let message = "";
    
    if (!/^[a-zA-Z0-9 ]{2,}$/.test(buyer)) {
        message += "Buyer’s name must be at least 2 characters and alphanumeric.\n";
    }
    
    if (!/^[a-zA-Z0-9 ]{2,}$/.test(agent)) {
        message += "Sales Agent's name must be at least 2 characters and alphanumeric.\n";
    }
    
    if (amount.length < 5 || isNaN(amount)) {
        message += "Amount paid must be at least 5 digits and a number.\n";
    }
    
    if (message) {
        document.getElementById('message').innerText = message;
    } else {
        document.getElementById('message').innerText = "Form submitted successfully!";
        // Here you can send data to the backend
    }
});