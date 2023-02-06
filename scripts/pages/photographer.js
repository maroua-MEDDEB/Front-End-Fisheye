//import { photographerFactory } from "../factories/photographer.js";
// import { mediaFactory } from "../factories/medias.js";


// récupérer l'id du photographe
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id')); // le nombre id

// récupérer les infos du bon photographer
async function getPhotographer() {
    const response = await fetch("data/photographers.json"); // envoyer requête pour récupérer le fichier json
    const data = await response.json(); // je convertis la réponse http en object json
    const photographers = data.photographers;// récupérer uniquement la clé photographers
    const photographer = photographers.find((element) => {return element.id === id});  
    
    return photographer;
}

// récupérer les médias de notre photographe
async function getMedia() {
  const response = await fetch("data/photographers.json"); // envoyer requête pour récupérer le fichier json
  const data = await response.json(); // je convertis la réponse http en object json
  const media = data.media;// récupérer uniquement la clé medias

  // filtrer les média dont photographerId === id
  const photographerMedia = media.filter((element) => {return element.photographerId === id});

  return photographerMedia;
}

// afficher les infos du photographe
async  function displayPhotographerInfo() {
  const photographer = await getPhotographer(); 
  const photographerHeader = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const photographerInfo = photographerModel.photographerInfo();

  photographerHeader.prepend(photographerInfo);

  const ph_photo = document.createElement('img');
  ph_photo.setAttribute('src', photographerModel.picture);
  ph_photo.setAttribute('alt', photographerModel.name);

  photographerHeader.appendChild(ph_photo);
}

displayPhotographerInfo();