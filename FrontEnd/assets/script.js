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
        // console.log(worksResponse);
        return works;
    })
    //if error here return error in the console.
    .catch((error)=>console.log(error));
}

async function fetchCategories(){
    await fetch('http://localhost:5678/api/categories')
    .then((response)=>response.json())
    .then((categoriesResponse)=>{
        categories = categoriesResponse;
        // console.log(categoriesResponse);
        return categories;
    })
    .catch((error)=>console.log(error));
}

//generate works
function generateWorks(worksArray){
    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML="";
    for (let i = 0; i< worksArray.length; i++) {
        //checkpoint
        // console.log(works[i]);

        // fetch DOM element which will host the works
        
        // creation of a <figure> tag 
        const workElement = document.createElement("figure");
        // creation of a <img> tag, for works' images (imageUrl)
        const imageWork = document.createElement("img");
        // creation of a <figcaption> tag for works' titles (title)
        const titleWork = document.createElement("figcaption");

        //insert src of the image
        imageWork.src = worksArray[i].imageUrl;
        //insesrt alt of the image
        imageWork.alt = worksArray[i].title;
        //insert title of the image
        titleWork.innerText = worksArray[i].title;

        //link the <img> and <figcaption> tag to the <figure>
        workElement.appendChild(imageWork);
        workElement.appendChild(titleWork);

        //link the <figure> tag to the <gallery>
        divGallery.appendChild(workElement);
    }
}

// generate categorie buttons
async function creationCategoriesFilters (){
    await fetchCategories();
    // console.log(categories);
    
    const sectionPortfolio = document.querySelector("#portfolio");
    const divGallery = document.querySelector(".gallery");
    const divCategories = document.createElement("div");
    divCategories.classList.add("filters");
    sectionPortfolio.insertBefore(divCategories, divGallery);

    //unshift
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

// a litlle function for remove classes
function removeClass(elements, classRemoved){
    for (let i = 0; i < elements.length ; i++){
        elements[i].classList.remove(classRemoved);
    }
}

//Display works by category
function addListenerCategories() {
    const btnCategoriesElements= document.querySelectorAll("#portfolio .filters button");
    // console.log(categoriesElements);
    
    //foreach
    for (let i = 0; i < btnCategoriesElements.length; i++){
        
        btnCategoriesElements[i].addEventListener("click",function (event) {
            removeClass(btnCategoriesElements,"selected");
            let categoryWorks = [];
            console.log("click click! "+ "i: " + i);
            const id = event.target.dataset.id;

            //voir for each
            for ( let j = 0 ; j < works.length ; j++){
                console.log("catégorie : " + works[j].categoryId + "; id : " +id);
                console.log(id == works[j].categoryId);
                
                if (id == 0){
                    categoryWorks = works;
                    console.log(categoryWorks);
                } else if (id == works[j].categoryId) {
                    categoryWorks.push(works[j]);
                    console.log(categoryWorks);
                }

                generateWorks(categoryWorks);
                modalGenerateWorks(categoryWorks)
                btnCategoriesElements[i].classList.add("selected");
            }
        })
    }
}

/******** ADMINISTRATION MODE ********/
//main function for Admin Mode
function adminMode(){
    if(localStorage.getItem("User")){

        //top bar admin edition
        console.log("Connected !");
        let bodySection = document.querySelector("body");
        let headerSection = document.querySelector("header");
        divEditionMain = document.createElement("div");
        divEditionMain.id = "divEditionMain";
        bodySection.insertBefore(divEditionMain, headerSection);
        divEditionMain.innerHTML =  `
        <img src="./assets/icons/EditionWhite.png">
        <p>Mode édition</>
        <div>publier les changements</div>
        `;
        logout();

        // intro picture - button edition 
        let profilePicture = document.querySelector("figure");
        divEditionPfp = document.createElement("div");
        divEditionPfp.id = "divEditionPfp";
        profilePicture.appendChild(divEditionPfp);
        divEditionPfp.innerHTML=`
        <img src="./assets/icons/EditionBlack.png">
        <p>modifier</>
        `;

        // Portfolio - button edition
        let portfolioTitle = document.querySelector(".portfolioTitle");
        divEditionGallery = document.createElement("div");
        divEditionGallery.id = "divEditionGallery";
        portfolioTitle.appendChild(divEditionGallery);
        divEditionGallery.innerHTML=`
        <img src="./assets/icons/EditionBlack.png">
        <p>modifier</>
        `;

        modalDisplayHide();
        modalNavigation();
        previewPicture();
        clickResetPicture();
        initCategorieSelect();
        validateFormGreen();
        EventListenerTextInput();
        addWorks();
    }
}

// logout
function logout(){
    let login = document.getElementById("login");
    login.innerText="logout";
    login.href="./index.html";
    login.addEventListener("click", () =>{
        localStorage.removeItem("User");
    })
}

/********** SCRIPT **********/
fetchWorks().then(()=>{
    generateWorks(works);
    modalGenerateWorks(works);
});

creationCategoriesFilters().then(()=>{
    addListenerCategories();
});

adminMode();