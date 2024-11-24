// Submit billing info
$("#billingForm").on("submit", function (event) {
    event.preventDefault();

    // Check if billing info exists in local storage
    const storedBillingData = localStorage.getItem("billingInfo");
    let billingData;

    if (storedBillingData) {
        billingData = JSON.parse(storedBillingData);
        alert("Found Billing info:", billingData);
    } else { 
        billingData = {
            name: $("#billingName").val(),
            address: $("#billingAddress").val(),
            payment: $("#billingPayment").val()
        };

            alert("Using input data", billingData);
    }

    // Save updated billing info to local storage under the key "billingData"
    localStorage.setItem("billingData", JSON.stringify(billingData));

    // Send billing info to the server
    $.ajax({
        url: "/api/billing",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(billingData),
        success: function (response) {
        
        },
        error: function () {
    
        }
    });
});

// Submit return request
$("#returnForm").on("submit", function (event) {
    event.preventDefault();

    const returnData = {
        productName: $("#returnProductName").val()
    };

    // Send return info to the server
    $.ajax({
        url: "/api/returns",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(returnData),
        success: function (response) {
            $("#returnMessage").html("Return request submitted successfully!");
        },
        error: function () {
            $("#returnMessage").html("Failed to submit return request.");
        }
    });
});
