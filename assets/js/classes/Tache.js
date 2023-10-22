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
    #conteneurDetail;

    constructor(id, tache, description, importance) {
        this.#id = id;
        this.#tache = tache;
        this.#description = description;
        this.#importance = importance;

        this.#listeHTML = GestionnaireTaches.instance.liste;
        this.#templateTache = document.querySelector("[data-js-task-template]");
        this.#templateDetail = document.querySelector("[data-js-task-detail-template]");
        this.#conteneurDetail = document.querySelector("[data-js-task-detail]");
        this.#elementHTML;

        this.#init();
    }
    /**
     * Initialisation de la tâche
     */
    #init() {
        this.#injectionTache();
    }

    /**
     * Getter pour le id de la tâche
     * @returns {number} id 
     */
    getId() {
        return this.#id;
    }


    /**
     * Injection de la tâche dans le HTML
     */
    #injectionTache() {
        const contenu = this.#templateTache.content;
        let template = contenu.cloneNode(true);
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

    /**
     * Afficher le détail de la tâche
     */
    afficherDetail() {
        const contenu = this.#templateDetail.content;
        let template = contenu.cloneNode(true);

        if(this.#description == ''){
            this.#description = "Aucune description disponible";
        }
        if(this.#importance == 1){
            this.#importance = "Haute";
        }else if(this.#importance == 2){
            this.#importance = "Moyenne";
        }else {
            this.#importance = "Basse";
        }
        
        const elDiv = template.querySelector('div')
        const content = elDiv.innerHTML.replaceAll("{{TACHE}}", this.#tache).replaceAll("{{DESCRIPTION}}", this.#description).replaceAll("{{IMPORTANCE}}", this.#importance);

        let elDataId = elDiv.getAttribute('data-id');
        elDataId = elDataId.replaceAll("{{ID}}", this.#id);
        elDiv.setAttribute('data-id', elDataId);

        elDiv.innerHTML = content;
        this.#conteneurDetail.innerHTML = content;
    }

}