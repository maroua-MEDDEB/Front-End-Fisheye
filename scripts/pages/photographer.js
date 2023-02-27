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
let ph_total_likes_number;

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

  //créer une div qui contient le nombre totale des likes
  const ph_total_likes = document.createElement('div');
  ph_total_likes.classList.add('ph_total_likes');
  ph_total_likes_number = document.createElement('span');
  ph_total_likes.appendChild(ph_total_likes_number);
  
  const media = await getMedia();
  let total_likes = 0;

  media.forEach((element) => {
    
    total_likes += element.likes; //calculer la somme totales des likes
  });

  ph_total_likes_number.textContent = total_likes  + " ";

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
  const media_sort = document.createElement("form");
  media_sort.classList.add('media_sort');

  const media_sort_label = document.createElement('label');
  media_sort_label.classList.add('media_sort_label');
  media_sort_label.textContent = 'Trier par';

  const sort_dropdown = document.createElement('select');
  sort_dropdown.classList.add('sort_dropdown');

  const sort_dropdown_list_item1 = document.createElement('option');
  sort_dropdown_list_item1.setAttribute('value', 'popularity');
  sort_dropdown_list_item1.setAttribute('selected', 'selected');
  sort_dropdown_list_item1.textContent = 'Popularité';
  sort_dropdown_list_item1.setAttribute('role','option');

  const sort_dropdown_list_item2 = document.createElement('option');
  sort_dropdown_list_item2.setAttribute('value', 'date');
  sort_dropdown_list_item2.textContent = 'Date';
  sort_dropdown_list_item2.setAttribute('role','option');

  const sort_dropdown_list_item3 = document.createElement('option');
  sort_dropdown_list_item3.setAttribute('value', 'title');
  sort_dropdown_list_item3.textContent = 'Titre';
  sort_dropdown_list_item3.setAttribute('role','option');

  media_sort.appendChild(media_sort_label);

  sort_dropdown.appendChild(sort_dropdown_list_item1);
  sort_dropdown.appendChild(sort_dropdown_list_item2);
  sort_dropdown.appendChild(sort_dropdown_list_item3);

  media_sort.appendChild(sort_dropdown);

  media_section.appendChild(media_sort);

  //construire la grid des média
  const media = await getMedia();
  const media_grid = document.createElement('div');
  media_grid.classList.add('media_grid');
  media_grid.setAttribute('role','grid');

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

  //////
  const like_icon = document.querySelectorAll('.like_icon');

  like_icon.forEach((element) => {
    let is_clicked = false;
    element.addEventListener('click', () => {
      if(is_clicked === false) {
        const likes_number = element.parentNode.querySelector('.likes_number'); 
        likes_number.textContent ++; // incrémentation du nombre de like pour chaque élément
        ph_total_likes_number.textContent++; // incrémentation du nombre total de likes
      }

      is_clicked = true;
    });

    element.addEventListener('keydown',(event) => {
      if(event.key === 'Enter'){
        if(is_clicked === false) {
          const likes_number = element.parentNode.querySelector('.likes_number'); 
          likes_number.textContent ++; // incrémentation du nombre de like pour chaque élément
          ph_total_likes_number.textContent++; // incrémentation du nombre total de likes
        }
  
        is_clicked = true;
      }
    })
  });

  // ajouter des évênements pour affichier et masquer le lightbox(la vue rapprochée de l'image)
  let media_items = document.querySelectorAll('.media_item');
  const lightbox = document.querySelector('.lightbox');
  const media_container = document.querySelector('.media_container');
  let theMedia;
  let theTitle;
  let currentIndex;

  const showLightbox = (element) => {
    media_container.innerHTML='';
    if(element.querySelector('img')) {
      theMedia = element.querySelector('img').cloneNode(true);
    }
    else {
      theMedia = element.querySelector('video').cloneNode(true);
      theMedia.setAttribute('controls', true);
    }

    lightbox.style.display = 'block';
    media_container.appendChild(theMedia);
    theTitle = element.querySelector('p').cloneNode(true);
    media_container.appendChild(theTitle);
  };

  media_items.forEach((element, index) => {
    const element_thumb = element.querySelector('img') ? element.querySelector('img'): element.querySelector('video') ;
    
    element_thumb.addEventListener('click', () => {
      showLightbox(element); 
      currentIndex = index;  
    });

    element_thumb.addEventListener('keypress', (event) => {
      if(event.key === 'Enter') {
        showLightbox(element);
        currentIndex = index;  
      }
    });
  });

  //ajouter les évenements
  sort_dropdown.addEventListener('change', (event) => {
    switch(event.target.value) {
      case 'popularity':        
        media.sort((a, b) => {
          if(a.likes > b.likes) { return -1; }
          if(a.likes < b.likes) { return 1; }
          return 0;
        });
        break;

      case 'date':
      
        media.sort((a, b) => {
          if(a.date > b.date) { return -1; }
          if(a.date < b.date) { return 1; }
          return 0;
        });
        break;

      case 'title':
   
        media.sort((a, b) => {
          if(a.title > b.title) { return -1; }
          if(a.title < b.title) { return 1; }
          return 0;
        });
        break;
    }

    // regénération de la grid des média selon le type du tri
    media_grid.innerHTML = '';

    media.forEach((element) => {
      const mediaModel = mediaFactory(element);
      const mediaItem = mediaModel.createMediaItem();
      media_grid.appendChild(mediaItem);
    });

    // redéfinition de la variable media_items lors de tri des éléments
    // Les nouveaux éléments de classe .media_items ne sont plus les mêmes généré par défaut  
    media_items = document.querySelectorAll('.media_item'); 
    
    media_items.forEach((element, index) => {
      const element_thumb = element.querySelector('img') ? element.querySelector('img'): element.querySelector('video') ;
      
      element_thumb.addEventListener('click', () => {
        showLightbox(element); 
        currentIndex = index;  
      });

      element_thumb.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
          showLightbox(element);
          currentIndex = index;  
        }
      }); 
    });
  });

  // fermer le lightbox avec le btn_close
  const close_btn_icon = document.querySelector('.close_btn_icon');
  close_btn_icon.addEventListener('click', () => {
    media_container.removeChild(theMedia);
    lightbox.style.display = 'none';
  });

  // afficher le média suivant
  const next_icon = document.querySelector('#next_icon');
  const next_function = () => {
    if(currentIndex < media_items.length - 1){
      currentIndex++;  
    } else{
      currentIndex = 0;
    }

    if(media_items[currentIndex].querySelector('img')) {
      theMedia = media_items[currentIndex].querySelector('img').cloneNode(true);
    }
    else {
      theMedia = media_items[currentIndex].querySelector('video').cloneNode(true);
      theMedia.setAttribute('controls', true);
    }

    media_container.innerHTML = '';
    media_container.appendChild(theMedia);
    theTitle = media_items[currentIndex].querySelector('h2').cloneNode(true);
    media_container.appendChild(theTitle);
  };

  next_icon.addEventListener('click', () => {
    next_function();
  });

  // afficher le média précédent
  const prev_icon = document.querySelector('#prev_icon');

  const prev_function = () => {
    if(currentIndex > 0){
      currentIndex--;  
    } else {
      currentIndex = media_items.length - 1 ;
    }

    if(media_items[currentIndex].querySelector('img')) {
      theMedia = media_items[currentIndex].querySelector('img').cloneNode(true);
    }
    else {
      theMedia = media_items[currentIndex].querySelector('video').cloneNode(true);
      theMedia.setAttribute('controls', true);
    }

    media_container.innerHTML = '';
    media_container.appendChild(theMedia);
    theTitle = media_items[currentIndex].querySelector('h2').cloneNode(true);
    media_container.appendChild(theTitle);
  };

  prev_icon.addEventListener('click', () => {
    prev_function();
  });

  // keybord events
  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
      prev_function();
      return;
    } 
    
    if (event.code === 'ArrowRight') {
      next_function();
      return;
    }

    if(event.key === 'Escape') {
      if(theMedia) {
        media_container.removeChild(theMedia);
        lightbox.style.display = 'none';
      }
    }
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