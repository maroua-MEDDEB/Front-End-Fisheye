function photographerFactory(data) {
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

  function getCardDOM() {
   
    const h1 = document.createElement("h1");
    h1.textContent = name;

    // ajouter city, country
    const div2 = document.createElement("div"); //créer une div
    div2.classList.add("localisation"); // ajouter une classe
    div2.textContent = city + ", " + country;

    // ajouter text
    const textPhographer = document.createElement('p');
    textPhographer.textContent = "Voir le beau dans le quotidien";

    const div1 = document.createElement("div"); //créer une div
    div1.classList.add("infoPhotographer");
    div1.appendChild(h1);
    div1.appendChild(div2);
    div1.appendChild(textPhographer);

    return div1;
  }
  return { name, picture, getUserCardDOM,getCardDOM };
}


