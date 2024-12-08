document.addEventListener("DOMContentLoaded", function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    document.getElementById("signupForm").addEventListener("submit", function(event) {
        event.preventDefault(); 

        const existingUserData = localStorage.getItem("signupData");

        if (existingUserData) {
            alert("You have already signed up. You are logged in.");
            return;  
        }

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phoneNumber").value.trim();
        const age = document.getElementById("age").value.trim();
        const address = document.getElementById("address").value.trim();
        const password = document.getElementById("password").value;

        // Form validation
        if (!fullName) {
            alert("Full Name is required.");
            return; 
        } else if (!email || !emailRegex.test(email)) {
            alert("Valid email is required.");
            return;
        } else if (!age || isNaN(age)) {
            alert("Valid age is required.");
            return;
        } else if (!address) {
            alert("Address is required.");
            return;
        } else if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        
        const formData = {
            fullName: fullName,
            email: email,
            phone: phone,
            age: age,
            address: address,
            password: password
        };

       
        localStorage.setItem("signupData", JSON.stringify(formData));

        console.log("Form Data Saved to Local Storage:", formData);
        alert("Your data has been saved to local storage!"); 
    });
});
