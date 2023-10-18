export default class Filtres {

    constructor() {
        this.btnsFiltres = document.querySelectorAll('[data-js-sort]');
        this.init();
    }

    init() {
        this.btnsFiltres.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const monEvent = new CustomEvent('taskFilter', {
                    'detail': {
                        'sort': btn.value
                    }
                })
                window.dispatchEvent(monEvent);
            }.bind(this))
        }.bind(this));
    }

    filtrer(){
        console.log('Filtrer');
    }
}