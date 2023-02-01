export function mediaFactory(data){
    const{id, photographerId, title, image,likes, date, price } = data;
let isImg;
if( image == true){

}
    const photosGaleries = `assets/images/${image}`;

    function getMediaDom(){
        if( image == true){
            const img = document.createElement("img");
            img.setAttribute("src", photosGaleries);
            img.setAttribute("alt", title);
        }else{
            const img = document.createElement("img");
            img.setAttribute("src", photosGaleries);
            img.setAttribute("type", "video/mp4");
        }
    const galeries = document.createElement("div");
    galeries.classList.add("galeries");

    


    const article = document.createElement("article");

    galeries.appendChild(article);  
    article.appendChild(img);

    return galeries;
}

    return{title, image, getMediaDom};
}