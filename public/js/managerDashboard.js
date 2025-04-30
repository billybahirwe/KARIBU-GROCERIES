function toggleStatus(element) {
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        element.classList.add('inactive');
        element.textContent = 'Inactive';
    } else {
        element.classList.remove('inactive');
        element.classList.add('active');
        element.textContent = 'Active';
    }
}