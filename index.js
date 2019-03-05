

var data;

// Save contents of JSON file into variable
$.getJSON("./products.json", function (json) {
    data = json;
});

// Create Promise for async JSON request
function loadJSON(){
    return new Promise((resolve, reject) => {
        if(data){
            resolve();
        }else{
            //alert('Something Went Wrong.');
            reject('JSON failed to load.');
        }
    });
}


//Cycles through each product within the JSON file and dynamically builds a slideshow for each product
function populateSlideShow(data) {
        var productsection = document.getElementById("productsection");
        var products = data.groups;

        products.forEach(function (product, i) {

            //Create div to fit carousel 

            var colDiv = document.createElement('div');
                colDiv.className = 'col-12 col-md-4';
            var sliderDiv = document.createElement('div');
                sliderDiv.className = 'carousel slide';
                sliderDiv.id = 'productslider' + i;
                sliderDiv.dataset.ride = 'carousel';
                sliderDiv.dataset.interval = 'false';
                sliderDiv.style.paddingBottom = '20px';
            colDiv.appendChild(sliderDiv);

            //Create active item indicators 

            var indicators = document.createElement('ol');
                indicators.className = 'carousel-indicators';
            sliderDiv.appendChild(indicators);
            var listItem1 = document.createElement('li');
                listItem1.className = 'active';
                listItem1.dataset.target = '#productslider' + i;
                listItem1.dataset.slideTo = '0';
            var listItem2 = document.createElement('li');
                listItem2.dataset.target = '#productslider' + i;
                listItem2.dataset.slideTo = '1';
            var listItem3 = document.createElement('li');
                listItem3.dataset.target = '#productslider' + i;
                listItem3.dataset.slideTo = '2';
            var listItem4 = document.createElement('li');
                listItem4.dataset.target = '#productslider' + i;
                listItem4.dataset.slideTo = '3';
            indicators.appendChild(listItem1);
            indicators.appendChild(listItem2);
            indicators.appendChild(listItem3);
            indicators.appendChild(listItem4);


            //Create slider and first (hero image) slide

            var slider = document.createElement('div');
                slider.id = '#slider' + i;
                slider.className = 'carousel-inner';
            sliderDiv.appendChild(slider);
            var hero = document.createElement('div');
                hero.className = 'carousel-item active';
            slider.appendChild(hero);
            var heroimg = document.createElement('img');
                heroimg.className = 'd-block w-100';
                heroimg.src = product.hero.href;
                heroimg.alt = 'Hero image ' + i;


            //Dynamically populate caption with Name and Price
            var caption = document.createElement('div');
            caption.className = 'carousel-caption d-none d-md-block';
            
            var nameplace = document.createElement('h5');
                nameplace.innerHTML = product.name; //innerHTML to write special characters
            var price = document.createElement('p');
                price.innerHTML = '$' + product.priceRange.selling.high;
            caption.appendChild(nameplace);
            caption.appendChild(price);
            hero.appendChild(heroimg);
            hero.appendChild(caption);

            //loop and create a slide for each image in JSON product and populate it with provided url

            for (var n = 0; n < product.images.length; n++) {
                var slide = document.createElement('div');
                    slide.className = 'carousel-item';

                var image = document.createElement('img');
                    image.className = 'd-block w-100';
                    image.src = product.images[n].href;
                    image.alt = 'Image ' + n;
                slide.appendChild(image);
                slider.appendChild(slide);
            }

            //Create and populate Previous/Next arrow controls 

            var arrowPrev = document.createElement('a');
                arrowPrev.className = 'carousel-control-prev';
                arrowPrev.href = '#productslider' + i;
                arrowPrev.role = 'button';
                arrowPrev.dataset.slide = 'prev';

            var prevspan1 = document.createElement('span');
                prevspan1.className = 'carousel-control-prev-icon';
                prevspan1.ariaHidden = 'true';
            var prevspan2 = document.createElement('span');
                prevspan2.className = 'sr-only';
                prevspan2.innerText = 'Previous';
            arrowPrev.appendChild(prevspan1);
            arrowPrev.appendChild(prevspan2);
            sliderDiv.appendChild(arrowPrev);

            var arrowNext = document.createElement('a');
                arrowNext.className = 'carousel-control-next';
                arrowNext.href = '#productslider' + i;
                arrowNext.role = 'button';
                arrowNext.dataset.slide = 'next';
            var nextspan1 = document.createElement('span');
                nextspan1.className = 'carousel-control-next-icon';
                nextspan1.ariaHidden = 'true';
            var nextspan2 = document.createElement('span');
                nextspan2.className = 'sr-only';
                nextspan2.innerText = 'Next';
            arrowNext.appendChild(nextspan1);
            arrowNext.appendChild(nextspan1);
            sliderDiv.appendChild(arrowNext);

            //Add the newly constructed div to HTML body
            productsection.appendChild(colDiv);
        });

}


setTimeout(() => {
    loadJSON().then(populateSlideShow(data));
}, 1000);




