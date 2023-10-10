import Tache from "./Tache.js";
import ValidationFormulaire from "./ValidationFormulaire.js";

export default class GestionnaireTaches {
    #taches;

    constructor() {
        if (GestionnaireTaches.instance == null) {
            GestionnaireTaches.instance = this;
        } else {
            console.error("Un seul gestionnaire possible");
        }

        // la liste des taches
        this.#taches = [];
        this.liste = document.querySelector("[data-js-tasks]");
        //new Tache(1, "Balayer", "hfkjdshfks", 1, this.liste);
        this.init();
    }

    init() {
        this.recupererTachesBD()
    }

    recupererTachesBD() {
        // fetch php
        // je veux faire un fetch pour aller chercher les taches
        fetch("api/taches/rechercherTout.php")
            .then((reponse) => {
                return reponse.json();
            })
            .then((taches) => {
                taches.forEach((tache, index) => {
                    this.#taches.push(new Tache(tache.id, tache.tache, tache.description, tache.importance));
                });
            });
            console.log(this.#taches)
        // on instancie les taches 
        // Pour chaque element de la bd = new Tache()
        // (push de chaque new Tache) on garde un copie des tache (dans le constructeur)
    }


    // afficherAccueil() {
    //     //lié au router (selon le hash cliquer)
    // }

    // afficherDetailTache() {

    // }

}