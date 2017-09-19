
$(document).ready(function() {

    $.ajax({
        type: 'GET',
        data: { get_param: 'value' },
        url: ' https://shop.bremont.com/products.json',
        dataType : "json",
        success: function (data) { //you need to append the data to gridview

            $.each(data.products, function(index, product) {

                const productItem = $(".products-list li");
                $(".products-list").append("<li></li>");

                productItem.addClass('product-element');


                const image = document.createElement('img');
                image.src = product.images[0].src;

                $('.product-item  img').attr('src', product.images[0].src);

                productItem.append(image);
                productItem.append("<h2>" + product.title + "</h2>");
                productItem.append("<p>" + product.body_html + "</p>");
                productItem.append("<span>" + '\u00A3' + product.variants[0].price +"</span>");

            });
        }
    });









});