import Tache from "./Tache.js";
import Routeur from "./Routeur.js";
import Formulaire from "./Formulaire.js";
import ValidationFormulaire from "./ValidationFormulaire.js";

export default class GestionnaireTaches {
    #taches;
    #btnAjouter;
    #routeur;
    #formulaire;
    #validation;

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

        this.init();
    }

    init() {
        this.recupererTachesBD()
        // on dit a window de surveiller cette évenement (qui est déclencher avec dispatch event dans le form)
        window.addEventListener('submitTask', function (e) {
            this.ajouterNouvelleTache(e.detail);
        }.bind(this))
    }

    recupererTachesBD() {
        // fetch php
        // je veux faire un fetch pour aller chercher les taches
        fetch("api/taches/rechercherTout.php")
            .then((reponse) => {
                return reponse.json();
            })
            .then((taches) => {
                taches.forEach((tache) => {
                    // const nouvelleTache = new Tache(tache.id, tache.tache, tache.description, tache.importance);
                    // this.#taches.push(nouvelleTache);

                    this.#taches.push(new Tache(tache.id, tache.tache, tache.description, tache.importance));

                });
            });
    }


    afficherAccueil() {
        console.log('afficher accueil');
        //lié au router (selon le hash cliquer)
        // clear le détail 
    }

    afficherDetailTache() {
        const idTache = location.hash.slice(1);
    // JE N'ARRIVE PAS A ALLER CHERCHE LE ID CORRESPONDANT A idTache DANS LE TABLEAU 
        // aller chercher la tache avec son id dans le tableau de la liste des taches
        // const found = this.#taches.find(tache => tache.id === idTache);
        let index;
        console.log(this.#taches);

    }

    supprimerTache(id) {
        // On cherche l'index de la tâche dans le tableau
        const index = this.#taches.findIndex(Tache => tache.id === id);
        // Si l'index est trouvé, on supprime la tâche du tableau
        if (index !== -1) {
            this.#taches.splice(index, 1);
        }
        // on doit le supprimer de la bd

    }

    ajouterNouvelleTache(postData) {
        // valider le formulaire-> appele les méthodes de validation
        const required = ValidationFormulaire.estVide(postData); //if false = valide
        console.log(required);
        // si valide, on va faire un fetch a bd pour ajouter l'élément
        const config = {
            method: 'Post',
            body: JSON.stringify(postData),//permet de transformer en chaine json
            headers: {
                "Content-type": 'application/json' //indique que le message envoyer par fetch sera du json            }
            }
        }

        fetch("api/taches/ajouterUn.php", config)
            .then((reponse) => {
                return reponse.json();
            })
            .then((taches) => {
                //on crée une nouvelle instanche de Tache et on la push dans le tableau des taches
            });
    }

}