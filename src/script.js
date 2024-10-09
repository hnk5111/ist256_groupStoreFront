
// Submission validation and JSON initialization
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    const phone = document.getElementById("phoneNumber").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;
    
    if (!fullName) {
        alert("Full Name is required.");
        event.preventDefault();
    } else if (!email || !emailRegex.test(email)) {
        alert("Valid email is required.");
        event.preventDefault();
    } else if (!age) {
        alert("Age is required.");
        event.preventDefault();
    } else if (!address) {
        alert("Address is required.");
        event.preventDefault();
    } else if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        event.preventDefault();
    }

    const formData = {
        fullName: fullName,
        email: email,
        phone: phone,
        age: age,
        address: address,
        password: password
    };
});