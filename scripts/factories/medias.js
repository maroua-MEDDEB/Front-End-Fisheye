function mediaFactory(data) {
    const { title, image, video, likes} = data;
  
    function createMediaItem() {
        const media_item = document.createElement('div');
        media_item.classList.add('media_item');
    
        //si l'élément est une image donc on crée un élément html img

        if(image) {
          const media_item_img = document.createElement('img');
          media_item_img.setAttribute('src', 'assets/media/' + image);
      
          media_item.appendChild(media_item_img);
      }
        //si l'élément est un vidéo donc on crée un élément html vidéos
      if(video) {
          const media_item_video = document.createElement('video');
          media_item_video.setAttribute('src', 'assets/media/' + video);
      
          media_item.appendChild(media_item_video);
      }
    
      const media_item_infos = document.createElement('div');
      media_item_infos.classList.add('media_item_infos');
    
      const p = document.createElement('p');
      p.textContent = title;
    
      const div1 = document.createElement('div');

      const likes_number = document.createElement('span');
      likes_number.classList.add('likes_number');
      likes_number.textContent = likes;
      div1.appendChild(likes_number);
      

      const likes_icon = document.createElement('i');
      likes_icon.classList.add('like_icon');
      likes_icon.classList.add('fas');
      likes_icon.classList.add('fa-heart');
      likes_icon.setAttribute('aria-label', 'likes');
      div1.appendChild(likes_icon);
      
      media_item_infos.appendChild(p);
      media_item_infos.appendChild(div1);
    
      media_item.appendChild(media_item_infos);

      // // Gérer l'incrémentation via le click sur un coeur
      /*likes_icon.addEventListener('click', () => { 
        likes_number.textContent ++;
      }); */
    
      return media_item;
    }
  
    return { createMediaItem };
  }