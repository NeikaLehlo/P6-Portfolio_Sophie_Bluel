//****** VARIABLES ******//
// const modalSection = document.getElementById("modalSection");
// const sendPicture = document.getElementById("sendPicture");
// const modalPreviewImg = document.querySelector(".modalPreviewImg");
// const modalPreviewNoPicture = document.querySelector(".modalPreviewNoPicture");
// const modalPreviewInputPicture = document.querySelector(".modalPreviewInputPicture");
// const modalPreviewP = document.querySelector(".modalPreviewP");
// const pictureCategorie = document.getElementById("pictureCategorie");
// const modalValidateButton = document.querySelector(".modalValidateButton");
// const pictureTitle = document.getElementById("pictureTitle");
// const modalForm = document.getElementById("modalForm");
// const modalButtonAddPicture = document.querySelector(".modalButtonAddPicture");
// const modalEditionGallery = document.querySelector(".modalEditionGallery");
// const modalAddProject = document.querySelector(".modalAddProject");
// const modalArrowReturn = document.querySelector(".modalArrowReturn")
// const trash = document.querySelectorAll(".trash");



//****** FUNCTIONS ******/

//Add or Remove "hidden" class for display or hide Element.
function displayHideElement(element){
    element.classList.toggle("hidden");
}

// ****MODAL BASICS : CLOSE, OPEN, RETURN BUTTON ETC ...****//
// display or hide modalSection
function modalDisplayHide() {
    const divEditionGallery = document.getElementById("divEditionGallery");
    divEditionGallery.addEventListener("click", function (){
        // console.log("Affichage Edition Modal. ... Normalement.");
        displayHideElement(modalSection);
    })

    modalSection.addEventListener("click", (event) => {
        //if click it's ONLY on the backgound's modal : close it.
        if (event.target === modalSection){
            displayHideElement(modalSection);
        }
    })

    //if click top-left cross : close modal.
    modalCrossClose.addEventListener("click", () => displayHideElement(modalSection));
}

//Navigation in the modal.
function modalNavigation(){
    
    //if click on "ajouter une photo" button: navigate to "ajout photo"
    modalButtonAddPicture.addEventListener("click", () =>{
        displayHideElement(modalEditionGallery);
        displayHideElement(modalAddProject);
        displayHideElement(modalArrowReturn);
    })

    //if click on arrowLeft: return to "edition gallery"
    modalArrowReturn.addEventListener("click", () => {
        displayHideElement(modalEditionGallery);
        displayHideElement(modalAddProject);
        displayHideElement(modalArrowReturn);
    })
 } 

 // **** GALLERY ****//
 //generate works in modal
 async function modalGenerateWorks(worksArray){
    await fetchWorks()
    .then((response)=>{
        if (modalGallery.innerHTML === ""){
            // console.log("gallery vide => première génération ");
            worksArray = works;
        }
        modalGallery.innerHTML="";
        worksArray.forEach(function(work){
            const workElement = document.createElement("figure");
            const imageWork = document.createElement("img");
            const textWork = document.createElement("p");
            const dragWork = document.createElement("img");
            const trashWork = document.createElement("img");

            imageWork.src = work.imageUrl;
            imageWork.alt = work.title;

            textWork.innerText = "éditer";

            dragWork.src = "./assets/icons/Move.svg";
            dragWork.alt = "Button Drag&Drop";
            dragWork.classList.add("drag");

            trashWork.src = "./assets/icons/trash.svg";
            trashWork.alt= "Button Trash";
            trashWork.classList.add("trash");
            trashWork.dataset.workId = work.id;
            trashWork.addEventListener("click", () =>{
            let workId = work.id
            delWork(workId);
            })

            workElement.appendChild(imageWork);
            workElement.appendChild(textWork);
            workElement.appendChild(dragWork);
            workElement.appendChild(trashWork);

            modalGallery.appendChild(workElement);
        })
    }).catch((error)=>console.log(error))
 }


//**** PICTURE PREVIEW ****//

//preview picture in "Ajout photo" :
function previewPicture() {
    sendPicture.addEventListener("change", ()=> {
        //fetch files info.
        let curFile = sendPicture.files;
        // console.log(curFile);
        // console.log(curFile[0].size);
        // console.log(curFile[0].type);
        validTypeSize(curFile);
        if (validTypeSize(curFile)){
            modalPreviewImg.src = URL.createObjectURL(curFile[0]);
            // console.log(URL.createObjectURL(curFile[0]));
            // console.log(modalPreviewImg.src);
            //hide
            displayHideElement(modalPreviewNoPicture);
            displayHideElement(modalPreviewInputPicture);
            displayHideElement(modalPreviewP);
            //display
            displayHideElement(modalPreviewImg);

            modalPreviewP.innerText="jpg, png : 4mo max";
            modalPreviewP.style.color="#444";
            validateFormGreen();
        }
    });
}

