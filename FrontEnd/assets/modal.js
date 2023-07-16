//****** VARIABLES ******//
const modalSection = document.getElementById("modalSection");
const idSendPicture = document.getElementById("sendPicture");
const classImgPreview = document.querySelector(".imgPreview");
const classNoPicture = document.querySelector(".noPicture");
const classSendPictureClass = document.querySelector(".sendPictureClass");
const classPreviewP = document.querySelector(".previewP");
//****** FUNCTIONS ******/

//Add or Remove "hidden" class for display or hide Element.
function displayHideElement(element){
    element.classList.toggle("hidden");
}


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
    const buttonAddPicture = document.querySelector(".buttonAddPicture");
    const modalEditionGallery = document.querySelector(".modalEditionGallery");
    const modalAddProject = document.querySelector(".modalAddProject");
    const arrowReturn = document.querySelector(".arrowReturn")
    
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




//preview picture in "Ajout photo" :
function previewPicture() {

    idSendPicture.addEventListener("change", ()=> {
        // console.log("previewPicture click");

        //fetch files info.
        let curFile = idSendPicture.files;
        // console.log(curFile);

        if (curFile){
            // console.log("PreviewPicture if");
            classImgPreview.src = URL.createObjectURL(curFile[0]);
            // console.log(URL.createObjectURL(curFile[0]));

            //hide
            displayHideElement(classNoPicture);
            displayHideElement(classSendPictureClass);
            displayHideElement(classPreviewP);
            //display
            displayHideElement(classImgPreview);
        }
    });
    
}

// reset picture when you click on it.
function clickResetPicture(){

    classImgPreview.addEventListener("click", () =>{
        // console.log("click picture ok");
        
        //display
        displayHideElement(classNoPicture);
        displayHideElement(classSendPictureClass);
        displayHideElement(classPreviewP);
        //hide
        displayHideElement(classImgPreview);

        // clear input.
        idSendPicture.value = null;
    });
}