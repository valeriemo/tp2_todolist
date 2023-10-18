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

        this.init();
    }

    init() {
        this.injectionTache();
    }

    getId() {
        return this.#id;
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
        let template = contenu.cloneNode(true);

        const elDiv = template.querySelector('div')
        const content = elDiv.innerHTML.replaceAll("{{TACHE}}", this.#tache).replaceAll("{{DESCRIPTION}}", this.#description).replaceAll("{{IMPORTANCE}}", this.#importance);

        let elDataId = elDiv.getAttribute('data-id');
        elDataId = elDataId.replaceAll("{{ID}}", this.#id);
        elDiv.setAttribute('data-id', elDataId);

        elDiv.innerHTML = content;
        this.#conteneurDetail.innerHTML = content;
    }

}