document.addEventListener("DOMContentLoaded", function () {
  // Récupère les valeurs stockées dans le localStorage
  const nom = localStorage.getItem("nom");
  const prenom = localStorage.getItem("prenom");
  const prenomNom = `${prenom} ${nom}`;
  const formation = localStorage.getItem("formation");
  const motif = localStorage.getItem("motif");
  const duree = localStorage.getItem("duree");
  const dateLabel = document.querySelector('label[for="date"]');
  const dateInput = document.getElementById("date");
  const duLabel = document.getElementById("duLabel");
  const duInput = document.getElementById("du");
  const auLabel = document.getElementById("auLabel");
  const auInput = document.getElementById("au");
  const ligneHeure = document.getElementById("ligneHeure");

  // Injecte les valeurs dans les champs de l'imprimable.html
  document.getElementById("nom").value = nom;
  document.getElementById("prenom").value = prenom;
  document.getElementById("beneficiaire").value = prenomNom;
  document.getElementById("formation").value = formation;
  document.getElementById("motif").value = motif;

  if (duree === "un_jour") {
    const date = localStorage.getItem("date");
    const heureDebut = localStorage.getItem("heureDebut");
    const heureFin = localStorage.getItem("heureFin");

    // Affiche les champs spécifiques à "Un jour" et cache ceux de "Plusieurs jours"
    document.getElementById("date").value = date;
    document.getElementById("heureDebut").value = heureDebut;
    document.getElementById("heureFin").value = heureFin;

    // Cache les champs de "Plusieurs jours" s'ils sont visibles
    dateLabel.style.display = "inline-block"; // Affiche le label "Le :"
    dateInput.style.display = "inline-block"; // Affiche l'input de date
    ligneHeure.style.display = "inline-block"; // Affiche la ligne de sélection des heures.
    ligneHeure.style.display = "flex"; // Utilisation de flexbox pour aligner les éléments en ligne
    ligneHeure.style.alignItems = "center";
    duLabel.style.display = "none"; // Cache le label "Du :"
    duInput.style.display = "none"; // Cache l'input "Du :"
    auLabel.style.display = "none"; // Cache le label "Au :"
    auInput.style.display = "none"; // Cache l'input "Au :"
  } else if (duree === "plusieurs_jours") {
    const du = localStorage.getItem("du");
    const au = localStorage.getItem("au");

    // Affiche les champs spécifiques à "Plusieurs jours" et cache ceux de "Un jour"
    document.getElementById("du").value = du;
    document.getElementById("au").value = au;

    // Cache les champs de "Un jour" s'ils sont visibles
    dateLabel.style.display = "none"; // Cache le label "Le :"
    dateInput.style.display = "none"; // Cache l'input de date
    ligneHeure.style.display = "none"; // Cache la ligne de sélection des heures.
    duLabel.style.display = "inline-block"; // Affiche le label "Du :"
    duInput.style.display = "inline-block"; // Affiche l'input "Du :"
    auLabel.style.display = "inline-block"; // Affiche le label "Au :"
    auInput.style.display = "inline-block"; // Affiche l'input "Au :"
  }
});

document.querySelector(".BtnImprimer").addEventListener("click", function () {
  const boutonImprimer = document.querySelector(".BtnImprimer");
  if (boutonImprimer) {
    window.onbeforeprint = function () {
      boutonImprimer.style.display = "none"; // Cache le bouton avant l'impression
    };

    window.onafterprint = function () {
      boutonImprimer.style.display = ""; // Réaffiche le bouton après l'impression
    };

    window.print(); // Appel de la fonction pour l'impression
  }
});
