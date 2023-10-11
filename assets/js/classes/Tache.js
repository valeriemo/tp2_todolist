import GestionnaireTaches from "./GestionnaireTaches.js";

export default class Tache {
    #id;
    #tache;
    #description;
    #importance;
    #listeHTML;
    #templateTache;
    #templateDetail;
    #elementHTML;


    constructor(id, tache, description, importance) {
        this.#id = id;
        this.#tache = tache;
        this.#description = description;
        this.#importance = importance;

        this.#listeHTML = GestionnaireTaches.instance.liste;
        this.#templateTache = document.querySelector("[data-js-task-template]");
        this.#templateDetail = document.querySelector("[data-js-task-detail-template]");
        this.#elementHTML;

        this.init();
    }

    init(){
        this.injectionTache();
    }
    
    injectionTache() {
        // On clone le template
        const contenu = this.#templateTache.content;
        let template = contenu.cloneNode(true);
        // L'élément div a l'intérieur du template
        let elDivContent = template.querySelector('div');
        const content = elDivContent.innerHTML;
        elDivContent = content.replaceAll("{{TACHE}}", this.#tache).replaceAll("{{IMPORTANCE}}", this.#importance);

        // On modifie l'attribut data-js-task
        const elDiv = template.querySelector('div');
        let elDataId = elDiv.getAttribute('data-js-task').replaceAll("{{ID}}", this.#id);
        elDiv.setAttribute('data-js-task', elDataId);

        // On modifie l'attribut data-js-importance
        let elDataImportance = elDiv.getAttribute('data-js-importance').replaceAll("{{IMPORTANCE}}", this.#importance);
        elDiv.setAttribute('data-js-importance', elDataImportance);

        // On injecte dans le HTML
        elDiv.innerHTML = elDivContent;
        this.#listeHTML.append(elDiv);

    }

    afficherDetail() {
        // cloner le content de template detail
        const contenu = this.#templateDetail.content;

        // modifier le contenu avec replace all
        // injecter dans la section du HTML detail
    }

    supprimerTache() {
        // on va faire un fetch a bd pour supprimer l'élément
        // quand cest supprimé, on supprime l'élémentHTML avec remove()
        
    }

    injecterNouvelleTache(nouvelletache) {
        // appeller dans le gestionnaire,on ajoute l'élémentHTML avec insertAdjacentHTML()
    }

}