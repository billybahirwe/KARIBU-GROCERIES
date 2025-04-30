// // Autofill today's date
// document.addEventListener("DOMContentLoaded", () => {
//     const today = new Date().toISOString().split("T")[0];
//     document.getElementById("date").value = today;
// });

// document.getElementById('salesForm').addEventListener('submit', function (e) {
//     e.preventDefault();

//     const branch = document.getElementById('branch').value;
//     const agent = document.getElementById('agent').value.trim();
//     const produce = document.getElementById('produce').value.trim();
//     const quantity = parseInt(document.getElementById('quantity').value);
//     const price = parseFloat(document.getElementById('price').value);
//     const date = document.getElementById('date').value;

//     if (!branch || !agent || !produce || quantity <= 0 || price <= 0 || !date) {
//         alert("Please fill out all fields correctly!");
//         return;
//     }

//     const total = (quantity * price).toFixed(2);

//     const table = document.getElementById('salesTable').querySelector('tbody');
//     const row = table.insertRow();

//     row.innerHTML = `
//         <td>${branch}</td>
//         <td>${agent}</td>
//         <td>${produce}</td>
//         <td>${quantity}</td>
//         <td>${price.toFixed(2)}</td>
//         <td>${total}</td>
//         <td>${date}</td>
//       `;

//     document.getElementById('salesForm').reset();
//     // Reset date to today again after reset
//     document.getElementById("date").value = new Date().toISOString().split("T")[0];
// });


// /js/salesList.js

window.onload = async function() {
    try {
      const response = await fetch('/api/sales');  // Replace with your API route
      const salesData = await response.json();
  
      const salesList = document.getElementById('salesList');
  
      // Check if there is any sales data
      if (salesData.length === 0) {
        salesList.innerHTML = '<tr><td colspan="8">No sales recorded yet.</td></tr>';
        return;
      }
  
      // Populate the sales list table dynamically
      salesData.forEach(sale => {
        const saleRow = document.createElement('tr');
        
        saleRow.innerHTML = `
          <td>${sale.produceName}</td>
          <td>${sale.produceType}</td>
          <td>${sale.tonnage} kgs</td>
          <td>UGX ${sale.amount}</td>
          <td>${sale.buyerName}</td>
          <td>${sale.salesAgent}</td>
          <td>${sale.branch}</td>
          <td>${new Date(sale.date).toLocaleString()}</td>
        `;
        
        salesList.appendChild(saleRow);
      });
  
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };
  