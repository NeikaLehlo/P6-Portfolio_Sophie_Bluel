//****** VARIABLES ******//
const modalSection = document.getElementById("modalSection");

//****** FUNCTIONS ******/

//remove "hidden" class -> element "ON"
function displayElement(element) {
    element.classList.remove("hidden");
}

//add "hidden" class -> element "OFF"
function hiddenElement(element) {
    element.classList.add("hidden");
}
///////////////^^^^^^^  voir classList.toggle *//////////////////////



// display or hide modalSection
function initListenerEditionModal() {
    const divEditionGallery = document.getElementById("divEditionGallery");
    divEditionGallery.addEventListener("click", function (){
        console.log("Affichage Edition Modal. ... Normalement.");
        displayElement(modalSection);
    })

    modalSection.addEventListener("click", (event) => {
        //if click it's ONLY on the backgound's modal : close it.
        if (event.target === modalSection){
            hiddenElement(modalSection);
        }
    })

    //if click top-left cross : close modal.
    const crossclose = document.querySelector(".crossClose");
    crossclose.addEventListener("click", () => hiddenElement(modalSection));
}



// //if click on "ajouter une photo" button
    // const buttonAddAPicture = document.querySelector(".buttonAddAPicture");
    // buttonAddAPicture.addEventListener("click", () =>{

    // })

    //if click on arrow-left : return to "edition gallery"