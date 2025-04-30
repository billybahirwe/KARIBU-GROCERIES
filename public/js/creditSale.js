// /js/creditSalesValidation.js

document.getElementById('creditSaleForm').addEventListener('submit', function(event) {
    let formValid = true;
  
    // Validate Buyer's Name
    const buyerName = document.querySelector('input[name="buyerName"]');
    if (buyerName.value.length < 2) {
      alert('Buyer\'s Name must be at least 2 characters.');
      formValid = false;
    }
  
    // Validate National ID (NIN) format
    const nationalId = document.querySelector('input[name="nationalId"]');
    const ninRegex = /^[A-Za-z0-9]{10,12}$/; // NIN should be alphanumeric with 10-12 characters
    if (!ninRegex.test(nationalId.value)) {
      alert('Invalid National ID format.');
      formValid = false;
    }
  
    // Validate Phone Number
    const contact = document.querySelector('input[name="contact"]');
    const phoneRegex = /^\+?\d{10,15}$/; // Valid phone number format
    if (!phoneRegex.test(contact.value)) {
      alert('Invalid phone number format.');
      formValid = false;
    }
  
    // Validate Amount Due
    const amountDue = document.querySelector('input[name="amountDue"]');
    if (amountDue.value.length < 5) {
      alert('Amount due must be at least 5 characters.');
      formValid = false;
    }
  
    // Validate Tonnage
    const tonnage = document.querySelector('input[name="tonnage"]');
    if (tonnage.value <= 0) {
      alert('Tonnage must be greater than 0.');
      formValid = false;
    }
  
    // Prevent form submission if validation fails
    if (!formValid) {
      event.preventDefault();
    }
  });
  