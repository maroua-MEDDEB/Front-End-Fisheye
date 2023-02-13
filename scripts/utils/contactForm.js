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

const submit_btn = document.querySelector('#submit_btn');