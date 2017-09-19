
$(document).ready(function() {

    $.ajax({
        type: 'GET',
        data: { get_param: 'value' },
        url: ' https://shop.bremont.com/products.json',
        dataType : "json",
        success: function (data) {

            console.log(data.products[0].title);

        }
    });








});