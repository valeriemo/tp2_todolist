import Tache from "./Tache.js";

export default class Filtres {
    #btnsFiltres;
    #elDiv;

    constructor() {
        this.#btnsFiltres = document.querySelectorAll('[data-js-sort]');
        this.#elDiv = document.querySelector('[data-js-tasks]');

        this.#init();
    }

    /**
     * Initialise les écouteurs d'événements
     */
    #init() {
        this.#btnsFiltres.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const monEvent = new CustomEvent('taskFilter', {
                    'detail': {
                        'sort': btn.dataset.jsSort
                    }
                })
                window.dispatchEvent(monEvent);
            }.bind(this))
        }.bind(this));
    }

    /**
     * Dirige l'action à effectuer selon le bouton cliqué
     * @param {*} detail Action à effectuer
     */
    filtrerBtns(detail) {
        if (detail.sort === "importance") {
            const order = "importance";
            this.#triImportance(order);
        } else {
            const order = "tache";
            this.#triAlphabetique(order);
        }
    }

    /**
     * Comportement pour le tri alphabétique
     * 
     */
    async #triAlphabetique(order) {
        const config = {
            method: 'GET',
            headers: {
                "Content-type": 'application/json'
            }
        }
        try {
            let reponse = await fetch(`api/taches/rechercherToutOrder.php?order=${order}`, config)
            const taches = await reponse.json();
            this.#elDiv.innerHTML = '';
            taches.forEach((tache) => {
                new Tache(tache.id, tache.tache, tache.description, tache.importance);
            });
        } catch (erreur) {
            console.error(erreur);
        }
    }

    async #triImportance(order) {
        const config = {
            method: 'GET',
            headers: {
                "Content-type": 'application/json'
            }
        }
        try {
            let reponse = await fetch(`api/taches/rechercherToutOrder.php?order=${order}`, config)
            const taches = await reponse.json();
            this.#elDiv.innerHTML = '';
            taches.forEach((tache) => {
                new Tache(tache.id, tache.tache, tache.description, tache.importance);
            });
        } catch (erreur) {
            console.error(erreur);
        }
    }
}

