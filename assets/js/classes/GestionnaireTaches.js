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

        this.#taches = [];
        this.liste = document.querySelector("[data-js-tasks]");
        this.#btnAjouter = document.querySelector("[data-js-btn]");

        this.#formulaire = new Formulaire();
        this.#filtres = new Filtres();

        this.#init();
    }

    /**
     * Initialisation du gestionnaire de tâches
     * Récupération des tâches de la BD et ajout des événements sur les boutons
     */
    async #init() {
        await this.recupererTachesBD();

        this.#routeur = new Routeur();

        window.addEventListener('submitTask', function (e) {
            e.preventDefault();
            this.ajouterNouvelleTache(e.detail);
        }.bind(this))

        window.addEventListener('taskFilter', function (e) {
            e.preventDefault();
            this.#filtres.filtrerBtns(e.detail);
        }.bind(this))
    }
    
    /**
     * Getter pour la liste des tâches
     * @returns {Array} la liste des tâches
     */
    getTaches() {
        return this.#taches;
    }

    /**
     * Récupération des tâches de la BD
     */
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

    /**
     * Nettotage du détail pour afficher la "page" d'accueil
     */
    afficherAccueil() {
        const conteneurDetail = document.querySelector("[data-js-task-detail]")
        conteneurDetail.innerHTML = '';
    }

    /**
     * Afficher le détail de la tâche
     */
    async afficherDetailTache() {
        const idTache = location.hash.slice(1);
        const tacheDetail = this.#taches.find(element => element.getId() == idTache);
        await tacheDetail.afficherDetail()
    }

    /**
     * Supprimer la tâche de la BD et du HTML
     * @param {*} id 
     */
    async supprimerTache(id) {
        const config = {
            method: 'GET',
            headers: {
                "Content-type": 'application/json'
            }
        }
        try {
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

    /**
     * Validation et ajout d'une nouvelle tâche dans la BD et dans le HTML
     * @param {*} postData Les données du formulaire
     */
    async ajouterNouvelleTache(postData) {
        let validation = new ValidationFormulaire;
        if (validation = true) {
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
}