function resetPicture(){
    //display
        displayHideElement(modalPreviewNoPicture);
        displayHideElement(modalPreviewInputPicture);
        displayHideElement(modalPreviewP);
        //hide
        displayHideElement(modalPreviewImg);

        // clear input.
        sendPicture.value = null;
        modalPreviewImg.src= "";
        validateFormGreen();
}

// reset picture when you click on it.
function clickResetPicture(){
    modalPreviewImg.addEventListener("click", () =>{
        resetPicture();
    });
}
//**** other inputs *****/
//clear all input
function clearForm(){
    resetPicture();
    pictureTitle.value="";
    pictureCategorie.value=1;
}

//categorie list in form
async function initCategorieSelect(){
    await fetchCategories();
    for (let i = 0; i < categories.length ; i++){
        const categorie = categories[i];
        const newcategorieSelect = document.createElement("option");
        newcategorieSelect.value = categorie.id;
        newcategorieSelect.innerText = categorie.name;
        pictureCategorie.appendChild(newcategorieSelect);
    }
}

//*******input validation ****** //
function validType(curFile){
    for(let i=0; i<fileTypes.length; i++){
        if(curFile[0].type === fileTypes[i]) {
            return true;
        }
    };
    throw new Error("Le type de fichier sélectionné n'est pas valide. Fichier autorisé : .jpeg , .png")
}

function validSize(curFile){
    if(curFile[0].size <= maxSize){
        return true;
    }
    throw new Error("La taille du fichier n'est pas valide. Taille Max: 4Mo.");
}

function validTypeSize(curFile){
    try{
        validType(curFile);
        validSize(curFile);
        return true;
    }
    catch(error){
        errorMessage(error.message)
        return false;
    }
}

function errorMessage(message){
    modalPreviewP.innerText=message;
    modalPreviewP.style.color="red";
}


// Form validate -> bouton turn on green
function validateFormGreen(){
    if ( !(modalPreviewImg.classList.contains("hidden")) && !(pictureTitle.value === "") && !(pictureCategorie.value === "") ){
        modalValidateButton.style.backgroundColor = "#1D6154";
        modalValidateButton.style.cursor = "pointer" ;
        // console.log(pictureCategorie.value);
    }else{
        // throw new error("Erreur : Vérifier que tous les champs sont bien remplis et valides!")
        modalValidateButton.style.backgroundColor = "#A7A7A7";


        //------------------add cursor: pointer ----------------//
    }
}

//listener on text input for update the validate button
function EventListenerTextInput(){
    pictureTitle.addEventListener("input", () => {
        validateFormGreen();
    })
}

function addWorks(){
    modalForm.addEventListener("submit",async (event)=>{
        event.preventDefault();
        
        let token = localStorage.getItem("User");
        // console.log(token);

        const newWork = new FormData();
        newWork.append("image", sendPicture.files[0]);
        // console.log(URL.createObjectURL(sendPicture.files[0]))
        newWork.append("title",pictureTitle.value)
        // console.log(pictureTitle.value)
        newWork.append("category", pictureCategorie.value)
        // console.log(parseInt(pictureCategorie.value))
        // console.log(newWork);
        
        // console.log("envoie");
        await fetch("http://localhost:5678/api/works", {
            method :"POST",
            headers:{   
                        "Authorization": `Bearer ${token}`
                    },
            body: newWork
        }).then((response)=>{
            fetchWorks().then(()=>{
            generateWorks(works);
            modalGenerateWorks(works);
            })
            // reset form:
            clearForm();
            //return on gallery modal:
            displayHideElement(modalEditionGallery);
            displayHideElement(modalAddProject);
            displayHideElement(modalArrowReturn);
        }).catch((error)=>console.log(error))
    });
    
}



async function delWork(workId){
    
        let token = localStorage.getItem("User");
        await fetch(`http://localhost:5678/api/works/${workId}`, {
                method :"DELETE",
                headers:{   
                            "Authorization": `Bearer ${token}`
                        },
                // body: workId
            }).then((response)=>{
                //à revoir .
                fetchWorks().then(()=>{
                generateWorks(works);
                modalGenerateWorks(works);
                });
            }).catch((error)=>console.log(error))

}