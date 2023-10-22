export default class Formulaire {
    constructor() {
        this.formulaire = document.querySelector('form');
        
        this.#init();
    }

    /**
     * Initialise l'écouteur d'événement sur le formulaire
     */
    #init() {
        this.formulaire.addEventListener('submit', function (e) {
            e.preventDefault();
            const monEvent = new CustomEvent('submitTask', {
                'detail': {
                    'task': this.formulaire.task.value,
                    'importance': this.formulaire.importance.value,
                    'description': this.formulaire.description.value || ""
                }
            })
            window.dispatchEvent(monEvent)
        }.bind(this))
    }









}

