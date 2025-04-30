function addUser() {
    let tableBody = document.getElementById("userTableBody");
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" name="name[]" required></td>
        <td><input type="email" name="email[]" required></td>
        <td>
            <select name="role[]" required>
                <option value="">Select Role</option>
                <option value="Sales Agent">Sales Agent</option>
                <option value="Manager">Manager</option>
            </select>
        </td>
    `;
    tableBody.appendChild(newRow);
}

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    let inputs = document.querySelectorAll("input, select");
    for (let input of inputs) {
        if (input.value.trim() === "") {
            alert("All fields must be filled out");
            event.preventDefault();
            return;
        }
    }
    alert("Form submitted successfully!");
});
