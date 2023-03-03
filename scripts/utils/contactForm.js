//Afficher le formulaire de contact
function displayModal() {
    const modal = document.getElementById("contact_modal");
	  modal.style.display = "block";
}

//Masquer la formulaire de contact
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

//Ajouter un évenement de type click au bouton de contact pour afficher le formaulaire de contact
const contact_btn = document.querySelector('#contact_btn');
contact_btn.addEventListener('click', () => {
  displayModal();
})

//fermer le modal
const close_button_modal = document.querySelector(".close_button_modal");
close_button_modal.addEventListener('click', () => {
  closeModal();
});

//ajouter un évênement d'envoie (submit) de formulaire de contact
const contact_form = document.querySelector('#contact_form');
const submit_btn = document.querySelector('#submit_btn');

contact_form.addEventListener('submit', (event) => {
  event.preventDefault(); // supprimer les actions du bouton de type submit qui sont par défaut

  const prenom  = contact_form.elements['prenom'].value;
  const nom  = contact_form.elements['nom'].value;
  const email = contact_form.elements['email'].value;
  const message = contact_form.elements['message'].value;

  console.log(prenom, nom, email, message);
  
  //submit_btn.setAttribute('disabled', true); // désactiver le bouton submit après l'envoie de données du formulaire (on a le droit d'envoyer  les données  q'une seule fois)
});

// fermer le formulaire de contact avec le bouton echap du clavier
  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') {
      closeModal();
    }
  });