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




