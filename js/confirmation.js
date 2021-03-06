//récupération de l'ID de la commande dans le local storage
const responseId = localStorage.getItem("responseId");
// recuperation prix total commande
const prixTotal = localStorage.getItem("prixTotal");
// recuperation des donnéees du formulaire
const contacts = localStorage.getItem("contacts");

function confirmation(dataconfirm) {
    if (dataconfirm) {
        confirm = `
        <div class="card col-12">
        <h3 class="card-title text-center">Récapitulatif commande</h3>
            <p class="card-text text-center">Votre numéro de commande est le: ${responseId}</p>
            <p class="card-text text-center">Montant total de la commande: ${prixTotal} €</p>
            <p class="card-text text-center">Merci pour votre commande</p>
        </div> `;

        dataconfirm.innerHTML = confirm;} 
    else {
        window.location.href = "panier.html";
    }
}
confirmation(document.querySelector("#confirmation_commande"));

//suppression données du LocalStorage
function suppCleLocalStorage(key) {
    localStorage.removeItem(key);
};
suppCleLocalStorage("prixTotal");
suppCleLocalStorage("products");
suppCleLocalStorage("responseId");
