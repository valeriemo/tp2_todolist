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

    init(){
        this.recupererTachesBD()
    }

    recupererTachesBD() {
        // fetch php
        console.log('ALLO')
        // je veux faire un fetch pour aller chercher les taches
        fetch("/api/taches/rechercherTout.php")
            .then((reponse) => {
                console.log(reponse);

                return reponse.json();
            })
            .then((taches) => {
                this.#taches = taches;
                this.#taches.forEach((tache, index) => {
                    console.log(tache);
                });
            });
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