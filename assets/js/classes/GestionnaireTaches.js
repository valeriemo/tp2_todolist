import Tache from "./Tache.js";
import ValidationFormulaire from "./ValidationFormulaire.js";

export default class GestionnaireTaches {
    #taches;
    #buttons;

    constructor() {
        if (GestionnaireTaches.instance == null) {
            GestionnaireTaches.instance = this;
        } else {
            console.error("Un seul gestionnaire possible");
        }

        // la liste des taches
        this.#taches = [];
        // la liste dans le HTML
        this.liste = document.querySelector("[data-js-tasks]");
        // Buttons addevetlistener pour afficher le detail
        this.#buttons = document.querySelector("[data-js-actions]");



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
    }


    afficherAccueil() {
        //lié au router (selon le hash cliquer)
    }

    afficherDetailTache() {
        //ajouter un écouteur d'événement délégué sur le bouton
    }

    ajouterNouvelleTache() {
        // ajouter un écouteur d'événement sur le bouton Ajouter
        // on va faire un fetch a bd pour ajouter l'élément
    }

}