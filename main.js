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
    const resultContainer = document.querySelector('.details-container');
    console.log(data);
}