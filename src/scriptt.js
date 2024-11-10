// Submit billing info
$("#billingForm").on("submit", function (event) {
    event.preventDefault();

    const billingData = {
        name: $("#billingName").val(),
        address: $("#billingAddress").val(),
        payment: $("#billingPayment").val()
    };

    // Send billing info to the server
    $.ajax({
        url: "/api/billing",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(billingData),
        success: function (response) {
            alert("Billing info submitted successfully!");
        },
        error: function () {
            alert("Failed to submit billing info.");
        }
    });
});

// Submit return request
$("#returnForm").on("submit", function (event) {
    event.preventDefault();

    const returnData = {
        productId: $("#returnProductID").val()
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
