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
  