// récupérer l'id du photographe
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id')); // le nombre id
console.log(id);

// récupérer les infos du bon photographer
async function getPhotographer() {
    const response = await fetch("data/photographers.json"); // envoyer requête pour récupérer le fichier json
    const data = await response.json(); // je convertis la réponse http en object json
    const photographers = data.photographers;// récupérer uniquement la clé photographers
    const photographer = photographers.find((element) => {return element.id === id});  
    
    return photographer;
}
  console.log(getPhotographer());

// afficher les donné du bon photographe
function displayDataPhotographer(photographer) {
    const photographerData = document.querySelector(".photograph-header");
  
    function photographerSelect() {
      const photographerModel = photographerFactory(photographer);
      const userCard = photographerModel.getCardDOM();
      photographerData.appendChild(userCard);
    };
    photographerSelect();
  }

// récupérer les médias de notre photographe
async function getMedias() {
const response = await fetch("data/photographers.json"); // envoyer requête pour récupérer le fichier json
const data = await response.json(); // je convertis la réponse http en object json
const medias = data.medias;// récupérer uniquement la clé medias

    function filterByID(obj) {
        if (obj.photographerId === id) {
        return true;
        } 
    }
    var mediasPhotographer = medias.filter(filterByID);

return medias;
}
console.log(getMedias());

async function init() {
    // Récupère les datas de photographe
    const  photographer = await getPhotographer();
    displayDataPhotographer(photographer);
  }
  
  init();