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
                                <p class="slug">Slug: ${element.slug}</p>
                            </div>
                        </div>`;

            cardContainer.appendChild(div);
        });

        console.log(data.data)
    }else{
        const error = new Error('No Data Found!');
        console.log(error);
        result.innerHTML = error.message;
        result.style.color = '#f3002d';
    }
}