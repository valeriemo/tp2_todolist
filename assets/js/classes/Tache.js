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


    constructor(id, tache, description, importance, listeHTML) {
        this.#id = id;
        this.#tache = tache;
        this.#description = description;
        this.#importance = importance;

        this.#listeHTML = listeHTML;
        //this.#listeHTML = GestionnaireTaches.instance.liste;
        this.#templateTache = document.querySelector("[data-js-task-template]");
        this.#templateDetail = document.querySelector("[data-js-task-detail-template]");
        this.#elementHTML;
    }
    
    injectionTache() {
        //on doit avoir acces a la liste pcq elle doit s'injecter dans la liste de tache

        // cloner le content de template 
        // Placer le clone dans elementHTML(on va garder une trace pour pouvoir ensuite la supprimer)
        // modifier le contenu avec replaceAll
        // injecter dans la liste
    }

    afficherDetail() {
        // cloner le content de template detail
        // modifier le contenu avec replace all
        // injecter dans la section du HTML detail
    }

    supprimerTache() {
        // on va faire un fetch a bd pour supprimer l'élément
        // quand cest supprimé, on supprime l'élémentHTML avec remove()
        
    }


}