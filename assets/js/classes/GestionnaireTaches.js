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


    async afficherAccueil() {
        console.log('afficher accueil');
        //lié au router (selon le hash cliquer)
        // clear le détail 
    }

    async afficherDetailTache() {
        // quand je fais une reload j'ai acces peut etre a l'id avant que la liste soit creer (je devrais attendre le load de la liste??)
        const idTache = location.hash.slice(1);
        const tacheDetail = this.#taches.find(element => element.getId() == idTache);
        console.log('ceci est la tache:', tacheDetail);

        tacheDetail.afficherDetail()
    // COMMENT JE FAIS POUR APPELER LA MÉTHODE AFFICHERDETAIL DE LA CLASSE TACHE
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

    ajouterNouvelleTache(postData) { // postData = e.detail de l'écouteur d'event dans init()
        // valider le formulaire-> appel les méthodes de validation
        const requiredTask = ValidationFormulaire.estVide(postData.task); //if false = valide
        console.log(this.inputTask);
        const requiredImportance = ValidationFormulaire.estVide(postData.importance); //if false = valide


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
                this.#taches.push(new Tache(taches.id, postData.task, postData.description, postData.importance));
            })
        

            

    }

}