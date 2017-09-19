
$(document).ready(function() {

    $.ajax({
        type: 'GET',
        data: { get_param: 'value' },
        url: ' https://shop.bremont.com/products.json',
        dataType : "json",
        success: function (data) { //you need to append the data to gridview

            $.each([data.products[0], data.products[1]], function(index, product) {
                // let card =  document.createElement('li');
                $(".products-list").append("<li></li>");

                let productItem = $(".products-list li");


                productItem.addClass('product-element');

                let image = document.createElement('img');
                image.src = product.images[0].src;

                // let sliderBlock = document.createElement('div');
                // sliderBlock.addClass('owl-carousel');


                // $('.product-item img').attr('src', product.images[0].src);

                // slider.addClass('owl-carousel');
                // productItem.append(sliderBlock);

                productItem.append(image);
                productItem.append("<h2>" + product.title + " " + product.id + " " + index + "</h2>");
                // productItem.append(product.body_html);
                productItem.append("<span>" + '\u00A3' + product.variants[0].price +"</span>");

                // sliderBlock.addClass('owl-carousel');
                console.log(index);
            });
        }
    });









});