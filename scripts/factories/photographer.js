export function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const a_photgrapher = document.createElement('a');
    a_photgrapher.setAttribute('href', 'photographer.html?id='+id);
    a_photgrapher.setAttribute('title', name);
    a_photgrapher.appendChild(img);
    a_photgrapher.appendChild(h2);

    // ajouter city, country
    const div1 = document.createElement("div"); //créer une div
    div1.classList.add("localisation"); // ajouter une classe
    div1.textContent = city + ", " + country;

    // ajouter tagline
    const div2 = document.createElement("div");
    div2.classList.add('tagline');
    div2.textContent = tagline;

    // ajouter price
    const div3 = document.createElement("div");
    div3.classList.add("price");
    div3.textContent = price + "€/jour ";

    const p_photgrapher = document.createElement('p');
    p_photgrapher.appendChild(div1);
    p_photgrapher.appendChild(div2);
    p_photgrapher.appendChild(div3);
    article.appendChild(a_photgrapher);
    article.appendChild(p_photgrapher);

    
    return article;
  }

  function getDetailPhotographerDOM() {
//div qui contient tous les informations et la photo
const photographDetail = document.createElement("div");
photographDetail.classList.add("photographDetail");

    //div qui contient tous les informations
    const contactDetail = document.createElement("div");
    contactDetail.classList.add("contactDetail");

   //ajouter h1 du nom et prenom
    const h1 = document.createElement("h1");
    h1.textContent = name;

    // ajouter city, country
    const cityCountry = document.createElement("div"); //créer une div
    cityCountry.classList.add("localisation"); // ajouter une classe
    cityCountry.textContent = city + ", " + country;

    // ajouter text
    const textPhographer = document.createElement('p');
    textPhographer.textContent = "Voir le beau dans le quotidien";

    
    const divDetail = document.createElement("div"); //créer une div qui contient cityCountry et textPhographer
    divDetail.classList.add("detail");
    divDetail.appendChild(cityCountry);
    divDetail.appendChild(textPhographer);

    photographDetail.appendChild(contactDetail);
    contactDetail.appendChild(h1);
    contactDetail.appendChild(divDetail);

   
    const img =document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    photographDetail.appendChild(img);

    return photographDetail  ;
  }

  

  return { name, picture, getUserCardDOM,getDetailPhotographerDOM };
}


