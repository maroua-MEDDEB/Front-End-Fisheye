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

  //créer une div qyui contient le nombre totale des likes
  const ph_total_likes = document.createElement('div');
  ph_total_likes.classList.add('ph_total_likes');
  
  const media = await getMedia();
  let total_likes = 0;

  media.forEach((element) => {
    total_likes += element.likes; //calculer la somme totales des likes
  });
  ph_total_likes.textContent = total_likes  + " ";

  const likes_icon = document.createElement('i');
  likes_icon.classList.add('fas');
  likes_icon.classList.add('fa-heart');
  likes_icon.setAttribute('aria-label', 'likes');

  ph_total_likes.appendChild(likes_icon);
  //créer une div qyui contient le prix
  const ph_price = document.createElement('div');
  ph_price.classList.add('ph_price');
  ph_price.textContent = photographer.price + '€ / jour';

  const ph_likes_price = document.createElement('div');
  ph_likes_price.classList.add('ph_likes_price');
  ph_likes_price.appendChild(ph_total_likes);
  ph_likes_price.appendChild(ph_price);
  document.querySelector('body').appendChild(ph_likes_price);

  
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

  // ajouter des évênements pour affichier et masquer le lightbox(la vue rapprochée de l'image)
  let media_items = document.querySelectorAll('.media_item');
  const lightbox = document.querySelector('.lightbox');
  const media_container = document.querySelector('.media_container');
  let theMedia;

  media_items.forEach((element, index) => {
    element.addEventListener('click', () => {
      
      
      if(element.querySelector('img')) {
        theMedia = element.querySelector('img').cloneNode(true);
      }
      else {
        theMedia = element.querySelector('video').cloneNode(true);
        theMedia.setAttribute('controls', true);
      }

      lightbox.style.display = 'block';
      media_container.appendChild(theMedia);
    });
  });

  // fermer le lightbox avec le btn_close
  const closeBtn = document.querySelector('.close_btn_icon');
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    media_container.removeChild(theMedia);
    theMedia = undefined;
  });

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

    // regénération de la grid des média selon le type du tri
    media_grid.innerHTML = '';

    media.forEach((element) => {
      const mediaModel = mediaFactory(element);
      const mediaItem = mediaModel.createMediaItem();
      media_grid.appendChild(mediaItem);
    });

    // redéfinition de la variable media_items lors de tri des éléments
    // Les nouveaux éléments de classe .media_items sont
    media_items = document.querySelectorAll('.media_item'); 

    media_items.forEach((element, index) => {
      element.addEventListener('click', (e) => {
          console.log(index);
      })
  });
  });
}

buildMediaSection();

// construire lightbox (vue approchée de l'image ou du vidéo )
function buildLightbox(){
  const lightbox = document.createElement("div");
  lightbox.classList.add('lightbox');
  lightbox.setAttribute('aria-label', 'vue rapprochée de l\'image');

  const lightbox_dialog = document.createElement('div');
  lightbox_dialog.classList.add('lightbox_dialog');

  const prev = document.createElement('div');
  prev.classList.add('prev');

  const prev_icon = document.createElement('i');
  prev_icon.classList.add('fas');
  prev_icon.classList.add('fa-chevron-left');
  prev_icon.setAttribute('title', 'Image précédente');
  prev_icon.setAttribute('id', 'prev_icon');

  const media_container = document.createElement('div');
  media_container.classList.add('media_container');

  const next = document.createElement('div');
  next.classList.add('next');

  const close_btn_icon = document.createElement('div');
  close_btn_icon.classList.add('fas');
  close_btn_icon.classList.add('fa-times');
  close_btn_icon.classList.add('close_btn_icon');

  const next_icon = document.createElement('i');
  next_icon.classList.add('fas');
  next_icon.classList.add('fa-chevron-right');
  next_icon.setAttribute('title', 'Image suivante');
  next_icon.setAttribute('id', 'next_icon');


  prev.appendChild(prev_icon);
  next.appendChild(close_btn_icon);
  next.appendChild(next_icon);
  lightbox_dialog.appendChild(prev);
  lightbox_dialog.appendChild(media_container);
  lightbox_dialog.appendChild(next);
  lightbox.appendChild(lightbox_dialog);
  

  return lightbox;
}

document.body.appendChild(buildLightbox());