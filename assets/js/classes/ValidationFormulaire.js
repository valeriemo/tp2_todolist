export default class ValidationFormulaire {
    #_elForm;
    #_elInputTache;
    #_elInputImportance;
    #_elInputDescription;

    constructor() {
        this.#_elForm = document.querySelector('form');
        this.#_elInputTache = document.querySelector('#task');
        this.#_elInputImportance = document.querySelectorAll('input[type="radio"]');
        this.#_elInputDescription = document.querySelector('#description');

        this.init();
    }

    init() {
        let estValide = true,
            elRadioWrapper = this.#_elForm.querySelector('[data-js-radio-wrapper]'),
            wrapperRequired = this.#_elInputTache.parentNode;
        /**
         * Validation des inputs required
         */
        console.log(wrapperRequired, elRadioWrapper)

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