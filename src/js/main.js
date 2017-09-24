$(document).ready(function () {
    let bucketList = {};
    let products;
    let productInfo = document.getElementById('info-card');
    let bucketInfo = document.getElementById('bucket-popup');
    let totalPrice = document.getElementById('price-item');
    let ourRequest = new XMLHttpRequest();
    ourRequest.open( 'GET','https://shop.bremont.com/products.json');
    ourRequest.onload = function () {
        let ourData = JSON.parse(ourRequest.responseText);
        products = ourData.products;
        renderHTML(products);
    };
    ourRequest.send();

    function renderHTML(products) {
        let htmlString = "";
        // console.log(products.length);

        for (i = 0; i < products.length; i++) {
            htmlString += "<li class='col-md-6 col-lg-4'>";
            htmlString += sliderImages([products[i].images[0]]);
            htmlString += "<a href='#'><h3 class='title title-small'>" + products[i].title + "</h3></a>";
            htmlString += "<button class='btn btn-color buy-btn'  data-index='"+i+"'>Add to cart</button>";
            htmlString += "<p class='text text-info'>" + products[i].body_html + "</p>";
            htmlString += "<span class='text text-small text-grey'>" + products[i].variants[0].price + "</span>";
            htmlString +="</li>";
        }
        // console.log(htmlString);
        productInfo.insertAdjacentHTML('beforeend', htmlString);
        initButtons();
    }

    function sliderImages(images) {
        let html = "";
        html += "<div class=''>";
        if (images.length > 0) {
            for (let count = 0; count < images.length; count++) {
                html += "<img class='slider-image' src='"+ images[count].src +"'>";
            }
        } else {
            html += "<img class='slider-image' src='img/product-placeholder.jpg'>";
        }
        html += "</div>";

        return html;
    }

    function initButtons() {
        let buyButton = document.getElementsByClassName('buy-btn');

        let  myFunction = function() {
            let attribute = this.getAttribute("data-index");
            let product = products[attribute];

            let bucketElement;

            if ( bucketList[product.id] !== undefined) {
                bucketElement = bucketList[product.id];
                bucketElement.quantity += 1;

                // console.log(bucketElement);

            } else {
                bucketElement = {
                    id: product.id,
                    title: product.title,
                    quantity: 1,
                    price: product.variants[0].price,
                };
            }
            bucketList[product.id] = bucketElement;

            console.log(bucketList);
            console.log(bucketList[product.id]);
        };

        for (let i = 0; i < buyButton.length; i++) {
            buyButton[i].addEventListener('click', myFunction, false);
        }
    }

 function bucketListHtml() {
     let bucketItem = "";
     let priceItem = 0;

     for (let itemId in bucketList) {
         if (bucketList[itemId] === undefined) { continue; }
         bucketItem += '<li>';
         bucketItem += "<button class='remove-btn'  data-index='"+itemId+"'>remove</button>";
         bucketItem += "<h2 class='title'>" + bucketList[itemId].title + "</h2>";
         bucketItem += "<span class='text text-small text-grey'>" + "Price " + bucketList[itemId].price + "</span>";
         bucketItem += "<span class='text text-small text-grey'>" + "Quantity: " + bucketList[itemId].quantity + "</span>";
         bucketItem += "<span class='text text-small text-grey'>" + "Total: " + bucketList[itemId].quantity  * bucketList[itemId].price + "</span>";
         bucketItem += '</li>';
         priceItem +=  bucketList[itemId].quantity  * bucketList[itemId].price;
     }
     totalPrice.innerHTML = " Subtotal: " + priceItem;
     bucketInfo.innerHTML = bucketItem;
     removeButtons();
 }

    $('#cart-btn').on('click', function () {
        bucketListHtml();
        $('#bucket-wrap').fadeIn(500);
    });

    function removeButtons() {
        let removeButton = document.getElementsByClassName('remove-btn');

        let removeOrder = function() {
            let productId = this.getAttribute("data-index");

            let bucketElement;

            if ( bucketList[productId].quantity > 1) {
                bucketElement = bucketList[productId];
                bucketElement.quantity -= 1;

            } else {
                delete bucketList.productId;

                delete bucketList['productId'];
                console.log(bucketList);

            }
            bucketList[productId] = bucketElement;
            bucketListHtml();

        };

        for (let i = 0; i < removeButton.length; i++) {
            removeButton[i].addEventListener('click', removeOrder, false);
        }
    }

    $('#close-btn').on('click', function () {
        $('#bucket-wrap').fadeOut(500);
    });
});
