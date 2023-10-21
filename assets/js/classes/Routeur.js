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
                evenement.preventDefault();
                if (evenement.target.closest("[data-js-action]") !== null) {
                    if (evenement.target.dataset.jsAction === "delete") {
                        const id = evenement.target.closest('div[data-js-task]').dataset.jsTask;
                        GestionnaireTaches.instance.supprimerTache(id);
                        history.pushState(null, null, "#");
                        this.gererURL();
                    }
                    const dataId = evenement.target.closest('div[data-js-task]').dataset.jsTask;
                    window.location.hash = dataId;
                }
            }.bind(this)
        );
        //Écouter l'événement popstate, quand ca se déclenche, on appelle gererURL
        window.addEventListener("popstate", this.gererURL.bind(this));
        this.gererURL();
    }

    gererURL() {
        let hash = location.hash.slice(1),
            id;

        if (hash.endsWith("/")) {
            hash = hash.slice(0, -1);
        }
        const fragmentsUrl = hash.split("/");
        id = fragmentsUrl[0];

        if (id !== "") {
            this.routes["id"](id);
        } else {
            this.routes["/"]();
        }
    }



}