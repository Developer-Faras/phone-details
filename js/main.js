const searchForm = document.querySelector('#searchForm');
const searchInput = searchForm.querySelector('.searchInput');
const result = document.querySelector('#result');
const cardContainer = document.querySelector('#card-container');


searchForm.addEventListener('submit', (e) => {
    const searchText = searchInput.value;
    cardContainer.innerHTML = '';

    if(searchText === ''){
        const error = new Error('Please Enter A Valid Text');
        console.log(error);
        result.innerHTML = error.message;
        result.style.color = '#f3002d';

    }else if(searchText !== ''){
        
        result.innerHTML = 'Please Wait, Data Is Loading';
        result.style.color = '#0e9d12';
        searchInput.value = '';

        const api = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        
        fetch(api)
            .then((res) => res.json())
            .then((data) => showData(data));

    }

    e.preventDefault();
});


function showData(data){
    if(data.status == true){

        result.innerHTML = `Total ${data.data.length} Data Found.`;
        result.style.color = '#0e9d12';

        data.data.forEach(element => {
            let div = document.createElement('div');

            div.innerHTML = `<div class="card">
                            <div class="img-box"> 
                                <img src="${element.image}" alt="Phone Img">
                            </div>
                            <div class="text-box"> 
                                <h3 class="brand">Brand: ${element.brand}</h3>
                                <h4 class="model">Model: ${element.phone_name}</h4>
                                <a href="#" onclick="getDetails('${element.slug}'); return false;" class="details-btn">Details</a>
                            </div>
                        </div>`;

            cardContainer.appendChild(div);
        });
    }else{
        const error = new Error('No Data Found!');
        console.log(error);
        result.innerHTML = error.message;
        result.style.color = '#f3002d';
    }
}




// Result Details Code
function getDetails(slug){

    // Get Data By Slug From Api
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.status){
                return data.data;
            }else{
                return new Error('No Data Found For This Phone');
            }
        })
        .then((data) => showDetails(data))
        .catch((err) => console.log(err));

}


// Show Details
function showDetails(data){
    let {image, brand, name, releaseDate, mainFeatures, others} = data;
    let {chipSet, displaySize, memory, storage, sensors} = mainFeatures;
    let {Bluetooth, GPS, NFC, Radio, USB, WLAN} = others;
    let allSensors = '';
    
    for (let i = 0; i < sensors.length; i++) {
        allSensors += sensors[i]+', ';
    }

    const detailsContainer = document.querySelector('.details-container');
        detailsContainer.innerHTML = 
        `<div class="details-inner"> 
            <div class="inner"> 
                <div class="img-box"> 
                    <img src="${image}" alt="">
                </div>
                <div class="text-box"> 
                    <h2 class="brand">${brand}</h2>
                    <h1 class="model">${name}</h1>
            
                    <ul class="futures-list"> 
                        <h4 class="list-title">Main Futures</h4>
                        <li class="futures"><span>Storage:</span> ${storage}</li>
                        <li class="futures"><span>Display:</span> ${displaySize}</li>
                        <li class="futures"><span>Memory:</span> ${memory}</li>
                        <li class="futures"><span>Chipset:</span> ${chipSet}</li>
                        <li class="futures"><span>Sensors:</span> ${allSensors}</li>
                    </ul>
            
                    <ul class="futures-list"> 
                        <h4 class="list-title">Other Futures</h4>
                        <li class="futures"><span>Bluetooth:</span> ${Bluetooth}</li>
                        <li class="futures"><span>GPS:</span> ${GPS}</li>
                        <li class="futures"><span>NFC:</span> ${NFC}</li>
                        <li class="futures"><span>Radio:</span> ${Radio}</li>
                        <li class="futures"><span>USB:</span> ${USB}</li>
                        <li class="futures"><span>WLAN:</span> ${WLAN}</li>
                    </ul>
            
                    <h4 class="release-date">${releaseDate}</h4>
                </div>

                <button class="close" onclick="hideDetails(); return false;" >x</button>
            </div>
        </div>`;

}

// Hide Details
function hideDetails(){
    const detailsContainer = document.querySelector('.details-container');
        detailsContainer.innerHTML = '';
}

// Completed