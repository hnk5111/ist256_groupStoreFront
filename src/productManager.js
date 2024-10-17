
let productList = [];

$('#saveProductBtn').click(function() {
    const product = {
        id: $('#productId').val(),
        description: $('#productDescription').val(),
        category: $('#productCategory').val(),
        unit: $('#productUnit').val(),
        price: parseFloat($('#productPrice').val()),
        weight: $('#productWeight').val() ? parseFloat($('#productWeight').val()) : null
    };

    if (!product.id || !product.description || !product.category || !product.unit || !product.price) {
        alert('Please fill out all required fields.'); 
        return;
    }

    productList.push(product);

    $('#productForm')[0].reset();

    updateProductList();
});


    function updateProductList() {
    const productItems = $('#productItems'); 
    productItems.empty();

    for (let i = 0; i < productList.length; i++) {
        const product = productList[i]; 
        const item = `<li class="list-group-item">
            <strong>ID:</strong> ${product.id},
            <strong>Description:</strong> ${product.description},
            <strong>Category:</strong> ${product.category},
            <strong>Unit:</strong> ${product.unit},
            <strong>Price:</strong> ${product.price.toFixed(2)}
            <strong>Weight:</strong> ${product.weight}
        </li>`;
        productItems.append(item);
    };
}
