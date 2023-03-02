
let allCategoryData = [] ;


const catchApi = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => showCategory(data.data))
}
const showCategory = (data) =>{
    //console.log(data.news_category);
    
    const categoriContainer = document.getElementById('category-container');
    data.news_category.forEach(element => {
        const pTag = document.createElement('p');
        pTag.innerHTML +=`<a class="nav-link" href="#" onclick ="categoryIdApi('${element.category_id}','${element.category_name}')">${element.category_name}</a>`;
        categoriContainer.appendChild(pTag);
        //console.log(element)
    });
}

const categoryIdApi = (id,categoryName) =>{
   const URL = ` https://openapi.programming-hero.com/api/news/category/${id}`;
   console.log(URL)
   fetch(URL)
   .then(res => res.json())
   .then(data =>{
    allCategoryData = data.data;
    categoryWaishShowData(data.data,categoryName)
   } );
}
const categoryWaishShowData = (data, categoryName) =>{
    //allCategoryData = data;
    //console.log(data)
    const categoryItemsContainer = document.getElementById('category-items');
    document.getElementById('category-count').innerText = data.length;
    document.getElementById('category-name').innerText = categoryName;
    categoryItemsContainer.innerHTML = '';
    
    data.forEach(el => {
        //console.log(el.rating.number);
        const div = document.createElement('div');
        div.classList.add('card', 'mb-3');
        div.style.height ='250px';
        div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
            <img  src="${el.image_url}" class="img-fluid rounded-start mt-4" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${el.title}</h5>
                    <p class="card-text">${el.details.slice(0,250)}</p>
                    <div class="d-flex gap-3 justify-content-between align-items-center"> 
                        <div class="d-flex gap-3"> 
                            <img  src="${el.author.img}" class="img-fluid rounded-circle"
                             alt="..." width="70px" height="50px">
                            <div>
                                <p>${el.author.name ? el.author.name : 'Author name emty'}</p>
                                <p>${el.author.published_date ? (el.author.published_date) : "no time"}</p>
                            </div>
                            
                        
                        </div>
                        <div>
                            <p><i class="fa-regular fa-eye"></i> : ${el.total_view ? el.total_view : 'not view'}</p>
                        </div>
                        <div> 
                        ${showRathing(el.rating.number)} <span>${el.rating.number} </span> 

                        </div>
                        <div>
                            <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick ="showCategoryDetailsApi('${el._id}')"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
        
        `;
        categoryItemsContainer.appendChild(div);
    });
}

const showCategoryDetailsApi =  (id) =>{

   const url = `https://openapi.programming-hero.com/api/news/${id}`;
    
   fetch(url)
   .then(res => res.json())
   .then(data => detailsCategory(data.data[0]))
}



const detailsCategory = (el) =>{
    //console.log(el.others_info.is_todays_pick,+'  '+el.others_info.is_trending)
    const modalContainer = document.getElementById('modal-container');

    modalContainer.innerHTML = `
    <div class="row g-0 p-3">
           
            <div class="col-md-12">
                <div class="card-body">
                <img  src="${el.image_url}" class="img-fluid rounded-start mt-4" alt="...">
                    <h5 class="card-title mt-2">${el.title}</h5>
                    <p class="card-text mt-2">${el.details}</p>
                    <div class= "d-flex gap-4">
                    
                    
                        <span class="badge text-bg-primary">${el.others_info.is_todays_pick ? 'Today Pick' : 'nothing'}</span>
                        <span class="badge text-bg-secondary">${el.others_info.is_trending ? 'Treanding' : 'nothing'}</span>
                    </div> 
                </div>
            </div>
        </div>
    `;
}

///showtoday
const showTodayData = () =>{
    const todayData = allCategoryData.filter(sinData => sinData.others_info.is_todays_pick === true);
    const categoryName = document.getElementById('category-name').innerText;
    categoryWaishShowData(todayData, categoryName);
    console.log(todayData)
    //console.log(allCategoryData[0].others_info.is_todays_pick)
}

// showTrending
const showTrending = () =>{

    const treandingData = allCategoryData.filter(sinData => sinData.others_info.is_trending === true);
    const categoryName = document.getElementById('category-name').innerText;
    categoryWaishShowData(treandingData, categoryName);
    console.log(treandingData)
}

const showRathing = (rating) =>{
    let ratingHtml ='';
    for(let i = 1; i<= Math.floor(rating); i++){
       ratingHtml +=`<i class="fa-solid fa-star"></i>`;
    }
    if(rating - Math.floor(rating) > 0){
        ratingHtml +=`<i class="fa-regular fa-star-half-stroke"></i>`;
    }
    return ratingHtml;
}