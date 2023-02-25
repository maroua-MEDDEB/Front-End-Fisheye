function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

//formulaire de contact
const contact_btn = document.querySelector('#contact_btn');

contact_btn.addEventListener('click', () => {
  displayModal();
})

const contact_form = document.querySelector('#contact_form');
const submit_btn = document.querySelector('#submit_btn');

contact_form.addEventListener('submit', (event) => {
  event.preventDefault(); // supprimer les actions du bouton de type submit qui sont par défaut

  const prenom  = contact_form.elements['prenom'].value;
  const nom  = contact_form.elements['nom'].value;
  const email = contact_form.elements['email'].value;
  const message = contact_form.elements['message'].value;

  console.log(prenom, nom, email, message);
  
  submit_btn.setAttribute('disabled', true); // désactiver le bouton submit après l'envoie de données du formulaire
});