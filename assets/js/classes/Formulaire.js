export default class Formulaire{
    constructor(){
        this.formulaire = document.querySelector('form');

        // va cherche la balise html form
        // dans mon init je vais mettre un écouteur d'évenement de type
        this.init();
    }
    // Le formulaire va ramasser la donnee et envoyer au gestionnaires 

    init(){
        this.formulaire.addEventListener('submit', function(e){
            e.preventDefault();
            console.log(e, this.formulaire.task.value);
            const monEvent = new CustomEvent('submitTask',{
                // je passe la donnée dans mon custom event dans un objet DETAIL
                // je passe cette objet dans l'univers 
                'detail': {
                    'task': this.formulaire.task.value,
                    'importance': this.formulaire.importance.value,
                    'description': this.formulaire.description.value || ""  //par defaut, si il y a rien ce sera chaine vide
                 }
            })
            // je dois attache l'evenement a un objet sur ma page (sur cette objet on va mettre l'écouteur d'évenement)
            window.dispatchEvent(monEvent) // on déclenche l'événement

        }.bind(this))
    }









}

