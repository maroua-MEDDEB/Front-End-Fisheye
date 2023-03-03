export function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement( 'article' );
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture);
    img.setAttribute("alt", '');
    
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;

    const a_ph = document.createElement('a');
    a_ph.setAttribute('href', 'photographer.html?id=' + id);
    a_ph.setAttribute('title', name);
    a_ph.appendChild(img);
    a_ph.appendChild(h2);

    const div1 = document.createElement('div');
    div1.classList.add('localisation');
    div1.setAttribute('aria-label', 'Localisation du photographe');
    div1.textContent = city + ', ' + country;

    const div2 = document.createElement('div');
    div2.classList.add('tagline');
    div2.setAttribute('aria-label', 'Slogan du photographe');
    div2.textContent = tagline;

    const div3 = document.createElement('div');
    div3.classList.add('price');
    div3.setAttribute('aria-label', 'Prix par jour');
    div3.textContent = price + '€/jour';
    
    const p = document.createElement('p');
    p.appendChild(div1);
    p.appendChild(div2);
    p.appendChild(div3);

    article.appendChild(a_ph);
    article.appendChild(p);
    return (article);
  }

  function photographerInfo() {
    const ph_name = document.createElement('h1');
    ph_name.classList.add('ph_name');
    ph_name.textContent = name;

    const ph_location = document.createElement('div');
    ph_location.classList.add('ph_location');
    ph_location.textContent = city + ', ' + country;

    const ph_tagline = document.createElement('div');
    ph_tagline.classList.add('ph_tagline');
    ph_tagline.textContent = tagline;

    const ph_infos = document.createElement('div');
    ph_infos.classList.add('ph_infos');

    ph_infos.appendChild(ph_name);
    ph_infos.appendChild(ph_location);
    ph_infos.appendChild(ph_tagline);

    return ph_infos;
  }

  return { name, picture, getUserCardDOM, photographerInfo }
}