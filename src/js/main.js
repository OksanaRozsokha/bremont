$(document).ready(function () {
    let bucketList = {};
    let products;
    let productInfo = document.getElementById('info-card');
    let bucketInfo =document.getElementById('bucket-popup');
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
            htmlString += "<a href='#'><h2 class='title'>" + products[i].title + "</h2></a>";
            htmlString += "<button class='buy-btn'  data-index='"+i+"'>Buy</button>";
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
        let classname = document.getElementsByClassName('buy-btn');

        let  myFunction = function() {
            let attribute = this.getAttribute("data-index");
            let product = products[attribute];

            let bucketElement;
            let totalItems = "";

            if ( bucketList[product.id] !== undefined) {
                bucketElement = bucketList[product.id];
                bucketElement.quantity += 1;
                // console.log(bucketElement);

                for(let items in bucketElement){
                    totalItems += '<li>';
                    for(let i = 0; i < bucketElement[items].length; i++){
                        totalItems += '<h2>';
                        totalItems += "<h2 class='title'>" + bucketElement[items][i].title + "</h2>";
                        totalItems += "<span class='text text-small text-grey'>" + bucketElement[items][i].quantity + "</span>";
                        totalItems += "<span class='text text-small text-grey'>" + bucketElement[items][i].price + "</span>";
                    }
                    totalItems += '</li>';

                }
                bucketInfo.innerHTML = totalItems;

            } else {
                bucketElement = {
                    id: product.id,
                    quantity: 1,
                    price: product.variants[0].price,
                    title: product.title
                };
            }

            bucketList[product.id] = bucketElement;

            console.log(bucketList);
            console.log(bucketList[product.id]);
            // for (let element in bucketList) {
            //     console.log(element);
            // }
        };

        for (let i = 0; i < classname.length; i++) {
            classname[i].addEventListener('click', myFunction, false);
        }
    }

    $('#btn').on('click', function () {
       $('#bucket-wrap').slideToggle(500);
    });
});
