
// (function() {



    // $.ajax({
//     //     type: 'GET',
//     //     data: { get_param: 'value' },
//     //     url: ' https://shop.bremont.com/products.json',
//     //     dataType : "json",
//     //     success: function (data) { //you need to append the data to gridview
//     //
//     //         $.each([data.products[0], data.products[1]], function(index, product) {
//     //             // let card =  document.createElement('li');
//     //             $(".products-list").append("<li></li>");
//     //
//     //             let productItem = $(".products-list li");
//     //
//     //
//     //             productItem.addClass('product-element');
//     //
//     //             let image = document.createElement('img');
//     //             image.src = product.images[0].src;
//     //
//     //
//     //             // let sliderBlock = document.createElement('div');
//     //             // sliderBlock.addClass('owl-carousel');
//     //
//     //
//     //             // $('.product-item img').attr('src', product.images[0].src);
//     //
//     //             // slider.addClass('owl-carousel');
//     //             // productItem.append(sliderBlock);
//     //
//     //             productItem.append(image);
//     //             productItem.append("<h2>" + product.title + " " + product.id + " " + index + "</h2>");
//     //             // productItem.append(product.body_html);
//     //             productItem.append("<span>" + '\u00A3' + product.variants[0].price +"</span>");
//     //
//     //             // sliderBlock.addClass('owl-carousel');
//     //             console.log(index);
//     //         });
//     //     }
//     // });
//
// });



let productInfo = document.getElementById('info-card');
let ourRequest = new XMLHttpRequest();
ourRequest.open( 'GET','https://shop.bremont.com/products.json');
ourRequest.onload = function () {
    let ourData = JSON.parse(ourRequest.responseText);
    // console.log(ourData);
    renderHTML(ourData.products);
};
ourRequest.send();

function renderHTML(products) {
    let htmlString = "";
    console.log(products.length);

    for (i = 0; i < products.length; i++) {
        console.log(i);
        htmlString += "<li class='col-md-6 col-lg-4'>";
        htmlString += "<a href='#'><h2>" + products[i].title + "</h2></a>";
        htmlString += sliderImages(products[i].images);
        htmlString += "<p>" + products[i].body_html + "</p>";
        htmlString += "<span class='price'>" + products[i].variants[0].price + "</span>";
        htmlString +="</li>";
    }
    console.log(htmlString);
    productInfo.insertAdjacentHTML('beforeend', htmlString);
}

function sliderImages(images) {
   let html = "";
    html += "<div class=''>";
     if (images.length > 0) {
         for (count = 0; count < images.length; count++) {
             html += "<img class='slider-image' src='"+ images[count].src +"'>";
         }
     } else {
         html += "<img class='slider-image' src='img/product-placeholder.jpg'>";
     }
     html += "</div>";

     return html;
}




