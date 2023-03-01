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
        console.log(element)
    });
}

const categoryIdApi = (id,categoryName) =>{
   const URL = ` https://openapi.programming-hero.com/api/news/category/${id}`;
   console.log(URL)
   fetch(URL)
   .then(res => res.json())
   .then(data => categoryWaishShowData(data.data,categoryName));
}
const categoryWaishShowData = (data, categoryName) =>{
    const categoryItemsContainer = document.getElementById('category-items');
    document.getElementById('category-count').innerText = data.length;
    document.getElementById('category-name').innerText = categoryName;
    categoryItemsContainer.innerHTML = '';
    console.log()
    data.forEach(el => {
        console.log(el);
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
                                <p>${el.author.published_date ? el.author.published_date : "no time"}</p>
                            </div>
                            
                        
                        </div>
                        <div>
                            <p><i class="fa-regular fa-eye"></i> : ${el.total_view ? el.total_view : 'not view'}</p>
                        </div>
                        <div> 
                            <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star-half-stroke"></i> 
                        </div>
                        <div>
                            <a href =""><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
        
        `;
        categoryItemsContainer.appendChild(div);
    });
}