import Tache from "./Tache.js";
import Routeur from "./Routeur.js";
import Formulaire from "./Formulaire.js";
import ValidationFormulaire from "./ValidationFormulaire.js";
import Filtres from "./Filtres.js";

export default class GestionnaireTaches {
    #taches;
    #btnAjouter;
    #routeur;
    #formulaire;
    #validation;
    #filtres;
    inputDescription = document.getElementById('description');
    inputImportance = document.querySelectorAll('input[type="radio"]');
    inputTask = document.getElementById('task');

    constructor() {
        if (GestionnaireTaches.instance == null) {
            GestionnaireTaches.instance = this;
        } else {
            console.error("Un seul gestionnaire possible");
        }

        // la liste des taches
        this.#taches = [];
        this.liste = document.querySelector("[data-js-tasks]");
        this.#btnAjouter = document.querySelector("[data-js-btn]");

        this.#routeur = new Routeur();
        this.#formulaire = new Formulaire();
        this.#filtres = new Filtres();

        this.init();
    }

    async init() {
        await this.recupererTachesBD();

        window.addEventListener('submitTask', function (e) {
            e.preventDefault();
            this.ajouterNouvelleTache(e.detail);
        }.bind(this))

        window.addEventListener('taskFilter', function (e) {
            e.preventDefault();
            this.#filtres.filtrer(e.detail);
        }.bind(this))
    }

    async recupererTachesBD() {
        try {
            const reponse = await fetch("api/taches/rechercherTout.php");
            const taches = await reponse.json();
            taches.forEach((tache) => {
                this.#taches.push(new Tache(tache.id, tache.tache, tache.description, tache.importance));
            });
        } catch (erreur) {
            console.error(erreur);
        }
    }

    afficherAccueil() {
        const conteneurDetail = document.querySelector("[data-js-task-detail]")
        conteneurDetail.innerHTML = '';
    }

    // ATTENDRE QUE LA BD SOIT AFFICHER 
    async afficherDetailTache() {
        const idTache = location.hash.slice(1);
        const tacheDetail = this.#taches.find(element => element.getId() == idTache);
        await tacheDetail.afficherDetail()
    }

    async supprimerTache(id) {
        const config = {
            method: 'GET',
            headers: {
                "Content-type": 'application/json'
            }
        }
        try{
            let reponse = await fetch(`api/taches/supprimerUn.php?id=${id}`, config)
            reponse = await reponse.json();
        } catch (erreur) {
            console.error(erreur);
        }
           
        const indexTache = this.#taches.findIndex(element => element.getId() == id);
        this.#taches.splice(indexTache, 1);
        const elAsupprimer = document.querySelector(`[data-js-task="${id}"]`);
        elAsupprimer.remove();
    }

    async ajouterNouvelleTache(postData) { // postData = e.detail de l'écouteur d'event dans init()
        // valider le formulaire-> appel les méthodes de validation
        const requiredTask = ValidationFormulaire.estVide(postData.task); //if false = valide
        const requiredImportance = ValidationFormulaire.estVide(postData.importance); //if false = valide


        // si valide, on va faire un fetch a bd pour ajouter l'élément
        const config = {
            method: 'Post',
            body: JSON.stringify(postData),
            headers: {
                "Content-type": 'application/json'
            }
        }

        try {
            const reponse = await fetch("api/taches/ajouterUn.php", config);
            const tache = await reponse.json();
            this.#taches.push(new Tache(tache.id, postData.task, postData.description, postData.importance));
        } catch (erreur) {
            console.error(erreur);
        }
    }




}

