// Fonction pour afficher ou masquer les champs de dates
function toggleDates() {
  const unJour = document.querySelector('input[value="un_jour"]');
  const plusieursJours = document.querySelector(
    'input[value="plusieurs_jours"]'
  );
  const dateLabel = document.querySelector('label[for="date"]');
  const dateInput = document.getElementById("date");
  const duLabel = document.getElementById("duLabel");
  const duInput = document.getElementById("du");
  const auLabel = document.getElementById("auLabel");
  const auInput = document.getElementById("au");
  const ligneHeure = document.getElementById("ligneHeure");

  // Si "Plusieurs jours" est sélectionné, afficher les champs "Du" et "Au"
  plusieursJours.addEventListener("change", function () {
    if (this.checked) {
      dateLabel.style.display = "none"; // Cache le label "Le :"
      dateInput.style.display = "none"; // Cache l'input de date
      ligneHeure.style.display = "none"; // Cache la ligne de sélection des heures.
      duLabel.style.display = "inline-block"; // Affiche le label "Du :"
      duInput.style.display = "inline-block"; // Affiche l'input "Du :"
      auLabel.style.display = "inline-block"; // Affiche le label "Au :"
      auInput.style.display = "inline-block"; // Affiche l'input "Au :"
    }
  });

  // Si "Un jour" est sélectionné, réafficher le champ unique de date
  unJour.addEventListener("change", function () {
    if (this.checked) {
      dateLabel.style.display = "inline-block"; // Affiche le label "Le :"
      dateInput.style.display = "inline-block"; // Affiche l'input de date
      ligneHeure.style.display = "inline-block"; // Affiche la ligne de sélection des heures.
      ligneHeure.style.display = "flex"; // Utilisation de flexbox pour aligner les éléments en ligne
      ligneHeure.style.alignItems = "center";
      duLabel.style.display = "none"; // Cache le label "Du :"
      duInput.style.display = "none"; // Cache l'input "Du :"
      auLabel.style.display = "none"; // Cache le label "Au :"
      auInput.style.display = "none"; // Cache l'input "Au :"
    }
  });
}
// Appelle la fonction au chargement de la page
window.onload = toggleDates;

// Chargement du fichier JSON
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const donneesJSON = document.getElementById("donneesJSON");

    // Boucle à travers les données
    data.Codes.forEach((item) => {
      const code = item.Code;
      const raison = item.Raison;
      const details = item.Details;

      const h3 = document.createElement("h3");
      h3.textContent = `Code ${code} : ${raison}`;
      donneesJSON.appendChild(h3);

      if (details.length > 0) {
        details.forEach((detail) => {
          const label = document.createElement("label");
          const checkbox = document.createElement("input");
          checkbox.type = "radio";
          checkbox.value = detail;
          checkbox.name = "radioDetail";

          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(detail));
          donneesJSON.appendChild(label);
          donneesJSON.appendChild(document.createElement("br"));
        });
      } else {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "radio";
        checkbox.value = raison;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(raison));
        donneesJSON.appendChild(label);
        donneesJSON.appendChild(document.createElement("br"));
      }
    });
  })
  .catch((error) =>
    console.error("Erreur de chargement du fichier JSON :", error)
  );

document.querySelector(".Btn").addEventListener("click", function () {
  // Récupère les valeurs des champs de l'index.html
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const formation = document.getElementById("formation").value;

  const motif = document.querySelector(
    'input[name="radioDetail"]:checked'
  ).value;

  const duree = document.querySelector('input[name="duree"]:checked').value;
  localStorage.setItem("duree", duree);

  // Stocke les valeurs dans le localStorage
  localStorage.setItem("nom", nom);
  localStorage.setItem("prenom", prenom);
  localStorage.setItem("formation", formation);
  localStorage.setItem("motif", motif);

  if (duree === "un_jour") {
    const date = document.getElementById("date").value;
    const heureDebut = document.getElementById("heureDebut").value;
    const heureFin = document.getElementById("heureFin").value;

    localStorage.setItem("date", date);
    localStorage.setItem("heureDebut", heureDebut);
    localStorage.setItem("heureFin", heureFin);
  }

  if (duree === "plusieurs_jours") {
    const date = document.getElementById("du").value;
    const heureDebut = document.getElementById("au").value;

    localStorage.setItem("du", date);
    localStorage.setItem("au", heureDebut);
  }

  if (!verifierDates()) {
    return;
  }

  if (!verifierNomPrenom(nom)) {
    alert("Le nom n'est pas valide !");
    return;
  }

  if (!verifierNomPrenom(prenom)) {
    alert("Le prénom n'est pas valide !");
    return;
  }
  // Redirige vers la page imprimable.html
  window.location.href = "imprimable.html";
});

function verifierDates() {
  const dateDu = document.getElementById("du").value;
  const dateAu = document.getElementById("au").value;

  if (dateDu && dateAu) {
    const dateDuObj = new Date(dateDu);
    const dateAuObj = new Date(dateAu);

    if (dateDuObj > dateAuObj) {
      alert("La date de départ doit être antérieure à la date de retour !");
      // Réinitialiser les champs ou effectuer une action en conséquence
      document.getElementById("du").value = "";
      document.getElementById("au").value = "";
      return false;
    }
  }
  return true;
}

const REGEXNOMPRENOM = /^[a-zA-ZéèêëàâçîôûÉÈÊËÀÂÇÎÔÛ\s-]+$/;

function verifierNomPrenom(saisie) {
  return REGEXNOMPRENOM.test(saisie);
}
