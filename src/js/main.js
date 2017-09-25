$(document).ready(function () {
    let products;
    let cartList = {};
    let productInfo = document.getElementById('products-info');
    let cartItemsList = document.getElementById('cart-list');
    let totalPrice = document.getElementById('price-item');
    let ajaxRequest = new XMLHttpRequest();

    ajaxRequest.open( 'GET','https://shop.bremont.com/products.json');

    ajaxRequest.onload = function () {
        let jsonData = JSON.parse(ajaxRequest.responseText);
        products = jsonData.products;
        productsListHTML(products);
    };

    ajaxRequest.send();

    function productsListHTML(products) {
        let htmlProduct = "";
        // console.log(products.length);

        for (i = 0; i < products.length; i++) {
            htmlProduct += "<li class='col-md-6 col-lg-4'>";
            htmlProduct += productImages([products[i].images[0]]);
            htmlProduct += "<h3 class='title title-small'>" + products[i].title + "</h3>";
            htmlProduct += "<div class='flex-container'>";
            htmlProduct += "<button class='btn btn-color buy-btn'  data-index='"+i+"'>Add to cart</button>";
            htmlProduct += "<span class='text text-small text-grey'>" + "£" + products[i].variants[0].price + "</span>";
            htmlProduct += "</div>";
            htmlProduct += "<div class='text text-info'>" + products[i].body_html + "</div>";
            htmlProduct +="</li>";
        }

        productInfo.insertAdjacentHTML('beforeend', htmlProduct);
        purchaseButtons();
    }

    function productImages(images) {
        let html = "";
        if (images.length > 0) {
            for (let count = 0; count < images.length; count++) {
                html += "<img class='product-image' src='"+ images[count].src +"'>";
            }
        } else {
            html += "<img class='slider-image' src='img/product-placeholder.jpg'>";
        }
        return html;
    }

    function purchaseButtons() {
        let buyButton = document.getElementsByClassName('buy-btn');

        let  addProductToCart = function() {
            let attribute = this.getAttribute("data-index");
            let product = products[attribute];

            let cartElement;

            if ( cartList[product.id] !== undefined) {
                cartElement = cartList[product.id];
                cartElement.quantity += 1;

            } else {
                cartElement = {
                    id: product.id,
                    title: product.title,
                    quantity: 1,
                    price: product.variants[0].price,
                    image: product.images[0].src
                };
            }
            cartList[product.id] = cartElement;

            console.log(cartList);
            console.log(cartList[product.id]);
        };

        for (let i = 0; i < buyButton.length; i++) {
            buyButton[i].addEventListener('click', addProductToCart, false);
        }
    }

     function cartListHtml() {
         let cartItem = "";
         let priceItem = 0;

         for (let itemId in cartList) {
             if (cartList[itemId] === undefined) { continue; }
             cartItem += '<div class="cart-item">';
             cartItem += "<button class='btn btn-color btn-radius remove-btn'  data-index='"+itemId+"'>&#8212</button>";
             cartItem += "<img class='cart-image' src='"+ cartList[itemId].image +"'>";
             cartItem += "<h2 class='title title-smallest title-grey'>" + cartList[itemId].title + "</h2>";
             cartItem += "<span class='text text-small text-grey'>" + "Price: £" + cartList[itemId].price + "</span>";
             cartItem += "<span class='text text-small text-grey'>" + "Quantity: " + cartList[itemId].quantity + "</span>";
             cartItem += "<span class='text text-small text-brand'>" + "Total: £" + cartList[itemId].quantity  * cartList[itemId].price + "</span>";
             cartItem += '</div>';
             priceItem +=  cartList[itemId].quantity  * cartList[itemId].price;
         }

         cartItemsList.innerHTML = cartItem;
         totalPrice.innerHTML = " Subtotal:  £" + priceItem.toFixed(2);
         deleteButtons();
     }

    function deleteButtons() {
        let removeButton = document.getElementsByClassName('remove-btn');

        let removeOrder = function() {
            let productId = this.getAttribute("data-index");

            let cartElement;

            if ( cartList[productId].quantity > 1) {
                cartElement = cartList[productId];
                cartElement.quantity -= 1;

            } else {
                delete cartList.productId;

                delete cartList['productId'];
                console.log(cartList);
            }

            cartList[productId] = cartElement;
            cartListHtml();
        };

        for (let i = 0; i < removeButton.length; i++) {
            removeButton[i].addEventListener('click', removeOrder, false);
        }
    }

       //cart-popup

    $('#cart-btn').on('click', function () {
        cartListHtml();
        $('#cart-wrap').fadeIn(500);
        $('body').addClass('active-body');
    });

    $('.btn-close').on('click', function () {
        $('#cart-wrap').fadeOut(500);
        $('body').removeClass('active-body');
    });

    $('#cart-wrap').on('click', function () {
        $(this).fadeOut();
        $('body').removeClass('active-body');
    });

    $('#cart-popup').on('click', function (e) {
        e.stopPropagation();
    });

});