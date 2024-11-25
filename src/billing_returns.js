// Submit Billing Info
$("#billingForm").on("submit", function (event) {
    event.preventDefault();

    const billingData = {
        name: $("#billingName").val(),
        address: $("#billingAddress").val(),
        payment: $("#billingPayment").val(),
    };

    // Send billing data to the server
    $.ajax({
        url: "/api/billing",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(billingData),
        success: function () {
            alert("Billing information submitted successfully!");
        },
        error: function () {
            alert("Failed to submit billing information.");
        },
    });
});

// Submit Return Request
$("#returnForm").on("submit", function (event) {
    event.preventDefault();

    const returnData = {
        productName: $("#returnProductName").val(),
    };

    // Send return request to the server
    $.ajax({
        url: "/api/returns",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(returnData),
        success: function () {
            $("#returnMessage").html("Return request submitted successfully!");
        },
        error: function () {
            $("#returnMessage").html("Failed to submit return request.");
        },
    });
});
