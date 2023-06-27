/********** VARIABLES **********/
 
let works = [];
let categories = [];

/********** FUNCTIONS **********/

//fetch data. Creating a function here will allow me to call it up later if i need to update the data. 
//(if data has been added or deleted, for example)
async function fetchWorks(){
    //wait for the data to be retrieved before continuing with the code. (await)
    await fetch('http://localhost:5678/api/works')
    //when fetch ok -> transform in json . 
    .then((response)=>response.json())
    //when response done :
    .then((worksResponse)=>{
        // works fetch the data json in a table.
        works = worksResponse;
        //return worksResponse in the console.
        console.log(worksResponse);
    })
    //if error here return error in the console.
    .catch((error)=>console.log(error));
}

async function fetchCategories(){
    await fetch('http://localhost:5678/api/categories')
    .then((response)=>response.json())
    .then((categoriesResponse)=>{
        categories = categoriesResponse;
        console.log(categoriesResponse);
    })
    .catch((error)=>console.log(error));
}

//generate works
async function generateWorks(){
    // call fetchWorks function for fetch datas
    await fetchWorks();
    // checkpoint
    console.log(works);
    for (let i = 0; i< works.length; i++) {
        //checkpoint
        console.log(works[i]);

        // fetch DOM element which will host the works
        const divGallery = document.querySelector(".gallery");

        // creation of a <figure> tag 
        const workElement = document.createElement("figure");
        // creation of a <img> tag, for works' images (imageUrl)
        const imageWork = document.createElement("img");
        // creation of a <figcaption> tag for works' titles (title)
        const titleWork = document.createElement("figcaption");

        //insert src of the image
        imageWork.src = works[i].imageUrl;
        //insesrt alt of the image
        imageWork.alt = works[i].title;
        //insert title of the image
        titleWork.innerText = works[i].title;

        //link the <img> and <figcaption> tag to the <figure>
        workElement.appendChild(imageWork);
        workElement.appendChild(titleWork);

        //link the <figure> tag to the <gallery>
        divGallery.appendChild(workElement);
    }
}

async function creationCategoriesFilters (){
    await fetchCategories();
    console.log(categories);
    
    const sectionPortfolio = document.querySelector("#portfolio");
    const divGallery = document.querySelector(".gallery");
    const divCategories = document.createElement("div");
    divCategories.classList.add("filters");
    sectionPortfolio.insertBefore(divCategories, divGallery);

    const categorieButton = document.createElement("button");
    categorieButton.dataset.id = 0;
    categorieButton.textContent = "Tous";
    
    divCategories.appendChild(categorieButton);

    for (let i = 0; i < categories.length ; i++){
        const categorie = categories[i];
        
        const categorieButton = document.createElement("button");
        categorieButton.dataset.id = categorie.id;
        categorieButton.textContent = categorie.name;
        
        divCategories.appendChild(categorieButton);
    }
}
/********** SCRIPT **********/

generateWorks();
creationCategoriesFilters ()



















// const test = async() =>{

// } 

// foreach
// forin
// forof
// for ( let work of works){

// }

// data-qqch = 