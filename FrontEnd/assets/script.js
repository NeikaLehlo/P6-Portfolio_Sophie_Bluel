/********** FUNCTIONS **********/

// fetch data. Creating a function here will allow me to call it up later if i need to update the data. 
// (if data has been added or deleted, for example)
async function fetchWorks(){
    //wait for the data to be retrieved before continuing with the code. (await)
    await fetch('http://localhost:5678/api/works')
    //when fetch ok -> transform in json . 
    .then((response)=>response.json())
    //when response done :
    .then((worksResponse)=>{
        // works fetch the data json in a table.
        works = worksResponse;
        return works;
    })
    //if error here return error in the console.
    .catch((error)=>console.log(error));
}

// fetch categories and put them in "categories" array
async function fetchCategories(){
    await fetch('http://localhost:5678/api/categories')
    .then((response)=>response.json())
    .then((categoriesResponse)=>{
        categories = categoriesResponse;
        return categories;
    })
    .catch((error)=>console.log(error));
}

// A litlle function for remove classes
function removeClass(elements, classRemoved){
    for (let i = 0; i < elements.length ; i++){
        elements[i].classList.remove(classRemoved);
    }
}

// generate functionnal categorie buttons
async function categoriesFilters (){
    await fetchCategories();

    //category "All".
    const categorieButton = document.createElement("button");
    categorieButton.dataset.id = 0;
    categorieButton.textContent = "Tous"; 
    filters.appendChild(categorieButton);
    addListenerCategories(categorieButton);

    for (let i = 0; i < categories.length ; i++){
        const categorie = categories[i];
        const categorieButton = document.createElement("button");
        categorieButton.dataset.id = categorie.id;
        categorieButton.textContent = categorie.name;
        filters.appendChild(categorieButton);
        addListenerCategories(categorieButton);
    }
}

//Add eventListener on filters button + generate associated works
function addListenerCategories(categorieButton) {
    categorieButton.addEventListener("click", (event)=>{
        const btnCategoriesElements= document.querySelectorAll("#portfolio .filters button");
        const id = event.target.dataset.id;
        removeClass(btnCategoriesElements,"selected");
        createTableCategorieWorks(id);
        generateWorks(categoryWorks);
        categorieButton.classList.add("selected");
    })
}

//create an Array for different categorie works selected
function createTableCategorieWorks(idCategorie){
    categoryWorks = [];
    works.forEach(function(work){
        if (idCategorie == 0){
            categoryWorks = works;
            // console.log(categoryWorks);
        } else if (idCategorie == work.categoryId) {
            categoryWorks.push(work);
            // console.log(categoryWorks);
        }
    })
}

//sync "works" array with the DB and generate all works in the gallery.
async function generateAllWorks(){
    await fetchWorks();
    // console.log("init generateAllWorks");
    // console.log(works);
    generateWorks(works);
}

//generate works in the gallery.
function generateWorks(worksArray){    
    //  console.log("init generationWorks");

    //reset Gallery for no multiple works.
    gallery.innerHTML="";
    worksArray.forEach(function(work){   
        // creation of a <figure> tag 
        const workElement = document.createElement("figure");
        // creation of a <img> tag, for works' images (imageUrl)
        const imageWork = document.createElement("img");
        // creation of a <figcaption> tag for works' titles (title)
        const titleWork = document.createElement("figcaption");

        //insert src of the image
        imageWork.src = work.imageUrl;
        //insesrt alt of the image
        imageWork.alt = work.title;
        //insert title of the image
        titleWork.innerText = work.title;

        //link the <img> and <figcaption> tag to the <figure>
        workElement.appendChild(imageWork);
        workElement.appendChild(titleWork);

        //link the <figure> tag to the <gallery>
        gallery.appendChild(workElement);
    })
}




/******** ADMINISTRATION MODE ********/
// logout
function logout(){
    let login = document.getElementById("login");
    login.innerText="logout";
    login.href="./index.html";
    login.addEventListener("click", () =>{
        localStorage.removeItem("User");
        displayHideElement(filters);
    })
}

//main function for Admin Mode
async function adminMode(){
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
        
        displayHideElement(filters);
        
        modalGenerateWorks();
        displayHideModal();
        modalNavigation();
        
        previewPicture();
        clickResetPicture();
        initCategorieSelect();
        validateFormGreen();
        EventListenerTextInput();
        addWorks();
    }
}



/********** SCRIPT **********/
generateAllWorks();
categoriesFilters();
adminMode()
