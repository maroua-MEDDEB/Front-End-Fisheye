function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    // ajouter city, country
    const div1 = document.createElement("div");
    div1.classList.add("location");
    div1.textContent = city + ", " + country;

    // ajouter tagline
    const div2 = document.createElement("div");
    div2.textContent = tagline;

    // ajouter price
    const div3 = document.createElement("div");
    div3.textContent = price + "€/jour ";
    div3.classList.add("price");

    article.appendChild(img);
    article.appendChild(h2);

    article.appendChild(div1);
    article.appendChild(div2);
    article.appendChild(div3);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
