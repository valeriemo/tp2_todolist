export default class ValidationFormulaire {
    #_elForm;
    #_elInputTache;

    constructor() {
        this.#_elForm = document.querySelector('form');
        this.#_elInputTache = document.querySelector('#task');

        this.#init();
    }

    /**
     * Initialise la validation du formulaire
     */
    #init() {
        let estValide = true,
            elRadioWrapper = this.#_elForm.querySelector('[data-js-radio-wrapper]'),
            wrapperRequired = this.#_elInputTache.parentNode;
        /**
         * Validation des inputs required
         */
        if (this.#_elInputTache.value !== '' || this.#_elInputTache.value !== null) {
            if (wrapperRequired.classList.contains('error')) {
                wrapperRequired.classList.remove('error')
            }
        } else {
            wrapperRequired.classList.add('error');
            estValide = false;
        }
        /**
         * Validation des radios 
         */
        let elImportanceChecked = this.#_elForm.querySelector('input[name="importance"]:checked');

        if (elImportanceChecked) {
            if (elRadioWrapper.classList.contains('error')) {
                elRadioWrapper.classList.remove('error');
            }
        } else {
            elRadioWrapper.classList.add('error');
            estValide = false;
        }
        return estValide;
    }
}