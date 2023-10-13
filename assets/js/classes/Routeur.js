import GestionnaireTaches from "./GestionnaireTaches.js";

export default class Routeur {
    #btns;
    #liste;

    constructor() {
        this.#btns = document.querySelector("[data-js-actions]");
        this.#liste = GestionnaireTaches.instance.liste;


        this.routes = {
            "/": GestionnaireTaches.instance.afficherAccueil.bind(GestionnaireTaches.instance),
            "id": GestionnaireTaches.instance.afficherDetailTache.bind(GestionnaireTaches.instance)
        }
        this.init();
    }


    init() {
        this.#liste.addEventListener(
            "click",
            function (evenement) {
                if (evenement.target.closest("[data-js-action]") !== null) {
                    if(evenement.target.dataset.jsAction === "delete"){
                        // appeler la methode pour delete du gestionnaire avec le id
                    }
                    const dataId = evenement.target.closest('div[data-js-task]').dataset.jsTask;
                    window.location.hash = dataId;
                    //console.log(evenement.target.dataset.jsAction);
                }
            }.bind(this)
        );
        //Écouter l'événement popstate, quand ca se déclenche, on appelle gererURL
        window.addEventListener("popstate", this.gererURL.bind(this));
        this.gererURL();
    }

    gererURL() {
        //On recupere le hash
        let hash = location.hash.slice(1),
            id;

        //Si le hash se termine par un /, on l'enlève pour éviter les erreurs
        if (hash.endsWith("/")) {
            hash = hash.slice(0, -1);
        }
        //On récupere le id sinon on appelle la page d'accueil(si il n'y a pas de id).
        //On récupère la route et l'id
        //Si on a un deuxième élément dans le tableau, c'est qu'on a un id
        const fragmentsUrl = hash.split("/");
        id = fragmentsUrl[0];

        // On appelle la méthode de la route
        if (id !== "") {
            this.routes["id"](id);
        } else {
            this.routes["/"]();
        }
    }



}