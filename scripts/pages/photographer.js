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

//afficher les média liés au photographe
async function buildMediaSection() {
  const photographerMedia = document.querySelector("#main"); //sélectionner le container de la section de média qui existe déjà

// créer la section qui contient le bouton tri et la grid du média
  const media_section = document.createElement('section');
  media_section.setAttribute('aria-label', 'Les travaux du photographe');

  // créer la liste déroulante pour sectionner le type de tri 
  const media_sort = document.createElement("div");
  media_sort.classList.add('media_sort');

  const media_sort_label = document.createElement('div');
  media_sort_label.classList.add('media_sort_label');
  media_sort_label.textContent = 'Trier par';

  const sort_dropdown = document.createElement('div');
  sort_dropdown.classList.add('sort_dropdown');

  const sort_dropdown_btn = document.createElement('button');
  sort_dropdown_btn.classList.add('sort_dropdown_btn');
  sort_dropdown_btn.textContent = 'Popularité';

  const sort_dropdown_btn_arrow = document.createElement('span');
  sort_dropdown_btn_arrow.classList.add('fas');
  sort_dropdown_btn_arrow.classList.add('fa-chevron-down');
  sort_dropdown_btn_arrow.classList.add('sort_dropdown_btn_arrow');
 
  
  const sort_dropdown_list = document.createElement('ul');
  sort_dropdown_list.classList.add('sort_dropdown_list');

  const sort_dropdown_list_item1 = document.createElement('li');
  sort_dropdown_list_item1.setAttribute('id', 'sort-item-1');
  sort_dropdown_list_item1.textContent = 'Popularité';

  const sort_dropdown_list_arrow = document.createElement('span');
  sort_dropdown_list_arrow.classList.add('fas');
  sort_dropdown_list_arrow.classList.add('fa-chevron-up');

  sort_dropdown_list_item1.appendChild(sort_dropdown_list_arrow);

  const sort_dropdown_list_item2 = document.createElement('li');
  sort_dropdown_list_item2.setAttribute('id', 'sort-item-2');
  sort_dropdown_list_item2.textContent = 'Date';

  const sort_dropdown_list_item3 = document.createElement('li');
  sort_dropdown_list_item3.setAttribute('id', 'sort-item-3');
  sort_dropdown_list_item3.textContent = 'Titre';

  media_sort.appendChild(media_sort_label);
  sort_dropdown_btn.appendChild(sort_dropdown_btn_arrow);
  sort_dropdown.appendChild(sort_dropdown_btn);

  sort_dropdown_list.appendChild(sort_dropdown_list_item1);
  sort_dropdown_list.appendChild(sort_dropdown_list_item2);
  sort_dropdown_list.appendChild(sort_dropdown_list_item3);
  sort_dropdown.appendChild(sort_dropdown_list);

  media_sort.appendChild(sort_dropdown);

  media_section.appendChild(media_sort);

  //construire la grid des média
  const media = await getMedia();
  const media_grid = document.createElement('div');
  media_grid.classList.add('media_grid');

  //trier par défaut les média par popularité 
  media.sort((a, b) => {
    if(a.likes > b.likes) { return -1; }
    if(a.likes < b.likes) { return 1; }
    return 0;
  });

  media.forEach((element) => {
    const mediaModel = mediaFactory(element);
    const mediaItem = mediaModel.createMediaItem();
    media_grid.appendChild(mediaItem);
  });

  media_section.appendChild(media_grid);
  photographerMedia.appendChild(media_section);

  //ajouter les évenements
  sort_dropdown_btn.addEventListener('click', () => {
    //afficher la liste
    sort_dropdown_list.style.display = "block";
  });

  sort_dropdown_list.addEventListener('click', (event) => {
    switch(event.target.getAttribute('id')) {
      case 'sort-item-1':
        sort_dropdown_btn.textContent = "Popularité";
        
        media.sort((a, b) => {
          if(a.likes > b.likes) { return -1; }
          if(a.likes < b.likes) { return 1; }
          return 0;
        });
        break;

      case 'sort-item-2':
        sort_dropdown_btn.textContent = "Date";
        media.sort((a, b) => {
          if(a.date > b.date) { return -1; }
          if(a.date < b.date) { return 1; }
          return 0;
        });
        break;

      case 'sort-item-3':
        sort_dropdown_btn.textContent = "Titre";
        media.sort((a, b) => {
          if(a.title > b.title) { return -1; }
          if(a.title < b.title) { return 1; }
          return 0;
        });
        break;
    }
    //masquer la liste
    sort_dropdown_list.style.display = "none";

    // regénération de la grid du média selon le type du tri
    media_grid.innerHTML = '';

    media.forEach((element) => {
      const mediaModel = mediaFactory(element);
      const mediaItem = mediaModel.createMediaItem();
      media_grid.appendChild(mediaItem);
    });
  });
}

buildMediaSection();