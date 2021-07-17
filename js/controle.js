/*ectouter la modification des champs du formulaire
formulaire.prenom.addEventListener ( "change", function () {
    prenomControle(this);
});
formulaire.nom.addEventListener ( "change", function () {
    nomControle(this);
});
formulaire.adresse.addEventListener ( "change", function () {
    adresseControle(this);
});
formulaire.ville.addEventListener ( "change", function () {
    villeControle(this);
});
formulaire.codePostal.addEventListener ( "change", function () {
    villeControle(this);
});
formulaire.email.addEventListener ( "change", function () {
    emailControle(this);
});
//_____________Contrôle prénom pour validation
const prenomControle = function (imputprenom) {
    //création de la reg exp pour contrôle email
    let texteRegExp = new RegExp (
        /^([A-Za-z]{3,19})?([-]{0,1})?([A-Za-z]{0,19})$/
    );
//on va chercher la balise small
    let small = imputprenom.nextElementSibling;
//test l'expression régulière texte
    if (texteRegExp.test (imputprenom.value)){
        small.innerHTML ="Prénom valide";
    }else {
        small.innerHTML = "Prénom non valide";
    }
};
//_____________Contrôle nom pour validation
const nomControle = function (imputNom) {
    //création de la reg exp pour contrôle email
    let texteRegExp = new RegExp (
        /^([A-Za-z]{3,19})?([-]{0,1})?([A-Za-z]{0,19})$/
    );
//on va chercher la balise small
    let small = imputNom.nextElementSibling;
//test l'expression régulière texte
    if (texteRegExp.test (imputNom.value)){
        small.innerHTML ="nom valide";
    }else {
        small.innerHTML = "nom non valide";
    }
};
//_____________Contrôle adresse pour validation
const adresseControle = function (imputAdresse) {
    //création de la reg exp pour contrôle email
    let adresseRegExp = new RegExp (
        /^[A-Za-z0-9\s]{5,50}$/
    );
//on va chercher la balise small
    let small = imputAdresse.nextElementSibling;
//test l'expression régulière texte
    if (adresseRegExp.test (imputAdresse.value)){
        small.innerHTML ="Adresse valide";
    }else {
        small.innerHTML = "Adresse non valide";
    }
};
//_____________Contrôle ville pour validation
const villeControle = function (imputVille) {
    //création de la reg exp pour contrôle email
    let texteRegExp = new RegExp (
        /^([A-Za-z]{3,19})?([-]{0,1})?([A-Za-z]{0,19})$/
    );
//on va chercher la balise small
    let small = imputVille.nextElementSibling;
//test l'expression régulière texte
    if (texteRegExp.test (imputVille.value)){
        small.innerHTML ="Ville valide";
    }else {
        small.innerHTML = "Ville non valide";
    }
};
//_____________Contrôle code postal pour validation
const codePostalControle = function (imputcodePostal) {
    //création de la reg exp pour contrôle email
    let codePostalRegExp = new RegExp (
        /^[0-9]{5}$/
    );
//on va chercher la balise small
    let small = imputcodePostal.nextElementSibling;
//test l'expression régulière email
    if (codePostalRegExp.test (imputcodePostal.value)){
        small.innerHTML ="Code postal valide";
    }else {
        small.innerHTML = "Code postal non valide";
    }
};
//_____________Contrôle email pour validation
const emailControle = function (imputEmail) {
    //création de la reg exp pour contrôle email
    let emailRegExp = new RegExp (
        /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/
    );
//on va chercher la balise small
    let small = imputEmail.nextElementSibling;
//test l'expression régulière email
    if (emailRegExp.test (imputEmail.value)){
        small.innerHTML ="Emailvalide";
    }else {
        small.innerHTML = "Email non valide";
    }
};
*/