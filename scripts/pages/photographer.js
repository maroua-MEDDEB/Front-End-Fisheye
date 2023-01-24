// récupérer l'id du photographe
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id')); // le nombre id
console.log(id);

async function getPhotographer() {
    const response = await fetch("data/photographers.json"); // envoyer requête pour récupérer le fichier json
    const data = await response.json(); // je convertis la réponse http en object json
    const photographers = data.photographers;// récupérer uniquement la clé photographers
    // et bien retourner le tableau photographers seulement une fois récupéré
    const photographer = photographers.find((element) => {return element.id === id});  
    
    return photographer;
}
  console.log(getPhotographer());


async function getMedias() {
const response = await fetch("data/photographers.json"); // envoyer requête pour récupérer le fichier json
const data = await response.json(); // je convertis la réponse http en object json
const medias = data.medias;// récupérer uniquement la clé medias

    function filtrerParID(obj) {
        if (obj.id === id) {
        return true;
        } 
    }
    var mediasPhotographer = medias.filter(filtrerParID);

return medias;
}
console.log(getMedias());