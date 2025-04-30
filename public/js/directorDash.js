// /js/directorDashboard.js

window.onload = async function() {
    // Fetch aggregate data from the server (replace with actual route)
    try {
      const response = await fetch('/api/aggregate-sales');
      const data = await response.json();
  
      // Populate the Director's Dashboard with fetched data
      document.getElementById('tonnagePerBranch').innerHTML = data.tonnagePerBranch.map(branch => {
        return `<li>${branch.name}: ${branch.totalTonnage} kgs</li>`;
      }).join('');
  
      document.getElementById('amountPerBranch').innerHTML = data.amountPerBranch.map(branch => {
        return `<li>${branch.name}: UGX ${branch.totalAmount}</li>`;
      }).join('');
  
      document.getElementById('totalCreditSales').innerText = `UGX ${data.totalCreditSales}`;
      document.getElementById('overallPerformance').innerText = `UGX ${data.overallPerformance}`;
  
    } catch (error) {
      console.error('Error fetching aggregate sales data:', error);
    }
  };
  