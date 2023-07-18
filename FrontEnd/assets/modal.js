//****** VARIABLES ******//
const modalSection = document.getElementById("modalSection");
const idSendPicture = document.getElementById("sendPicture");
const classImgPreview = document.querySelector(".imgPreview");
const classNoPicture = document.querySelector(".noPicture");
const classSendPictureClass = document.querySelector(".sendPictureClass");
const classPreviewP = document.querySelector(".previewP");
const idPictureCategorie = document.getElementById("pictureCategorie");
const classModalValidateButton = document.querySelector(".modalValidateButton");
const idPictureTitle = document.getElementById("pictureTitle");
const modalForm = document.getElementById("modalForm");
const buttonAddPicture = document.querySelector(".buttonAddPicture");
const modalEditionGallery = document.querySelector(".modalEditionGallery");
const modalAddProject = document.querySelector(".modalAddProject");
const arrowReturn = document.querySelector(".arrowReturn")
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
    const crossclose = document.querySelector(".crossClose");
    crossclose.addEventListener("click", () => displayHideElement(modalSection));
}

//Navigation in the modal.
function modalNavigation(){
    
    //if click on "ajouter une photo" button: navigate to "ajout photo"
    buttonAddPicture.addEventListener("click", () =>{
        displayHideElement(modalEditionGallery);
        displayHideElement(modalAddProject);
        displayHideElement(arrowReturn);
    })

    //if click on arrowLeft: return to "edition gallery"
    arrowReturn.addEventListener("click", () => {
        displayHideElement(modalEditionGallery);
        displayHideElement(modalAddProject);
        displayHideElement(arrowReturn);
    })
 } 

 // **** GALLERY ****//
 //generate works in modal
 function modalGenerateWorks(worksArray){
    const divModalGallery = document.querySelector(".modalGallery");
    divModalGallery.innerHTML="";

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

        workElement.appendChild(imageWork);
        workElement.appendChild(textWork);
        workElement.appendChild(dragWork);
        workElement.appendChild(trashWork);

        divModalGallery.appendChild(workElement);
    })
 }


//**** PICTURE PREVIEW ****//

//preview picture in "Ajout photo" :
function previewPicture() {
    idSendPicture.addEventListener("change", ()=> {
        // console.log("previewPicture click");

        //fetch files info.
        let curFile = idSendPicture.files;
        // console.log(curFile);
        // console.log(curFile[0].size);
        // console.log(curFile[0].type);
        validTypeSize(curFile);
        if (validTypeSize(curFile)){
            // console.log("PreviewPicture if");
            classImgPreview.src = URL.createObjectURL(curFile[0]);
            // console.log(URL.createObjectURL(curFile[0]));
            console.log(classImgPreview.src);
            //hide
            displayHideElement(classNoPicture);
            displayHideElement(classSendPictureClass);
            displayHideElement(classPreviewP);
            //display
            displayHideElement(classImgPreview);

            classPreviewP.innerText="jpg, png : 4mo max";
            classPreviewP.style.color="#444";
            console.log(classImgPreview.src)
            validateFormGreen();
            console.log("Allo??");
        }
    });
}

function resetPicture(){
    //display
        displayHideElement(classNoPicture);
        displayHideElement(classSendPictureClass);
        displayHideElement(classPreviewP);
        //hide
        displayHideElement(classImgPreview);

        // clear input.
        idSendPicture.value = null;
        console.log("reset idSendPicture.value : ");
        console.log(idSendPicture.value);
        classImgPreview.src= "";
        console.log("reset classImgPreview.src :")
        console.log(classImgPreview.src);
        validateFormGreen();
}

// reset picture when you click on it.
function clickResetPicture(){
    classImgPreview.addEventListener("click", () =>{
        // console.log("click picture ok");
        resetPicture();
    });
}
//**** other inputs *****/
//clear all input
function clearForm(){
    resetPicture();
    idPictureTitle.value="";
    idPictureCategorie.value=1;
}

//categorie list in form
async function initCategorieSelect(){
    await fetchCategories();
    for (let i = 0; i < categories.length ; i++){
        const categorie = categories[i];
        const newcategorieSelect = document.createElement("option");
        newcategorieSelect.value = categorie.id;
        newcategorieSelect.innerText = categorie.name;
        idPictureCategorie.appendChild(newcategorieSelect);
    }
}

//*******input validation ****** //
function validType(curFile){
    //valid type file
    const fileTypes = [
        'image/jpeg',
        'image/png'
      ];

    for(let i=0; i<fileTypes.length; i++){
        if(curFile[0].type === fileTypes[i]) {
            return true;
        }
    };
    throw new Error("Le type de fichier sélectionné n'est pas valide. Fichier autorisé : .jpeg , .png")
}

function validSize(curFile){
    //max size accepted
    const maxSize = 4194304; 

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
    classPreviewP.innerText=message;
    classPreviewP.style.color="red";
}



// Form validate -> bouton turn on green
function validateFormGreen(){
    // console.log("Est ce que la class hidden est présente :");
    // console.log(classImgPreview.classList.contains("hidden"));
    // console.log("pictureTitle.value");
    // console.log(!(pictureTitle.value === ""));
    // console.log("idPictureCategorie.value");
    // console.log(!(idPictureCategorie.value === ""));

    if ( !(classImgPreview.classList.contains("hidden")) && !(idPictureTitle.value === "") && !(idPictureCategorie.value === "") ){
    classModalValidateButton.style.backgroundColor = "#1D6154";
    classModalValidateButton.style.cursor = "pointer" ;
    console.log(idPictureCategorie.value);
    //add cursor: pointer

}else{
        // throw new error("Erreur : Vérifier que tous les champs sont bien remplis et valides!")
        console.log("oups");
        classModalValidateButton.style.backgroundColor = "#A7A7A7";
    }
}

//listener on text input for update the validate button
function EventListenerTextInput(){
    idPictureTitle.addEventListener("input", () => {
        validateFormGreen();
    })
}

function addWorks(){

    modalForm.addEventListener("submit",async (event)=>{
        event.preventDefault();
        
        let token = localStorage.getItem("User");
        console.log(token);

        const newWork = new FormData();
        newWork.append("image", idSendPicture.files[0]);
        console.log(URL.createObjectURL(idSendPicture.files[0]))
        newWork.append("title",idPictureTitle.value)
        console.log(idPictureTitle.value)
        newWork.append("category", idPictureCategorie.value)
        console.log(parseInt(idPictureCategorie.value))
        console.log(newWork);
        //     //image: event.target.classImgPreview.src,
        //     title: event.target.idPictureTitle.value,
        //     category: parseInt(event.target.idPictureCategorie.value)
        // }

        // const newWorkJson = JSON.stringify(newWork)
        console.log("envoie");
        await fetch("http://localhost:5678/api/works", {
            method :"POST",
            headers:{   
                        "Authorization": `Bearer ${token}`
                    },
            body: newWork
        });

        //reinit galleries:
        fetchWorks().then(()=>{
            generateWorks(works);
            modalGenerateWorks(works);
        });
        // reset form:
        clearForm();
        //return on gallery modal:
        displayHideElement(modalEditionGallery);
        displayHideElement(modalAddProject);
        displayHideElement(arrowReturn);

    });
    
}

//ADD PROJECT
// async function addProject(){
//     try {
//         //bouton valider au vert  validateFormGreen();
//         //reponse serveur ok
//     }
//     catch(error) {
//         failSendProject(error.message);
//     }

// }

// function failSendProject(message){

// }