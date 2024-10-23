
let productList = JSON.parse(localStorage.getItem('productList')) || [];  


$(document).ready(function() {
    updateProductList();
});


$('#saveProductBtn').click(function() {
    const product = {
        id: $('#productId').val().trim(),
        description: $('#productDescription').val().trim(),
        category: $('#productCategory').val().trim(),
        unit: $('#productUnit').val().trim(),
        price: parseFloat($('#productPrice').val()),
        weight: $('#productWeight').val() ? parseFloat($('#productWeight').val()) : null,
        timestamp: new Date().toLocaleString() 
    };

    if (!product.id || !product.description || !product.category || !product.unit || isNaN(product.price)) {
        alert('Please fill out all required fields with valid data.');
        return;
    }

    const productTimestamp = new Date(product.timestamp).getTime();

    productList = productList.filter(p => p.id !== product.id || new Date(p.timestamp).getTime() >= productTimestamp);

    productList.push(product);

    localStorage.setItem('productList', JSON.stringify(productList));

    $('#productForm')[0].reset();

    updateProductList();

    alert('Product saved successfully!');
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
            <strong>Price:</strong> ${product.price.toFixed(2)},
            <strong>Weight:</strong> ${product.weight !== null ? product.weight : 'N/A'},
        </div>
            <div class="text-end">
                <small><strong>Date Added/Updated:</strong> ${product.timestamp}</small>
        </div>
        </li>`;
        productItems.append(item);
    }
}

$('#searchProductBtn').click(function() {
    const searchId = $('#productId').val().trim();

    
    if (!searchId) {
        alert('Please enter a Product ID to search.');
        return;
    }

    const product = productList.find(p => p.id === searchId);

    if (product) {
       
        $('#productDescription').val(product.description);
        $('#productCategory').val(product.category);
        $('#productUnit').val(product.unit);
        $('#productPrice').val(product.price);
        $('#productWeight').val(product.weight !== null ? product.weight : '');
        alert('Product found and loaded into the form!');
    } else {
        
        alert('Product not found.');
    }
});
